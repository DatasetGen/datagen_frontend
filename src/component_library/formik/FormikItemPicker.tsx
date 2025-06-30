import { FormItem, FormItemPickerProps } from '../forms/FormItemPicker';
import { useField } from 'formik';
import FormItemPicker from '../forms/FormItemPicker.tsx';

type FormikItemPickerProps<T> = {
  name: string;
  inputs: (T &FormItem)[];
  children?: (item: T & FormItem, active : boolean) => React.ReactNode;
} & Partial<FormItemPickerProps<T>>;

export function FormikItemPicker<T>({ name, inputs, children, ...props}: FormikItemPickerProps<T>) {
  const [field, , helpers] = useField(name);

  return (
    <FormItemPicker
      inputs={inputs}
      value={field.value}
      onChange={(id) => helpers.setValue(id)}
      children={children}
      {...props}
    />
  );
}