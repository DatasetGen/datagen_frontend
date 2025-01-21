import {FormContainerProps} from "./FormContainer.tsx";
import FormInput from "./FormInput.tsx";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export type FormPasswordInputProps = FormContainerProps<HTMLInputElement>

function FormPasswordInput(props: FormPasswordInputProps) {
    return (
            <FormInput {...props} type="password" rightIcon={(props, setProps) => {
                if(props.type === "password") return <FaEye className="cursor-pointer" onClick={() => setProps({type: "text"})}></FaEye>
                return <FaEyeSlash className="cursor-pointer" onClick={() => setProps({type: "password"})}/>
            }}></FormInput>
    );
}

export default FormPasswordInput;