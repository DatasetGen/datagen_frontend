import Button, {ButtonProps} from "../forms/Button.tsx";
import {useFormikContext} from "formik";

type Props = ButtonProps

function FormikButton(props: Props) {

    const {isSubmitting, isValid, submitForm} = useFormikContext();

    return (
        <Button  disabled={isSubmitting || !isValid} loading={isSubmitting} type="submit" onClick={submitForm} {...props}></Button>
    );
}

export default FormikButton;