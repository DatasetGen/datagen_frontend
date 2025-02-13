import React from 'react';
import FormikFormField from "./FormikFormField.tsx";
import FormFileField from "../forms/FormFileField.tsx";
import {FormContainerProps} from "../forms/FormContainer.tsx";
import {useFileUpload, UseFileUploadProps} from "@ark-ui/react";
import {useField} from "formik";


interface props extends FormContainerProps<HTMLInputElement>{
    name : string,
    fileField: UseFileUploadProps
}

function FormikFileField({name, fileField, ...props}: props) {
    const [field, , helpers] = useField(name ?? ""); // Access Formik field, meta, and helpers
    const fileUpload = useFileUpload({
        ...fileField,
        onFileChange: (files) => {
            helpers.setValue(files.acceptedFiles)
        }
    })

    return (
        <FormikFormField name={name}>
            <FormFileField fileField={fileUpload} {...props}/>
        </FormikFormField>
    );
}

export default FormikFileField;