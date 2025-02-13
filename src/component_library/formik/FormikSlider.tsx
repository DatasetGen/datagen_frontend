import React from 'react';
import FormSlider, { FormSliderProps } from '../forms/FormSlider.tsx';
import { useField } from 'formik';

interface Props extends FormSliderProps{
  name: string
}

function FormikSlider({name, config, ...props} : Props) {
  const [field, meta, helpers] = useField(name)

  return (
    <FormSlider config={{
      ...config,
      onValueChange(details) {
        helpers.setValue(details.value)
      },
    }} {...props}></FormSlider>
  );
}

export default FormikSlider;