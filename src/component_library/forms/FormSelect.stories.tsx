// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import {BiLowVision, BiUser} from "react-icons/bi";
import FormSelect from "./FormSelect.tsx";

const meta: Meta<typeof FormSelect> = {
    component: FormSelect,
};

const options = [
    {
        value: "pepito",
        label: "pepito"
    },
    {
        value: "juanito",
        label: "juanito"
    }
]
export default meta;
type Story = StoryObj<typeof FormSelect>;

const baseOptions = {
    options: options,
    label : "Label:"
}

//👇 Throws a type error if the args don't match the component props
export const Sm: Story = {
    args: {
        size: "sm",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder",
            ...baseOptions
    },
};

export const Md: Story = {
    args: {
        size: "md",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};

export const Lg: Story = {
    args: {
        size: "lg",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};

export const Xl: Story = {
    args: {
        size: "xl",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};

export const MdSecondary: Story = {
    args: {
        size: "md",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};

export const SmSecondary: Story = {
    args: {
        size: "sm",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};

export const LgSecondary: Story = {
    args: {
        size: "lg",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};

export const XlSecondary: Story = {
    args: {
        size: "xl",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};

export const WithIcons: Story = {
    args: {
        size: "md",
        
        colorSchema: "primary",
        leftIcon: () => <BiUser></BiUser>,
        rightIcon: () => <BiLowVision></BiLowVision>,
        placeholder: "This is a palceholder"
        ,...baseOptions
    }
};
