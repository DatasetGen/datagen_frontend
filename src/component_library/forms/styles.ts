import {tv} from "tailwind-variants";


export const formContainerStyles = tv({
    base: "group transition-all w-full flex items-center gap-2  rounded-md text-gray-500 focus-within:!text-brand_primary-500 font-light border-solid border-2 border-transparent focus-within:!bg-white focus-within:border-brand_primary-500",
    slots: {
        "input": "!p-0 w-full border-0 outline-0 bg-transparent"
    },
    variants: {
        colorSchema: {
            primary: {
               base: "bg-gray-100 hover:bg-gray-200"
            },
            secondary: {
                base: "bg-white hover:bg-gray-50"
            },
            brand_primary: {
                base: ""
            },
            brand_secondary: {
                base: ""
            }
        },
        size: {
            sm: {
                base: "text-xs p-1 px-2"
            },
            md: {
                base: "text-sm p-1 px-3"
            },
            lg: {
                base: "text-sm p-2 px-4"
            },
            xl: {
                base: "text-base p-3 px-5"
            },
        },
        invalid: {
            true: {
                "base": "!border-red-500"
            },
            false: {
                "base": ""
            }
        }
    },
    defaultVariants: {
        "size" : "md",
        "colorSchema" : "primary"
    }
})
