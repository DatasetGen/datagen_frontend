import { FormItem } from "../forms/FormItemPicker";
import { useField } from 'formik';
import FormItemPicker from '../forms/FormItemPicker.tsx';

type FormikItemPickerProps<T> = {
  name: string;
  inputs: (T &FormItem)[];
  children?: (item: T & FormItem, active : boolean) => React.ReactNode;
};

export function FormikItemPicker<T>({ name, inputs, children }: FormikItemPickerProps<T>) {
  const [field, , helpers] = useField(name);

  return (
    <FormItemPicker
      inputs={inputs}
      value={field.value}
      onChange={(id) => helpers.setValue(id)}
      children={children}
    />
  );
}