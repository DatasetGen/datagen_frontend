import React from 'react';
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';
import FormikForm from '../../../../../../component_library/formik/FormikForm.tsx';
import { FormikInput, FormikSelect, FormikTextArea } from '../../../../../../component_library/formik/FormikInputs.tsx';
import FormEnhanceInput from '../../../../../../component_library/forms/FormEnhanceInput.tsx';
import FormInput from '../../../../../../component_library/forms/FormInput.tsx';
import Button from '../../../../../../component_library/forms/Button.tsx';
import { FormikItemPicker } from '../../../../../../component_library/formik/FormikItemPicker.tsx';
import FormikFileInput from '../../../../../../component_library/formik/FormikFileInput.tsx';

function DataGen(props) {
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
    <PageLayout title="Data generation">
      <FormikForm initialValues={{name: formatDate(new Date()) }} onSubmit={() => {}}>
        <div className="flex flex-col gap-3 mt-8">
          <FormikInput placeholder="Name of the category" name="name" label="Name"></FormikInput>
          <div className="grid grid-cols-3 gap-3">
            <FormikInput type="number" placeholder="Number of images to generate" name="number_images" label="Number of images"></FormikInput>
            <FormikSelect name="aspect_ratio" label="Aspect ratio" options={[
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
            ]}>

            </FormikSelect>
            <FormikFileInput type="number" placeholder="Number of images to generate" name="number_images" label="Base image (optional)"></FormikFileInput>
          </div>
          <FormikItemPicker
            label="Model to use"
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
          <FormEnhanceInput>
          <div className="h-[150px]">
            <FormikTextArea colorSchema="secondary" label="Prompt" extraClassName="h-full" name="prompt" placeholder="Prompt for generation"></FormikTextArea>
          </div>
          </FormEnhanceInput>
          <FormEnhanceInput>
              <FormikInput colorSchema="secondary" label="Negative prompt" extraClassName="h-full" name="negative_prompt" placeholder="Prompt for generation"></FormikInput>
          </FormEnhanceInput>

          <div className="max-w-[160px]">
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="max-w-[350px] w-full flex gap-3">
              <Button colorSchema="primary">
                Test your prompts
              </Button>
              <Button colorSchema="brand_primary" size="lg">
                Generate Images
              </Button>
            </div>
          </div>
        </div>
      </FormikForm>
    </PageLayout>
  );
}

export default DataGen;