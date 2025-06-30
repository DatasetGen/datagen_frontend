import React from 'react';
import { useField } from 'formik';
import FormikFormField from './FormikFormField.tsx';
import FormFileInput, {FormFileInputProps} from "../forms/FormFileInput.tsx"; // Import the FormikFormField component

// Function to convert file to base64
const convertFileToBase64 = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result as string);
    };
    reader.readAsDataURL(file);
};

export type FormikFileInputProps = FormFileInputProps & {
    // Add any additional props if needed
};

function FormikFileInput(props: FormikFileInputProps) {
    const [field, , helpers] = useField(props.name ?? ""); // Access Formik field, meta, and helpers

    // Handle file change, converting file to base64 and updating Formik state
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            convertFileToBase64(file, (base64) => {
                helpers.setValue(base64); // Set base64 as the value in Formik's state
            });
        } else {
            helpers.setValue(''); // Reset value if no file selected
        }
    };

    return (
        <FormikFormField name={props.name ?? ""}>
            <FormFileInput {...props} onChange={handleFileChange}></FormFileInput>
        </FormikFormField>
    );
}

export default FormikFileInput;
