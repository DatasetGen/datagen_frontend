import React from 'react';
import FormCombobox, { FormComboBoxProps } from '../forms/FormCombobox.tsx';
import { useField } from 'formik';

interface ComboboxProps<T> extends FormComboBoxProps<T>{
  name: string
}

function FormikCombobox<T>({name, config, ...props}: ComboboxProps<T>) {
  const [,, helpers] = useField(name)
  return (
    <FormCombobox config={{
      ...config,
      onValueChange: (value) =>  {
        helpers.setValue(value.value)
      }
    }} {...props}></FormCombobox>
  );
}

export default FormikCombobox;