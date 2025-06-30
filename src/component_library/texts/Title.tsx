import React from 'react';
import {tv} from "tailwind-variants";
import {StyleSystemProps} from "../types.ts";

const styles = tv({
    base: "font-semibold",
    variants: {
        "size": {
            "sm": "text-lg",
            "md": "text-xl",
            "lg": "text-2xl",
            "xl": "text-4xl",
        },
        "colorSchema": {
            "primary": "text-gray-700",
            "secondary": "text-gray-500",
            "brand_primary": "text-brand_primary-500",
            "brand_secondary": "text-brand_secondary-500",
        },
    }
});

interface Title extends StyleSystemProps, Omit<React.HTMLProps<HTMLHeadingElement>, 'size'> {
}

function Title({size, colorSchema , ...props}: Title) {

    return (
        <h1 className={styles({
            size,
            colorSchema
        })} {...props} ></h1>
    );
}

export default Title;