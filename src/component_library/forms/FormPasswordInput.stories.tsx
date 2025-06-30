// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import FormPasswordInput from './FormPasswordInput.tsx';
import {BiLowVision, BiUser} from "react-icons/bi";

const meta: Meta<typeof FormPasswordInput> = {
    component: FormPasswordInput,
};

export default meta;
type Story = StoryObj<typeof FormPasswordInput>;


//👇 Throws a type error if the args don't match the component props
export const Sm: Story = {
    args: {
        size: "sm",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder",
        label: "Nuevo"
    },
};

export const Md: Story = {
    args: {
        size: "md",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder",
    }
};

export const Lg: Story = {
    args: {
        size: "lg",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder"
    }
};

export const Xl: Story = {
    args: {
        size: "xl",
        
        colorSchema: "primary",
        placeholder: "This is a palceholder"
    }
};

export const MdSecondary: Story = {
    args: {
        size: "md",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
    }
};

export const SmSecondary: Story = {
    args: {
        size: "sm",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
    }
};

export const LgSecondary: Story = {
    args: {
        size: "lg",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
    }
};

export const XlSecondary: Story = {
    args: {
        size: "xl",
        
        colorSchema: "secondary",
        placeholder: "This is a palceholder"
    }
};

export const WithIcons: Story = {
    args: {
        size: "md",
        
        colorSchema: "primary",
        leftIcon: () => <BiUser></BiUser>,
        rightIcon: () => <BiLowVision></BiLowVision>,
        placeholder: "This is a palceholder"
    }
};
