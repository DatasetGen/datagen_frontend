import FormContainer, {FormContainerProps} from "./FormContainer.tsx";

export interface FormSelectProps extends FormContainerProps<HTMLSelectElement>{
    options?: {value: string | number | any, label:string}[]
}

function FormSelect({options, ...props}: FormSelectProps) {
    return (
        <FormContainer {...props}>
            {
                (props) => (
                    <select {...props}>
                        {
                            options?.map((option, index) =>(
                                <option key={index} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                )
            }
        </FormContainer>
    );
}

export default FormSelect;