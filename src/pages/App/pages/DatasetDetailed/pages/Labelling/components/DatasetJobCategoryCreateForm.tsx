import {
    useCreateDatasetImages,
    useCreateBatch
} from "../../../../../../../api/app/datasets.ts";
import FormikButton from "../../../../../../../component_library/formik/FormikButton.tsx";
import {UseDialogReturn} from "@ark-ui/react/dialog";
import * as dg from "@ark-ui/react/dialog";
import Button from "../../../../../../../component_library/forms/Button.tsx";
import Dialog from "../../../../../../../component_library/dialogs/Dialog.tsx";
import {useParams} from "react-router";
import {FormikInput} from "../../../../../../../component_library/formik/FormikInputs.tsx";
import FormikFileField from "../../../../../../../component_library/formik/FormikFileField.tsx";
import JSZip from "jszip";
import {isImage} from "../../../../../../../utils.ts";
import { Formik } from 'formik';
import { useState } from 'react';
import { FaFileZipper, FaImage } from 'react-icons/fa6';
import { Progress } from "@ark-ui/react";
import { queryClient } from '../../../../../../../api/client.ts';



interface Props{
    dialog : UseDialogReturn
}
/*
    const {mutateAsync: createJob} = useCreateDatasetJob(parseInt(dataset_id || ""))({
    })
     const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);

            reader.readAsDataURL(file);
        });
    };

    const category = await createJobCategory({
        name: values.name
    })
    const zip = await new JSZip().loadAsync(values.zip_file[0])
    const images = Object.keys(zip.files).filter(x => isImage(zip.files[x].name))
    const numberOfImages = images.length
    console.log(numberOfImages)
    const numberOfJobs = Math.floor(numberOfImages/values.num_images_per_job)
    for(let i = 0; i < numberOfJobs; i++) {
        console.log(i)
        const job = await createJob({
            name: "",
            category: category.id
        })
        const startIndex = values.num_images_per_job*i
        for (const x of images.slice(startIndex, startIndex+values.num_images_per_job)) {
            const file = zip.files[x]
            const b64 = "data:image/jpeg;base64,"+(await file.async("base64"))
            await createImage({
                image: b64,
                job: job.id
            })
        }
    }
 */

function DatasetCreateFormDialog({dialog}: Props) {

    const {dataset_id} = useParams();
    const [progress, setProgress] = useState<number>(0);
    const {mutateAsync: createBatch} = useCreateBatch(parseInt(dataset_id || ""))({
    })
    const {mutateAsync : createImage} = useCreateDatasetImages(parseInt(dataset_id || ""))()

    function formatDate(date: Date) {
        return `Uploaded on ${date.toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        })} at ${date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase()}`;
    }

    return (
        <Dialog size="lg" dialog={dialog} title="Upload images on Batch">
            <Formik className="grid gap-2" initialValues={{name: formatDate(new Date()),  zip_file: [] as File[]}} onSubmit={async (values, helpers) => {
                setProgress(0);
                const batch = await createBatch({ name: values.name });

                const zip = await new JSZip().loadAsync(values.zip_file[0]);
                const images = Object.keys(zip.files).filter(x => isImage(zip.files[x].name));
                const totalImages = images.length;
                if(totalImages> 700){
                    helpers.setFieldError("zip_file", "No se puedén subir mas de 700 imágenes en un mismo .zip")
                    return;
                }
                let numberOfProcessedImages = 0;
                const batchSize = 50; // Max concurrent uploads
                let activeUploads = 0;
                let index = 0;
                const queue: Promise<void>[] = [];
                function uploadImage(x: string) {
                    return new Promise<void>(async (resolve) => {
                        try {
                            const file = zip.files[x];
                            const b64 = "data:image/jpeg;base64," + (await file.async("base64"));
                            await createImage({ image: b64, batch: batch.id });
                            numberOfProcessedImages++;
                            setProgress(numberOfProcessedImages / totalImages);
                        } catch (error) {
                            console.error("Error uploading image:", x, error);
                        }
                        activeUploads--;
                        resolve();
                    });
                }
                while (index < images.length) {
                    while (activeUploads < batchSize && index < images.length) {
                        activeUploads++;
                        queue.push(uploadImage(images[index++]));
                    }
                    await Promise.allSettled(queue);
                }
                await queryClient.invalidateQueries({
                        queryKey: ['datasets', parseInt(dataset_id??""), "batches"]
                })
                dialog.setOpen(false);
                helpers.resetForm();
            }}>
                {
                    ({isSubmitting,}) => (
                      isSubmitting ?
                        <div className="w-full flex flex-col items-center">
                            <FaFileZipper size={50} className="text-brand_primary-700"></FaFileZipper>
                            <p className="font-semibold mt-5 mb-5 text-gray-500">Your images are being uploaded, wait a little bit</p>
                            <div className="w-full">
                                <Progress.Root defaultValue={42} min={0} max={100} value={(progress*100)}>
                                    <Progress.ValueText className="text-gray-500 mb-4 font-semibold" />
                                    <Progress.Track className="w-full h-[8px] bg-gray-100 rounded-xl overflow-hidden">
                                        <Progress.Range className="w-full h-[8px] bg-brand_primary-700"/>
                                    </Progress.Track>
                                </Progress.Root>
                            </div>
                        </div>
                        :
                        <div className="grid gap-2">
                            <FormikInput placeholder="Name of the category" name="name" label="Name"></FormikInput>

                            <FormikFileField name="zip_file" fileField={{
                                maxFiles: 1
                            }} label="Zip file"></FormikFileField>
                            <div
                              className="bg-gray-100 rounded-xl p-4 flex gap-8 border-2 border-gray-200 ">
                                <div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                        <FaFileZipper></FaFileZipper>
                                        <p>Compressed files</p>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-3">
                                        .zip up to 700 images <span className="font-semibold">(Just images)</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                        <FaImage></FaImage>
                                        <p>Images</p>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-3">
                                        .jpg, .png, .webp inside a <span className="font-semibold">.zip files</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full justify-center flex  gap-3 max-w-[300px] mt-4 mx-auto">
                                <dg.DialogCloseTrigger asChild>
                                    <Button size="md" colorSchema="primary">Cancel</Button>
                                </dg.DialogCloseTrigger>
                                <FormikButton size="md">Create</FormikButton>
                            </div>
                        </div>
                    )
                }
            </Formik>
        </Dialog>
    );
}

export default DatasetCreateFormDialog;