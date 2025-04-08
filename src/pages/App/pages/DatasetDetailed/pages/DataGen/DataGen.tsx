import React, { useState } from 'react';
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';
import { FormikInput, FormikSelect, FormikTextArea } from '../../../../../../component_library/formik/FormikInputs.tsx';
import FormEnhanceInput from '../../../../../../component_library/forms/FormEnhanceInput.tsx';
import { FormikItemPicker } from '../../../../../../component_library/formik/FormikItemPicker.tsx';
import FormikFileInput from '../../../../../../component_library/formik/FormikFileInput.tsx';
import { useGenerateImage } from '../../../../../../api/app/ai/useGenerateImage.ts';
import FormikButton from '../../../../../../component_library/formik/FormikButton.tsx';
import Dialog from '../../../../../../component_library/dialogs/Dialog.tsx';
import { Progress, useDialog } from '@ark-ui/react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { AiFillExperiment  } from 'react-icons/ai';
import { useCreateBatch, useCreateDatasetImages } from '../../../../../../api/app/datasets.ts';
import { useNavigate, useParams } from 'react-router';
import { queryClient } from '../../../../../../api/client.ts';
import { FaFileZipper } from 'react-icons/fa6';
import { Formik } from 'formik';


export const aspectRatios = [

  {
    label: "16:9",
    value: "16:9",
  },
  {
    label: "1:1",
    value: "1:1",
  },
  {
    label: "21:9",
    value: "21:9",
  },
  {
    label: "2:3",
    value: "2:3",
  },
  {
    label: "3:2",
    value: "3:2",
  },
  {
    label: "4:5",
    value: "4:5",
  },
  {
    label: "5:4",
    value: "5:4",
  },
  {
    label: "9:16",
    value: "9:16",
  },
  {
    label: "9:21",
    value: "9:21",
  },
]

function DataGen() {
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
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const {dataset_id} = useParams();
  const {mutateAsync: createBatch} = useCreateBatch(parseInt(dataset_id || ""))({
  })
  const {mutateAsync : createImage} = useCreateDatasetImages(parseInt(dataset_id || ""))()

  const [image, setImage]=useState('');

  const {mutateAsync: generateImage} = useGenerateImage()()
  const dialog = useDialog({});


  return (
    <>
      <Dialog size="xl" dialog={dialog}>
        <h1 className="text-lg font-semibold text-gray-700 mb-5">Example image generated with prompt</h1>
        <div className="w-full flex justify-center items-center">
          <PhotoProvider>
            <PhotoView src={image}>
              <img className="rounded-lg w-full" src={image} />
            </PhotoView>
          </PhotoProvider>
        </div>
      </Dialog>
      <PageLayout title="Data generation">
        <Formik initialValues={{ name: formatDate(new Date()), number_of_images: 1, aspect_ratio: "16:9", base_image: "", model_to_use: "stable_diffusion", prompt: "", negative_prompt: "" }}
              onSubmit={async (values, helpers) => {
                helpers.setSubmitting(true)
                setProgress(0);
                const {name, ...genValues} = values
                const batch = await createBatch({ name: name });
                const totalImages = values.number_of_images;
                let numberOfProcessedImages = 0;
                function uploadImage(x: string) {
                  return new Promise<void>(async (resolve) => {
                    try {
                      const b64 = x;
                      await createImage({ image: b64, batch: batch.id, is_synthetic: true });
                      numberOfProcessedImages++;
                      setProgress(numberOfProcessedImages / totalImages);
                    } catch (error) {
                      console.error("Error uploading image:", x, error);
                    }
                    resolve();
                  });
                }
                while (numberOfProcessedImages < values.number_of_images) {
                    await uploadImage((await generateImage(genValues)).image);
                }
                navigate(`/app/datasets/${dataset_id}/dataset_workbench/${batch.id}`)
                await queryClient.invalidateQueries({
                  queryKey: ['datasets', parseInt(dataset_id??""), "batches"]
                })
                await queryClient.invalidateQueries({
                  queryKey: ['datasets', parseInt(dataset_id??""), "batches"]
                })
              }}>

          {
            ({isSubmitting, values}) => (
              isSubmitting ?
                <div className="w-full flex flex-col items-center py-14">
                  <FaFileZipper size={50} className="text-brand_primary-700"></FaFileZipper>
                  <p className="font-semibold mt-5 mb-5 text-gray-500">Your images are being generated, wait a little bit</p>
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
                <div className="flex flex-col gap-3 mt-8">

                  <FormikInput placeholder="Name of the category" name="name" label="Name"></FormikInput>
                  <div className="grid grid-cols-3 gap-3">
                    <FormikInput type="number" placeholder="Number of images to generate" name="number_of_images" label="Number of images"></FormikInput>
                    <FormikSelect name="aspect_ratio" label="Aspect ratio" options={aspectRatios}>

                    </FormikSelect>
                    <FormikFileInput type="number" placeholder="Number of images to generate" name="number_images" label="Base image (optional)"></FormikFileInput>
                  </div>
                  <FormikItemPicker
                    label="Model to use"
                    name="model_to_use"
                    inputs={[
                      {
                        id: 'stable_diffusion',
                        title: 'Stable diffusion 3.5 Large',
                        description: 'One of the state of the art models of Stable Diffusion',
                      },
                      {
                        id: 'flux_1.1',
                        title: 'FLUX 1.1 Snell',
                        description: 'The ',
                      },
                    ]}
                  />
                  <FormEnhanceInput>
                    <div className="h-[150px]">
                      <FormikTextArea colorSchema="secondary" label="Prompt" extraClassName="h-full" name="prompt" placeholder="Prompt for generation"></FormikTextArea>
                    </div>
                  </FormEnhanceInput>
                  <FormEnhanceInput>
                    <FormikInput colorSchema="secondary" label="Negative prompt" extraClassName="h-full" name="negative_prompt" placeholder="Prompt for generation"></FormikInput>
                  </FormEnhanceInput>
                  <div className="w-fit">
                    <FormikButton colorSchema="primary" size="sm" loading={loading} onClick={async () => {
                      setLoading(true);
                      const data = (await generateImage(values)).image
                      setImage(data)
                      dialog.setOpen(true)
                      setLoading(false);
                    }}>
                      <AiFillExperiment></AiFillExperiment>
                      Test your prompt
                    </FormikButton>
                  </div>

                  <div className="max-w-[160px]">
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <div className="max-w-[400px] w-full flex gap-3">
                      <FormikButton colorSchema="brand_primary" size="md">
                        Generate Images
                      </FormikButton>
                    </div>
                  </div>
                </div>

            )
          }
        </Formik>
      </PageLayout>
    </>
  );
}

export default DataGen;