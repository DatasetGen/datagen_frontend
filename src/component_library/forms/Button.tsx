import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {tv} from "tailwind-variants";
import {StyleSystemProps} from "../types.ts";
import Spinner from "../utils/Spinner.tsx";


const styles = tv({
    base: "transition-all rounded-lg font-semibold w-full flex justify-center items-center gap-2",
    variants: {
        "size" : {
            "sm": "px-2 py-1 text-sm",
            "md": "p-2 text-sm",
            "lg": "p-3 text-sm",
            "xl": "p-4",
        },
        "colorSchema": {
            "primary": "bg-gray-200 hover:bg-gray-200 text-gray-500 active:bg-gray-100",
            "secondary": "bg-white hover:bg-gray-100 text-gray-500 active:bg-white",
            "brand_primary": "bg-brand_primary-500 hover:bg-brand_primary-700 active:bg-brand_primary-400 text-white",
            "brand_secondary": "bg-brand_secondary-500 text-white hover:bg-brand_secondary-200 active:bg-brand_secondary-700",
        },
        "disabled": {
            true: "bg-gray-100 hover:!bg-gray-100 text-gray-400 !cursor-not-allowed",
            false: ""
        }
    },
    defaultVariants: {
        size: "sm",
        colorSchema: "brand_primary"
    }
})

export interface ButtonProps extends StyleSystemProps, Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "size">{
    loading?:boolean,
    disabled ?: boolean
}

function Button({size, loading, colorSchema, children, disabled, ...props}: ButtonProps) {
    return (
        <button {...props} className={styles({size, colorSchema, disabled})} >
            {loading && <Spinner size={size} colorSchema={colorSchema} disabled={disabled}></Spinner>}
            {children}
        </button>
    );
}

export default Button;