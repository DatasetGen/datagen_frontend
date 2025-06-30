import { tv } from 'tailwind-variants';

export const baseStyle = tv({
    base: "h-[100vh] p-6 px-4 flex flex-col justify-between absolute top-0 left-0 [&_.icon]:text-lg border-r-[1px] border-solid border-gray-200",
    slots: {
        separator: "border-t border-gray-300", // Default separator style
        logo: "w-[130px]", // Default logo style
    },
    variants: {
        size: {
            sm: "w-[200px] text-xs",
            md: "w-[225px] text-sm [&_.icon]:text-base",
            lg: "w-[300px] text-base",
            xl: "w-[350px] text-base",
        },
        colorSchema: {
             primary: "bg-gray-100 text-gray-400",
            secondary: "bg-white",
            brand_primary: "bg-brand_primary-500 text-white",
            brand_secondary: "bg-brand_secondary-500 text-white",
        },
        reduced: {
            true: "!p-3",
            false: ""
        }
    },
    compoundVariants: [
        {
            reduced: true,
            size: "sm",
            class: "!w-[65px] [&_.icon]:text-lg"
        },
        {
            reduced: true,
            size: "md",
            class: "!w-[78px] [&_.icon]:text-xl !p-4"
        },
        {
            reduced: true,
            size: "lg",
            class: "!w-[120px]"
        },
        {
            reduced: true,
            size: "xl",
            class: "!w-[120px]"
        },
    ],
    defaultVariants: {
        size: "md",
        colorSchema: "primary",
    },
});

export const innerElementStyle = tv({
    base: "flex items-center gap-2 py-2 px-4 w-full cursor-pointer rounded-lg [&>.icon]:text-lg",
    variants: {
        colorSchema: {
            primary: "!text-gray-500 hover:bg-gray-200",
            secondary: "!text-gray-500 hover:bg-gray-100",
            brand_primary: "text-white hover:bg-white !bg-opacity-10",
            brand_secondary: "text-white hover:bg-white !bg-opacity-10",
        },
        isActive: {
            true: "",
            false: "",
        },
        reduced: {
            true: "flex justify-center items-center aspect-square",
            false: ""
        }
    },
    compoundVariants: [
        {
            isActive: true,
            colorSchema: ["brand_primary", "brand_secondary"],
            class: "!bg-white !bg-opacity-20"
        },
        {
            isActive: false,
            colorSchema: ["brand_primary", "brand_secondary"],
            class: "text-opacity-65 hover:text-white"
        },
        {
            isActive: true,
            colorSchema: ["primary"],
            class: "bg-gray-200 !text-brand_primary-500"
        },
        {
            isActive: true,
            colorSchema: [ "secondary"],
            class: "bg-gray-100 !bg-opacity-85"
        },
        {
            isActive: false,
            colorSchema: ["primary", "secondary"],
            class: "text-opacity-65 hover:bg-gray-200 !bg-opacity-65"
        },
    ],
    defaultVariants: {
        colorSchema: "primary",
    },
});

export const sidebarWrapperStyle = tv({
    base: "h-[100vh] relative overflow-auto",
    variants: {
        size: {
            sm: "ml-[220px]",
            md: "ml-[225px]",
            lg: "ml-[300px]",
            xl: "ml-[350px]",
        },
        colorSchema: {
            primary: "",
            secondary: "",
            brand_primary: "",
            brand_secondary: "",
        },
        reduced: {
            true: "",
            false: ""
        }
    },
    compoundVariants: [
        {
            reduced: true,
            size: "sm",
            class: "!ml-[65px]"
        },
        {
            reduced: true,
            size: "md",
            class: "!ml-[78px]"
        },
        {
            reduced: true,
            size: "lg",
            class: "!ml-[120px]"
        },
        {
            reduced: true,
            size: "xl",
            class: "!ml-[120px]"
        },
    ],
    defaultVariants: {
        size: "md",
        colorSchema: "primary",
    },
});
