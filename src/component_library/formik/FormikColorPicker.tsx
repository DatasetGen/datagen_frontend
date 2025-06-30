import FormContainer, { FormContainerProps } from "../forms/FormContainer.tsx";
import {useField} from "formik";

const colors = [
    "#E57373",
    "#BA68C8",
    "#81C784",
    "#64B5F6",
    "#FFD54F",
    "#A1887F",
    "#F06292",
    "#4DB6AC",
    "#FF8A65",
    "#7986CB",
    "#DCE775",
    "#FFB74D",
    "#90A4AE",
    "#9575CD",
    "#AED581",
    "#4FC3F7",
];

export type FormColorPickerProps = FormContainerProps<HTMLInputElement>

function FormikColorPicker({
                             ...props
                         }: FormColorPickerProps) {

    const [field, , meta] = useField(props?.name || "")

    return (
        <FormContainer {...props}>
            {() => (
                <div className="flex gap-3 items-center !h-8">
                    {colors.map((color) => (
                        <div key={color} className={`border-2 border-solid  rounded-full p-[2px] ${color === field.value ? "border-brand_primary-500" : "border-transparent"}`}>
                            <div
                                onClick={() => meta.setValue(color)}
                                className={`w-3 h-3 hover:w-5 hover:h-5 rounded-full transition-all cursor-pointer ${
                                    color === field.value ? "!h-7 !w-7 border-2 border-solid border-transparent" : ""
                                }`}
                                style={{ backgroundColor: color }}
                            ></div>
                        </div>
                    ))}
                </div>
            )}
        </FormContainer>
    );
}

export default FormikColorPicker;
