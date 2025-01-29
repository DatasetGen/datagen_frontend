import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {
    BiFullscreen,
    BiMove,
    BiPointer,
    BiRotateLeft,
    BiShapePolygon,
    BiSquare,
} from "react-icons/bi";
import {BsStars} from "react-icons/bs";
import {useEditorCanvasStore} from "../core/core.ts";
import * as fabric  from "fabric";
import {ReactNode} from "react";

/*
 */

interface Props{
    toolName: string,
    children : ReactNode
}

function EditorIconButton({toolName, children} : Props){
    const { currentTool, canvasInstance } = useEditorCanvasStore()
    return (<FormIconButton size="md" colorSchema={currentTool == toolName ? "brand_primary" : "secondary"} onClick={() => {
        canvasInstance?.selectTool(toolName)
    }}>
            {
                children
            }
    </FormIconButton>
    )
}

function EditorToolBar() {

    const {canvasInstance, currentTool} = useEditorCanvasStore()

    return (
        <div id="tool-menu"
             className="z-20 flex flex-col gap-1 absolute left-0 top-1/2 transform -translate-y-1/2 p-1 m-2 bg-white rounded-xl">
            <EditorIconButton toolName="cursor">
                <BiPointer></BiPointer>
            </EditorIconButton>
            <EditorIconButton toolName="move">
                <BiMove></BiMove>
            </EditorIconButton>
            <FormIconButton size="md" colorSchema="secondary">
                <BiRotateLeft></BiRotateLeft>
            </FormIconButton>
            <FormIconButton size="md" colorSchema="secondary">
                <BiFullscreen></BiFullscreen>
            </FormIconButton>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <EditorIconButton toolName="bounding_box">
                <BiSquare></BiSquare>
            </EditorIconButton>
            <FormIconButton size="md" colorSchema="secondary">
                <BiShapePolygon></BiShapePolygon>
            </FormIconButton>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <FormIconButton size="md" colorSchema="secondary">
                <BsStars></BsStars>
            </FormIconButton>
        </div>
    );
}

export default EditorToolBar;