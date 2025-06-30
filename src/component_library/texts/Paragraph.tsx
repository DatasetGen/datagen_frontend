import React from 'react';
import {tv} from "tailwind-variants";
import {StyleSystemProps} from "../types.ts";

const styles = tv({
    base: "",
    variants: {
        "size": {
            "sm": "text-sm",
            "md": "text-base",
            "lg": "text-lg",
            "xl": "text-xl",
        },
        "colorSchema": {
            "primary": "text-gray-700",
            "secondary": "text-gray-500",
            "brand_primary": "text-brand_primary-500",
            "brand_secondary": "text-brand_secondary-500",
        },
    }
});

interface Paragraph extends StyleSystemProps, Omit<React.HTMLProps<HTMLHeadingElement>, 'size'> {
}

function Paragraph({size, colorSchema , ...props}: Paragraph) {

    return (
        <p className={styles({
            size,
            colorSchema
        })} {...props} ></p>
    );
}

export default Paragraph;