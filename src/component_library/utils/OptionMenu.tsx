import React from 'react';
import * as arc from '@ark-ui/react';
import FormIconButton, { IconButtonProps } from "../forms/FormIconButton.tsx";
import { HiDotsHorizontal } from "react-icons/hi";
import { tv } from 'tailwind-variants';
import { UseMenuProps} from "@ark-ui/react";

const menuSize = tv({
    base: "rounded-lg flex items-center gap-3 w-full p-3 py-1 box-border font-semibold cursor-pointer",
    variants: {
        size: {
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
            xl: "text-lg"
        },
        trash: {
            true: "hover:bg-gray-100 text-red-500",
            false: "hover:bg-gray-100 text-gray-600"
        }
    },
    defaultVariants: {
        size: "md",
        trash: false
    }
});

interface EntityMenuProps {
    children: React.ReactNode,
    items?: {
        title: string,
        icon: React.ReactNode,
        callback: () => void,
        trash?: boolean
    }[],
    size?: "sm" | "md" | "lg" | "xl",
    buttonSize?: "sm" | "md" | "lg" | "xl",
    menuProps?: UseMenuProps
}

function OptionMenu({ children, items, size = "md", menuProps  }: EntityMenuProps) {
    return (
        <arc.Menu.Root closeOnSelect {...menuProps}>
            <arc.Menu.Trigger onClick={(e) => e.stopPropagation()} asChild>
                {children}
            </arc.Menu.Trigger>
            <arc.Menu.Positioner >
                <arc.Menu.Content className="bg-gray-50 p-2 border-0 mt-1 relative !z-50 rounded-xl min-w-[150px] outline-none">
                    <div className="flex flex-col gap-1">
                        {items?.map((x) => (
                            <div key={x.title} onClick={(e) => {
                                x.callback();
                                e.stopPropagation();
                            }}>
                                <arc.Menu.Item closeOnSelect className={menuSize({ size, trash: x.trash })}>
                                    {x.icon}
                                    <p>{x.title}</p>
                                </arc.Menu.Item>
                            </div>
                        ))}
                    </div>
                </arc.Menu.Content>
            </arc.Menu.Positioner>
        </arc.Menu.Root>
    );
}

type OptionMenuContainerProps = EntityMenuProps & {
    iconProps?: IconButtonProps
};

export function OptionMenuContainer({ children, iconProps, size,buttonSize="md", ...props }: OptionMenuContainerProps) {
    return (
        <div className="relative">
            <OptionMenu size={size} {...props}>
                <div className="absolute top-0 right-0 m-4 z-10">
                    <FormIconButton size={buttonSize} colorSchema="primary" {...iconProps}>
                        <HiDotsHorizontal />
                    </FormIconButton>
                </div>
            </OptionMenu>
            {children}
        </div>
    );
}

export default OptionMenu;
