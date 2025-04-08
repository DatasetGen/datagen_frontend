import React, { useState } from "react";
import { FaArrowLeft, FaCheck, FaFileZipper } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router';
import { Formik, Form, Field, FormikProps } from 'formik';
import Button from '../../../../component_library/forms/Button.tsx';
import { FormikItemPicker } from '../../../../component_library/formik/FormikItemPicker.tsx';
import { MdPreview } from 'react-icons/md';
import AnnotatedImagePipeline from '../../../../assets/AnnotationImagePipeline.png';
import { FormikInput, FormikSelect, FormikTextArea } from '../../../../component_library/formik/FormikInputs.tsx';
import FormEnhanceInput from '../../../../component_library/forms/FormEnhanceInput.tsx';
import { Progress } from "@ark-ui/react";
import { Simulate } from 'react-dom/test-utils';
import { apiClient, queryClient } from '../../../../api/client.ts';
import {
  useCreateDatasetImages,
  useDatasetImages,
  useDatasetLabels,
  useSaveAnnotations,
} from '../../../../api/app/datasets.ts';
import {
  useGenerateImageAutolabelPipeline,
  useGenerateImageVariants,
} from '../../../../api/app/ai/useGenerateImage.ts';
import { aspectRatios } from '../DatasetDetailed/pages/DataGen/DataGen.tsx';
import { DatasetImage } from '../../../../types';

type FormValues = {
  pipeline: string;
  config: string;
  prompt: string;
};

