import { tv } from 'tailwind-variants';

export const baseStyle = tv({
    base: "h-[100vh] p-6 flex flex-col justify-between fixed top-0 left-0",
    slots: {
        separator: "border-t border-gray-300", // Default separator style
        logo: "w-[130px]", // Default logo style
    },
    variants: {
        size: {
            sm: "w-[220px] text-sm",
            md: "w-[250px] text-sm",
            lg: "w-[300px] text-base",
            xl: "w-[350px] text-base",
        },
        colorSchema: {
            primary: "bg-gray-100 text-gray-400",
            secondary: "bg-white",
            brand_primary: "bg-brand_primary-500 text-white",
            brand_secondary: "bg-brand_secondary-500 text-white",
        },
    },
    defaultVariants: {
        size: "md",
        colorSchema: "primary",
    },
});

export const innerElementStyle = tv({
    base: "flex items-center gap-2 py-2 px-4 w-full cursor-pointer rounded-lg",
    variants: {
        colorSchema: {
            primary: "!text-gray-500 hover:bg-gray-200",
            secondary: "!text-gray-500 hover:bg-gray-200",
            brand_primary: "text-white hover:bg-white !bg-opacity-10",
            brand_secondary: "text-white hover:bg-white !bg-opacity-10",
        },
        isActive: {
            true: "",
            false: "",
        },
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
            class: "bg-gray-200"
        },
        {
            isActive: true,
            colorSchema: [ "secondary"],
            class: "bg-gray-200 !bg-opacity-85"
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
    base: "h-[100vh]",
    variants: {
        size: {
            sm: "ml-[220px]",
            md: "ml-[250px]",
            lg: "ml-[300px]",
            xl: "ml-[350px]",
        },
        colorSchema: {
            primary: "",
            secondary: "",
            brand_primary: "",
            brand_secondary: "",
        },
    },
    defaultVariants: {
        size: "md",
        colorSchema: "primary",
    },
});
