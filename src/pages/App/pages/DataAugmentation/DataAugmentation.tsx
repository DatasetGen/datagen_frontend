import React, { useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Formik, Form, Field, FormikProps } from 'formik';
import Button from '../../../../component_library/forms/Button.tsx';
import { FormikItemPicker } from '../../../../component_library/formik/FormikItemPicker.tsx';
import { MdPreview } from 'react-icons/md';
import AnnotatedImagePipeline from '../../../../assets/AnnotationImagePipeline.png';
import { FormikInput, FormikTextArea } from '../../../../component_library/formik/FormikInputs.tsx';
import FormEnhanceInput from '../../../../component_library/forms/FormEnhanceInput.tsx';

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

  const steps = [
    (formik: FormikProps<FormValues>) => ({
      label: "Pick the pipeline",
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
            formik.values.pipeline == 'text_to_image_generation' &&
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
                <p className="mt-2 text-gray-500 text-sm">As simple as that, enjoy >:D</p>
              </div>
            </div>
          }
          <FormikItemPicker
            name="pipeline"
            inputs={[
              {
                id: 'text_to_image_generation',
                title: 'Annotated Image Generation',
                description: 'Generate an image with a prompt and then autolabel it',
              },
              {
                id: 'image_to_image_generation',
                title: 'Image Variants Generation',
                description: 'Choose an already existing image and generate multiple samples with text driven variations.',
                disabled: true,
              },
              {
                id: 'replace_labels_by_others',
                title: 'Object Replacing',
                description: 'Choose an already labeled image and substitute all objects of a category by others of the same category',
                disabled: true,
              },
              {
                id: 'small_object_generation',
                title: 'Small Object Generation',
                description: 'Pick a zone of an image (Ej. Sea) and generate concrete objects (Ej. Boats) randomly in that zone',
                disabled: true,
              },
            ]}
          />
        </>
      ),
    }),
    () => ({
      label: 'Configuration',
      component: (
        <div className="mt-5">
          <label className="text-gray-500 font-semibold">Pick a model for text-to-image generation</label>
          <FormikItemPicker
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
          <div className="mt-5">
            <label className="text-gray-500 font-semibold">Pick a model for annotation</label>
            <FormikItemPicker
              name="config.annotation_models"
              inputs={[
                {
                  id: 'grounded_sam',
                  title: 'Grounded SAM',
                  description: 'Generate Semantic Segmentation annotations using Grounded SAM',
                },
                {
                  id: 'grounded_yolo',
                  title: 'Grounded Yolo',
                  description: 'Generate Detection annotations using Grounded YOLO',
                },
              ]}
            />
          </div>
        </div>
      ),
    }),
    () => ({
      label: 'Execute',
      component: (
        <div className="mt-5 flex flex-col gap-2">
          <FormEnhanceInput>
            <div className="h-[200px]">
              <FormikTextArea label="Prompt for image generation" name="execution.prompt" placeholder="Enter your prompt for generating an image">
              </FormikTextArea>
            </div>
          </FormEnhanceInput>
          <FormEnhanceInput>
              <FormikInput label="Negative Prompt for image generation" name="execution.negative_prompt" placeholder="Enter your prompt for generating an image">
              </FormikInput>
          </FormEnhanceInput>
        </div>
      ),
    }),
  ];

  return (
    <Formik initialValues={{ pipeline: "", config: "", prompt: "" }} onSubmit={(values) => console.log("Final Form Values:", values)}>
      {(formik) => (
        <Form>
          <div className="flex">
            <div className="w-full max-w-[240px] bg-gray-100 h-[100vh] p-4 border-l-[1px] border-solid border-gray-200">
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
            <div className="flex-1 p-10">
              <h2 className="text-xl font-semibold">Step {step}: {steps[step - 1](formik).label}</h2>
              {steps[step - 1](formik).component}
              <div className="w-full justify-center flex">
                <div className="flex justify-between mt-4 gap-3 max-w-[500px] w-full">
                  {step > 1 && (
                    <Button size="md" type="button" colorSchema="primary" onClick={prevStep}>Back</Button>
                  )}
                  {step < steps.length ? (
                    <Button size="md" type="button" onClick={nextStep}>Next</Button>
                  ) : (
                    <Button size="md" type="submit" onClick={formik.handleSubmit}>Submit</Button>
                  )}
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
