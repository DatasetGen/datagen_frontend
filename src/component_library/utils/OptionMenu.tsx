import React from 'react';
import * as arc from '@ark-ui/react';
import FormIconButton, {IconButtonProps} from "../forms/FormIconButton.tsx";
import {HiDotsHorizontal} from "react-icons/hi";

interface EntityMenuProps {
    children: React.ReactNode,
    items ?: {
        title: string,
        icon: React.ReactNode,
        callback: () => void,
        trash?: boolean
    }[]
}

function OptionMenu(props : EntityMenuProps) {
    return (
        <>
            <arc.Menu.Root closeOnSelect>
                <arc.Menu.Trigger onClick={(e) => e.stopPropagation()} asChild>
                    {props.children}
                </arc.Menu.Trigger>
                <arc.Menu.Positioner>
                    <arc.Menu.Content className="bg-gray-50 p-2 text-sm !outline-0 border-0  mt-1 z-50  rounded-xl min-w-[150px] ">
                        <div className="flex flex-col gap-1">
                            {
                                props.items?.map((x) => (
                                    <div key={x.title} onClick={(e) => {
                                        x.callback()
                                        e.stopPropagation()
                                    }}>
                                        <arc.Menu.Item closeOnSelect={true}
                                                       value="react"
                                                       className={`rounded-lg flex items-center gap-3 w-full  p-3 py-1 box-border font-semibold cursor-pointer 
                                                    ${x.trash ? 'hover:bg-gray-100 text-red-500' : 'hover:bg-gray-100 text-gray-600'}`}>
                                            {x.icon}
                                            <p>{x.title}</p>
                                        </arc.Menu.Item>
                                    </div>
                                ))
                            }
                        </div>
                    </arc.Menu.Content>
                </arc.Menu.Positioner>
            </arc.Menu.Root>
        </>
    );
}

type OptionMenuContainer = EntityMenuProps & {
    iconProps?: IconButtonProps
}

export function OptionMenuContainer({children, iconProps, ...props} : OptionMenuContainer) {
    return (<div className="relative">
        <OptionMenu {...props}>
            <div className="absolute top-0 right-0 m-4 z-10">
                <FormIconButton size="md" colorSchema="primary" {...iconProps}>
                    <HiDotsHorizontal></HiDotsHorizontal>
                </FormIconButton>
            </div>
        </OptionMenu>
        {
            children
        }
    </div>
    )
}

export default OptionMenu;