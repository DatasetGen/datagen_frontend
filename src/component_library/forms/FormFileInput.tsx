import FormContainer, { FormContainerProps } from "./FormContainer.tsx";

export type FormFileInputProps = FormContainerProps<HTMLInputElement>;

function FormFileInput(props: FormFileInputProps) {
    return (
        <FormContainer {...props}>
            {(inputProps) => (
                <>
                    <input
                        {...inputProps}
                        type="file"
                    />
                </>
            )}
        </FormContainer>
    );
}

export default FormFileInput;
