import FormContainer, {FormContainerProps} from "./FormContainer.tsx";

export type FormInputProps = FormContainerProps<HTMLInputElement>

function FormInput(props: FormInputProps) {
    return (
            <FormContainer {...props}>
                {
                    (props) => <input {...props}/>
                }
            </FormContainer>
    );
}

export default FormInput;