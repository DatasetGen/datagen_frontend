import React from 'react';
import { useField} from "formik";

export interface FormikFormFieldProps{
    name : string,
    children: React.ReactNode
}

function FormikFormField({name, children} : FormikFormFieldProps) {
    const [ ,meta, ] = useField(name);

    return (
        <div className="h-full">
            {
                children
            }
            {
                meta.touched && meta.error &&
                <p className="text-red-500 text-sm mt-1">
                    {meta.error}
                </p>
            }
        </div>
    );
}

export default FormikFormField;