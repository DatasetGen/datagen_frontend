import {useEditorCanvasStore} from "../../core/core.ts";
import { usePopover} from "@ark-ui/react/popover";
import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import React, {ReactNode} from "react";
import {BsStars} from "react-icons/bs";
import OptionMenu from "../../../../../../component_library/utils/OptionMenu.tsx";

export default function EditorIaButton({toolName, children, title} : {
    toolName: string,
    children : ReactNode,
    title: string
}
){
    const popover = usePopover({
        positioning: {
            placement:"right-start"
        }
    })
    const {currentTool} = useEditorCanvasStore()

    return (

        <OptionMenu menuProps={{
            positioning: {
                placement: "right-start"
            }
        }} size="sm" items={[{
                icon: <BsStars></BsStars>,
                title: "Super resolución",
                callback: () => {
                }
            },
            {
                icon: <BsStars></BsStars>,
                title: "Añadir objeto",
                callback: () => {
                }
            },
            {
                icon: <BsStars></BsStars>,
                title: "Cambiar fondo",
                callback: () => {
                }
            }
        ]}>
                <FormIconButton size="md" colorSchema={currentTool == toolName ? "brand_primary" : "secondary"}>
                    {
                        children
                    }
                </FormIconButton>
        </OptionMenu>
    )
}

