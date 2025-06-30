import { Meta, StoryFn } from '@storybook/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormikInput, FormikSelect, FormikPasswordInput, FormikTextArea } from './FormikInputs';
import FormikButton from "./FormikButton.tsx";

export default {
    component: FormikInput,
    subcomponents: { FormikPasswordInput, FormikSelect, FormikTextArea },
} as Meta;

const Template: StoryFn = () => {
    const initialValues = {
        text: '',
        password: '',
        select: '',
        textarea: '',
    };

    const validationSchema = Yup.object({
        text: Yup.string().required('Text is required'),
        password: Yup.string().required('Password is required'),
        select: Yup.string().required('Selection is required'),
        textarea: Yup.string().required('Textarea is required'),
    });

    const options = [
        { value: '', label: 'Select an option' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ];

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, helpers) => {
                helpers.setSubmitting(true)
                setTimeout(() => {
                    helpers.setSubmitting(false)
                    alert(values)
                }, 2000)
            }}
        >
            {() => (
                <Form className="w-full flex flex-col gap-2">
                    <FormikInput name="text" label="Text Input" placeholder="Enter text" />
                    <FormikPasswordInput name="password" label="Password Input" placeholder="Enter password" />
                    <FormikSelect name="select" label="Select Input" options={options}  />
                    <FormikTextArea name="textarea" label="Text Area" placeholder="Enter detailed text" />
                    <FormikButton type="submit">Submit</FormikButton>
                </Form>
            )}
        </Formik>
    );
};

export const Default = Template.bind({});
