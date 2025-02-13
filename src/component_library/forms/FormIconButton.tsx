import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {tv} from "tailwind-variants";
import {StyleSystemProps} from "../types.ts";
import Spinner from "../utils/Spinner.tsx";


const styles = tv({
    base: "transition-all rounded-lg font-semibold w-full flex justify-center items-center gap-2",
    variants: {
        "size" : {
            "xs": "h-[25px] w-[25px] py-1 text-sm",
            "sm": "h-[30px] w-[30px] py-1 text-sm",
            "md": "h-[35px] w-[35px] text-md",
            "lg": "h-[40px] w-[40px] text-lg",
            "xl": "h-[45px] w-[45px] p-4 text-lg",
        },
        "colorSchema": {
            "primary": "bg-gray-100 hover:bg-gray-200 text-gray-500 active:bg-gray-100",
            "secondary": "bg-white hover:bg-gray-100 text-gray-500 active:bg-white",
            "brand_primary": "bg-brand_primary-500 hover:bg-brand_primary-700 active:bg-brand_primary-400 text-white",
            "brand_secondary": "bg-brand_secondary-500 text-white hover:bg-brand_secondary-200 active:bg-brand_secondary-700",
        },
        "disabled": {
            true: "bg-gray-100 hover:!bg-gray-100 text-gray-400 !cursor-not-allowed",
            false: ""
        },
        "rounded": {
            true: "rounded-full",
            false: ""
        },

    },
    defaultVariants: {
        size: "sm",
        colorSchema: "brand_primary"
    }
})

export interface IconButtonProps extends StyleSystemProps, Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "size">{
    loading?:boolean,
    disabled ?: boolean,
    rounded?: boolean,
}

function FormIconButton({size, loading, colorSchema, children, disabled, rounded, ...props}: IconButtonProps) {
    return (
        <button {...props} className={styles({size, colorSchema, disabled, rounded})} onClick={disabled ? undefined : props.onClick} >
            {loading && <Spinner size={size} colorSchema={colorSchema} disabled={disabled}></Spinner>}
            {!loading && children}
        </button>
    );
}

export default FormIconButton;