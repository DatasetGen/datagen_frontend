import * as arc from '@ark-ui/react/dialog';
import { Portal } from "@ark-ui/react";
import Title from "../texts/Title.tsx";
import { MdClose } from "react-icons/md";
import { tv } from "tailwind-variants";
import {StyleSystemProps} from "../types.ts";
import React from "react";
import { UseDialogReturn} from "@ark-ui/react/dialog";

export interface DialogProps extends StyleSystemProps{
    children?: React.ReactNode;
    title?: string;
    dialog: UseDialogReturn
}

const dialogVariants = tv({
    base: "gap-5 bg-white p-6 rounded-xl shadow-lg w-full relative z-50",
    variants: {
        size: {
            sm: "max-w-md",
            md: "max-w-lg",
            lg: "max-w-2xl",
            xl: "max-w-4xl",
        },
    },
    defaultVariants: {
        size: "xl",
    },
});

const Dialog = ({ size = 'sm', title, children, dialog }: DialogProps) => {
    return (
        <arc.Dialog.RootProvider value={dialog}>
            <Portal>
                <arc.Dialog.Backdrop className="w-full h-[100vh] fixed bg-black bg-opacity-15 top-0 left-0 z-40" />
                <arc.Dialog.Positioner className="fixed inset-0 flex items-center justify-center z-50">
                    <arc.Dialog.Content className={dialogVariants({ size })}>
                        <arc.Dialog.Title asChild>
                            <Title size="md">{title}</Title>
                        </arc.Dialog.Title>
                        <div className="py-5">
                            {children}
                        </div>
                        <arc.Dialog.CloseTrigger asChild>
                            <div className="top-0 right-0 absolute">
                                <div className="cursor-pointer text-gray-500 w-[40px] h-[40px] flex justify-center items-center">
                                    <MdClose size={20} />
                                </div>
                            </div>
                        </arc.Dialog.CloseTrigger>
                    </arc.Dialog.Content>
                </arc.Dialog.Positioner>
            </Portal>
        </arc.Dialog.RootProvider>
    );
}

export default Dialog;
