import {ReactNode} from "react";
import {useEditorCanvasStore} from "../../core/core.ts";
import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import {EditorTool} from "../../core/EditorCanvas.ts";

interface Props{
    tool: EditorTool,
    children : ReactNode
}

export default function EditorIconButton({tool, children} : Props){
    const { currentTool, canvasInstance } = useEditorCanvasStore()
    return (<FormIconButton size="md" colorSchema={currentTool == tool.name ? "brand_primary" : "secondary"} onClick={() => {
            canvasInstance?.selectTool(tool)
        }}>
            {
                children
            }
        </FormIconButton>
    )
}
