import React from 'react';
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';
import FormikForm from '../../../../../../component_library/formik/FormikForm.tsx';
import { FormikInput, FormikTextArea } from '../../../../../../component_library/formik/FormikInputs.tsx';
import FormEnhanceInput from '../../../../../../component_library/forms/FormEnhanceInput.tsx';
import FormInput from '../../../../../../component_library/forms/FormInput.tsx';
import Button from '../../../../../../component_library/forms/Button.tsx';

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
        <div className="flex flex-col gap-2">
          <FormikInput placeholder="Name of the category" name="name" label="Name"></FormikInput>
          <FormikInput type="number" placeholder="Number of images to generate" name="images" label="Number of images"></FormikInput>
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