import { Menu } from '@ark-ui/react';
import React from 'react';
import Button, {ButtonProps} from "./Button.tsx";

interface FormMenuButtonProps extends ButtonProps{
    items ?: {
        title: string,
        icon: React.ReactNode,
        callback: () => void,
    }[],
  menuSize: string
}

function MenuButton({items, menuSize, ...props} : FormMenuButtonProps) {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button {...props}></Button>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content className=" shadow-[3px_4px_38px_0px_rgba(0,_0,_0,_0.06)] outline-0 bg-white p-2 min-w-[230px] rounded-xl text-gray-700 z-30">
                    {
                       items?.map(item => (
                           <div key={item.title} onClick={() => item.callback()}>
                               <Menu.Item  value="react" className="flex items-center text-xs font-semibold gap-2 p-2 hover:bg-gray-100 rounded-xl cursor-pointer">
                                   {
                                       item.icon
                                   }
                                   {item.title}
                               </Menu.Item>
                           </div>
                       ))
                    }
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
}

export default MenuButton;