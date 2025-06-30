import FormikFormField from './FormikFormField.tsx';
import FormInput, { FormInputProps } from '../forms/FormInput.tsx';
import { useField } from 'formik';
import FormPasswordInput, {
  FormPasswordInputProps,
} from '../forms/FormPasswordInput.tsx';
import FormSelect, { FormSelectProps } from '../forms/FormSelect.tsx';
import FormTextArea, {
  FormTextAreaProps,
} from '../forms/FormTextarea.tsx';

interface BaseFormikProps {
  name: string;
}

const createFormikField =
  <T extends BaseFormikProps>(Component: React.ComponentType<T>) =>
  (props: T) => {
    const [field, meta] = useField(props.name);
    return (
      <FormikFormField name={props.name}>
        <Component {...props} {...field} invalid={meta.error && meta.touched} />
      </FormikFormField>
    );
  };

export const FormikInput = createFormikField<FormInputProps & BaseFormikProps>(
  FormInput
);
export const FormikPasswordInput = createFormikField<
  FormPasswordInputProps & BaseFormikProps
>(FormPasswordInput);
export const FormikSelect = createFormikField<
  FormSelectProps & BaseFormikProps
>(FormSelect);
export const FormikTextArea = createFormikField<
  FormTextAreaProps & BaseFormikProps
>(FormTextArea);
