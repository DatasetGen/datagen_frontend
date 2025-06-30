import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {tv} from "tailwind-variants";
import {StyleSystemProps} from "../types.ts";
import Spinner from "../utils/Spinner.tsx";

const styles = tv({
    base: "transition-all rounded-lg font-semibold w-full flex justify-center items-center gap-2",
    variants: {
        "size" : {
            "sm": "px-3 py-2 text-xs",
            "md": "p-2 text-xs px-4 py-3",
            "lg": "p-3 text-sm",
            "xl": "p-4",
        },
        "colorSchema": {
            "primary": "bg-gray-200 hover:!bg-gray-300 text-gray-500 active:bg-gray-100",
            "secondary": "bg-white hover:!bg-gray-100 text-gray-500 active:bg-white",
            "brand_primary": "bg-brand_primary-500 hover:bg-brand_primary-700 active:bg-brand_primary-400 text-white",
            "brand_secondary": "bg-brand_secondary-500 text-white hover:bg-brand_secondary-200 active:bg-brand_secondary-700",
        },
        "disabled": {
            true: "bg-gray-100 hover:!bg-gray-100 text-gray-400 !cursor-not-allowed",
            false: ""
        },
        "danger": {
            true: "bg-red-500 hover:!bg-red-600 text-white",
            false: ""
        },
        "success": {
            true: "bg-green-500 hover:bg-green-600 active:bg-green-400 text-white",
            false: ""
        },
        "warning": {
            true: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-400 text-black",
            false: ""
        },
        "information": {
            true: "bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white",
            false: ""
        }
    },
    defaultVariants: {
        size: "sm",
        colorSchema: "brand_primary"
    }
})

export interface ButtonProps extends StyleSystemProps, Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "size">{
    loading?: boolean,
    disabled?: boolean,
    danger?: boolean,
    success?: boolean,
    warning?: boolean,
    information?: boolean,
}

function Button({size, loading, colorSchema, children, disabled, danger, success, warning, information, ...props}: ButtonProps) {
    return (
        <button {...props} className={styles({size, colorSchema, disabled, danger, success, warning, information})} >
            {loading && <Spinner size={size} colorSchema={colorSchema} disabled={disabled} danger={danger}></Spinner>}
            {children}
        </button>
    );
}

export default Button;