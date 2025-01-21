import FormContainer, {FormContainerProps} from "./FormContainer.tsx";

export type FormTextAreaProps = FormContainerProps<HTMLTextAreaElement>

function FormTextArea(props: FormTextAreaProps) {
    return (
            <FormContainer {...props}>
                {
                    (props) => <textarea {...props}/>
                }
            </FormContainer>
    );
}

export default FormTextArea;