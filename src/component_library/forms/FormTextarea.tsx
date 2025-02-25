import FormContainer, {FormContainerProps} from "./FormContainer.tsx";

export type FormTextAreaProps = FormContainerProps<HTMLTextAreaElement>

function FormTextArea(props: FormTextAreaProps) {
    return (
            <FormContainer {...props} extraClassName="h-full">
                {
                    (props) => <textarea {...props} className={props.className + " " + "!h-full"} />
                }
            </FormContainer>
    );
}

export default FormTextArea;