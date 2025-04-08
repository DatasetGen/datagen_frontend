import React from 'react';
import {Formik, FormikHelpers, FormikValues} from "formik";

interface Props<T> extends Omit<React.HTMLProps<HTMLDivElement>, 'onSubmit'> {
    initialValues: T & FormikValues,
    onSubmit: (values: T, helpers : FormikHelpers<T & FormikValues>) => void,
    validationSchema ?: never,
    fetchErrors ?: string,
    children : React.ReactNode

}

function Form<T>({initialValues, validationSchema, onSubmit, children, fetchErrors, ...props} : Props<T>) {
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {
                ({submitForm}) => (
                    <div onKeyDown={async (e) =>{
                        if (e.key === 'Enter') {
                            e.preventDefault(); // prevent default behavior for inputs
                            await submitForm(); // manually trigger form submission
                        }
                    }} {...props}>

                        { children }
                        {

                        }
                        {
                            fetchErrors && <div className="text-red-500">
                                {fetchErrors}
                            </div>
                        }
                    </div>
                )
            }
        </Formik>
    );
}

export default Form;