function DataAugmentation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [progress, setProgress] = useState(0);
  const {dataset_id, batch_id} = useParams()
  const {mutateAsync: createImage} = useCreateDatasetImages(parseInt(dataset_id ?? ""))()
  const {mutateAsync: generateImage} = useGenerateImageAutolabelPipeline()()
  const {mutateAsync: generateImageVariants} = useGenerateImageVariants()()
  const {data} = useDatasetLabels(parseInt(dataset_id ?? ""))()
  const {data: images} = useDatasetImages(parseInt(dataset_id ?? ""))({
     batch_id: batch_id,
  })

  const pipelines = [
    {
      id: 1,
      pipeline : {
        name : "Image Variants Generation",
        slug: "image_variants_generation",
        description: "Generate Image variants prompt based"
      },
      form: ((formik : FormikProps<FormValues>) => (
        <>
          <div className="grid grid-cols-3 gap-4">
            <FormikInput name="config.number_of_images" label="Number of images to generate"></FormikInput>
            <FormikInput name="config.strength" label="Strength of the control"></FormikInput>
            <FormikSelect name="config.aspect_ratio" label="Aspect ratio" options={aspectRatios} />
          </div>
          <p className="text-sm font-semibold text-gray-800">Pick an image to augment:</p>
          <div className="grid grid-cols-6 gap-3">
            {
              images?.results.map((image, i) => (
                <img onClick={() => formik.setFieldValue("config.image", image.image)} className={`rounded-lg border-4 border-solid border-transparent cursor-pointer ${image.image === formik.values?.config?.image && " !border-brand_primary-300"}`} src={image.image}></img>
              ))
            }
          </div>
          <FormikItemPicker
            label="Labeling type"
            name="config.annotation_model"
            inputs={[
              {
                id: 'grounded_sam',
                title: 'Polygons',
                description: 'Generate polygons for instance detection',
              },
              {
                id: 'yolo_world',
                title: 'Bounding Box',
                description: 'Generate bounding boxes for object detection',
              },
            ]}
          />

          <FormEnhanceInput>
            <div className="h-[200px]">
              <FormikTextArea label="Prompt for image generation" name="config.prompt"
                              placeholder="Enter your prompt for generating an image">
              </FormikTextArea>
            </div>
          </FormEnhanceInput>
          <FormEnhanceInput>
            <FormikInput label="Negative Prompt for image generation" name="config.negative_prompt"
                         placeholder="Enter your prompt for generating an image">
            </FormikInput>
          </FormEnhanceInput>
          <div className="w-fit">
            <Button colorSchema="primary">Test your prompts</Button>
          </div>
        </>
      )),
      preview: ((formik: FormikProps<FormValues>) => (
        <div className="w-full mt-10 grid grid-cols-5 bg-gray-100 rounded-xl">
          <div className="p-8 col-span-2">
            <img src={AnnotatedImagePipeline} className="w-full" />
          </div>
          <div className="py-10 px-5 col-span-3">
            <h1 className="mt-5 font-semibold text-gray-800 text-lg">Annotated Image Generation</h1>
            <p className="mt-2 text-gray-500 text-sm">
              This is our most easy pipeline for augmenting data.
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Works just within 2 simple steps:
            </p>
            <ul className="mt-2 text-gray-500 text-sm">
              <li>
                <span className="text-black font-semibold">1. Convert a textual prompt into an image:</span> For
                this step you can use multiple models. The most recommended ones are: Stable Diffusion and Flux 1.1
              </li>
              <li>
                    <span
                      className="text-black font-semibold">2. Add annotations using segmentation or detection model:</span> This
                is the last step, for it you can bring your own custom model or just use Grounded SAM or grounded
                YOLO.
              </li>
            </ul>
            <p className="mt-2 text-gray-500 text-sm">As simple as that, enjoy :D</p>
          </div>
        </div>
      )),
      generateFn: async ({values, helpers}: any ) => {
        const totalImages = values.config.number_of_images;
        let numberOfProcessedImages = 0;
        function uploadImage(x: string) {
          return new Promise<DatasetImage>(async (resolve) => {
            try {
              const b64 = x;
              const img  = await createImage({ image: b64, batch: parseInt(batch_id ?? "") });
              numberOfProcessedImages++;
              setProgress(numberOfProcessedImages / totalImages);
              resolve(img);
              return img
            } catch (error) {
              console.error("Error uploading image:", x, error);
            }
          });
        }
        while (numberOfProcessedImages < values.config.number_of_images) {
          async function imageUrlToBase64(imageUrl: string): Promise<string> {
            // Fetch the image as a Blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            // Create a FileReader to read the Blob as a Data URL
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                // Extract the Base64 string from the Data URL
                const base64String = (reader.result as string).replace(/^data:.+;base64,/, '');
                resolve(base64String);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          }
          const image = await imageUrlToBase64(values.config.image)
          console.log(image)
          const genImg = (await generateImageVariants({ ...values.config, image: image, labels: data?.results.map(x => ({id: x.id, name: x.name, prompt: x.prompt})) } as any))
          const img = await uploadImage(genImg.image);
          await apiClient.post(`/datasets/${dataset_id}/images/${img.id}/annotations/batch/`, genImg.annotations)
        }
        helpers.setSubmitting(true)
        setProgress(0);
      }
    },
    {
      id: 1,
      pipeline : {
        name : "Annotated Image Generation",
        slug: "annotated_image_generation",
        description: "Generate an image with a prompt and autolabel it"
      },
      form: ((formik : FormikProps<FormValues>) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <FormikInput name="config.number_of_images" label="Number of images to generate"></FormikInput>
            <FormikSelect name="config.aspect_ratio" label="Aspect ratio" options={aspectRatios} />
          </div>
          <FormikItemPicker
            label="Text-to-image generation model"
            name="config.text_to_image_model"
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
          <FormikItemPicker
            label="Labeling model"
            name="config.annotation_model"
            inputs={[
              {
                id: 'grounded_sam',
                title: 'Polygons',
                description: 'Generate polygons for instance detection.',
              },
              {
                id: 'yolo_world',
                title: 'Bounding boxes',
                description: 'Generate Bounding boxes for object detection.',
              },
            ]}
          />
          <FormEnhanceInput>
            <div className="h-[200px]">
              <FormikTextArea label="Prompt for image generation" name="config.prompt"
                              placeholder="Enter your prompt for generating an image">
              </FormikTextArea>
            </div>
          </FormEnhanceInput>
          <FormEnhanceInput>
            <FormikInput label="Negative Prompt for image generation" name="config.negative_prompt"
                         placeholder="Enter your prompt for generating an image">
            </FormikInput>
          </FormEnhanceInput>
          <div className="w-fit">
            <Button colorSchema="primary">Test your prompts</Button>
          </div>
        </>
      )),
      preview: ((formik: FormikProps<FormValues>) => (
        <div className="w-full mt-10 grid grid-cols-5 bg-gray-100 rounded-xl">
          <div className="p-8 col-span-2">
            <img src={AnnotatedImagePipeline} className="w-full" />
          </div>
          <div className="py-10 px-5 col-span-3">
            <h1 className="mt-5 font-semibold text-gray-800 text-lg">Annotated Image Generation</h1>
            <p className="mt-2 text-gray-500 text-sm">
              This is our most easy pipeline for augmenting data.
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Works just within 2 simple steps:
            </p>
            <ul className="mt-2 text-gray-500 text-sm">
              <li>
                <span className="text-black font-semibold">1. Convert a textual prompt into an image:</span> For
                this step you can use multiple models. The most recommended ones are: Stable Diffusion and Flux 1.1
              </li>
              <li>
                    <span
                      className="text-black font-semibold">2. Add annotations using segmentation or detection model:</span> This
                is the last step, for it you can bring your own custom model or just use Grounded SAM or grounded
                YOLO.
              </li>
            </ul>
            <p className="mt-2 text-gray-500 text-sm">As simple as that, enjoy :D</p>
          </div>
        </div>
      )),
      generateFn: async ({values, helpers}: any ) => {
        const totalImages = values.config.number_of_images;
        let numberOfProcessedImages = 0;
        function uploadImage(x: string) {
          return new Promise<DatasetImage>(async (resolve) => {
            try {
              const b64 = x;
              const img  = await createImage({ image: b64, batch: parseInt(batch_id ?? ""), is_synthetic: true });
              numberOfProcessedImages++;
              setProgress(numberOfProcessedImages / totalImages);
              resolve(img);
              return img
            } catch (error) {
              console.error("Error uploading image:", x, error);
            }
          });
        }
        while (numberOfProcessedImages < values.config.number_of_images) {
          const genImg = (await generateImage({ ...values.config, labels: data?.results.map(x => ({id: x.id, name: x.name, prompt: x.prompt})) } as any))
          const img = await uploadImage(genImg.image);
          await apiClient.post(`/datasets/${dataset_id}/images/${img.id}/annotations/batch/`, genImg.annotations.map(x => ({
            ...x,
            is_synthetic: true
          })))
        }
        helpers.setSubmitting(true)
        setProgress(0);
      }
    }
  ]

  const steps: ((formik: FormikProps<FormValues>) => {
    label: string,
    component: React.ReactNode,
    end?: boolean
  })[] = [
    (formik: FormikProps<FormValues>) => ({
      label: 'Pick the pipeline',
      component: (
        <>
          {
            formik.values.pipeline == '' &&
            <div
              className="w-full py-20 bg-gray-100 mt-10 border-2 border-gray-200 rounded-xl flex justify-center items-center flex-col">
              <MdPreview className="text-gray-500" size={40}></MdPreview>
              <h1 className="mt-5 font-semibold text-gray-500">Pick a pipeline to show explanation of how it works</h1>
            </div>
          }
          {
            formik.values.pipeline && pipelines?.find((x) => x.pipeline.slug == formik.values.pipeline)?.preview(formik)
          }
          <div className="mt-4">
            <FormikItemPicker
              label="Pipelines"
              name="pipeline"
              inputs={pipelines.map(x => ({
                id: x.pipeline.slug,
                title: x.pipeline.name,
                description: x.pipeline.description,
              }))}
            />
          </div>
        </>
      ),
    }),
    (formik) => ({
      label: 'Configuration',
      component: (
        <div className="grid gap-4 mt-6">
          {

            formik.values.pipeline && pipelines?.find((x) => x.pipeline.slug == formik.values.pipeline)?.form(formik)
          }
        </div>
      ),
    }),
    () => ({
      label: 'Execute',
      end: true,
      component: (
        <div className="w-full flex flex-col items-center py-14">
          <FaFileZipper size={50} className="text-brand_primary-700" />
          <p className="font-semibold mt-5 mb-5 text-gray-500">Your images are being generated, wait a little bit</p>
          <div className="w-full">
            <Progress.Root defaultValue={0} min={0} max={100} value={progress}>
              <Progress.ValueText className="text-gray-500 mb-4 font-semibold" />
              <Progress.Track className="w-full h-[8px] bg-gray-100 rounded-xl overflow-hidden">
                <Progress.Range className="w-full h-[8px] bg-brand_primary-700" />
              </Progress.Track>
            </Progress.Root>
          </div>
        </div>
      ),
    }),
  ];

  return (
    <Formik initialValues={{ pipeline: '', config: {image: "",aspect_ratio: "16:9", number_of_images: 1, prompt: '', negative_prompt : "", text_to_image: "stable_diffusion", annotation_model: "grounded_sam", strength : 1} }} onSubmit={async (values, helpers) => {
      await pipelines?.find((x) => x.pipeline.slug == values.pipeline)?.generateFn({values, helpers})
      navigate(`/app/datasets/${dataset_id}/dataset_workbench/${batch_id}`)
      await queryClient.invalidateQueries({
        queryKey: ['datasets', parseInt(dataset_id??""), "batches"]
      })
      await queryClient.invalidateQueries({
        queryKey: ['datasets', parseInt(dataset_id??""), "batches"]
      })
    }}>
      {(formik) => (
        <Form>
          <div className="flex">
            <div className="w-full max-w-[240px] bg-gray-100 h-[100vh] p-4 border-r-[1px] border-solid border-gray-200">
              <div className="flex gap-3 items-center">
                <div
                  onClick={() => navigate(-1)}
                  className="cursor-pointer text-xs h-[27px] w-[27px] text-gray-500 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  <FaArrowLeft />
                </div>
                <h1 className="font-semibold text-sm">Data Augmentation</h1>
              </div>
              <div className="w-full mt-5 flex gap-3 flex-col">
                {steps.map((stepFn, index) => {
                  const { label } = stepFn(formik);
                  return (
                    <div key={index} className={`flex gap-2 w-full items-center p-2 rounded-xl ${step === index + 1 ? "bg-gray-200" : ""}`}>
                      <div
                        className={`w-[22px] h-[22px] text-xs ${step > index + 1 ? "text-white bg-green-600" : step === index + 1 ? "text-white bg-brand_primary-500" : "bg-gray-200 text-gray-600"} rounded-full justify-center items-center flex font-semibold`}
                      >
                        {step > index + 1 ? <FaCheck /> : index + 1}
                      </div>
                      <p className={`text-xs ${step === index + 1 ? "text-gray-700 font-semibold" : "text-gray-500"}`}>{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 p-10 h-[100vh] overflow-auto">
              <h2 className="text-xl font-semibold">Step {step}: {steps[step - 1](formik).label}</h2>
              {steps[step - 1](formik).component}
              <div className="w-full justify-center flex">
                <div className="flex justify-between mt-4 gap-3 max-w-[500px] w-full">
                  {
                    !steps[step - 1](formik).end &&
                    <>
                    {step > 1 && (
                      <Button size="md" type="button" colorSchema="primary" onClick={prevStep}>Back</Button>
                    )}
                    {
                    (step < steps.length - 1  ? (
                        <Button size="md" type="button" onClick={nextStep}>Next</Button>
                      ) : (
                        <Button size="md" type="button" onClick={() => {
                          nextStep()
                          formik.submitForm()
                          console.log("hello world")
                        }}>Generate</Button>
                      )
                    )
                    }
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default DataAugmentation;
