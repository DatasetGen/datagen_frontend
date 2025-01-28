import FormContainer, {FormContainerProps} from "./FormContainer.tsx";

export interface FormSelectProps extends FormContainerProps<HTMLSelectElement>{
    options?: {value: string | number, label:string}[]
}

function FormSelect({options, ...props}: FormSelectProps) {
    return (
        <FormContainer {...props}>
            {
                (props) => (
                    <select {...props}>
                        {
                            options?.map(option =>(
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                )
            }
        </FormContainer>
    );
}

export default FormSelect;