import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import {
    BiFullscreen,
    BiMove,
    BiPointer,
    BiShapePolygon,
    BiSquare,
} from "react-icons/bi";
import {BsStars} from "react-icons/bs";
import {useEditorCanvasStore} from "../../core/core.ts";
import EditorIconButton from "./EditorIconButton.tsx";
import EditorToolButton from "./EditorToolButton.tsx";
import EditorIaButton from "./EditorIaButton.tsx";
import {BoundingBoxTool} from "../../core/tools/BoundingBoxTool.ts";
import {PolygonTool} from "../../core/tools/PolygonTool.ts";
import {MoveTool} from "../../core/tools/MoveTool.ts";
import {CursorTool} from "../../core/tools/CursorTool.ts";

function EditorToolBar() {

    const {canvasInstance, currentTool} = useEditorCanvasStore()

    return (
        <div id="tool-menu"
             className="z-20 flex flex-col gap-1 absolute left-0 top-1/2 transform -translate-y-1/2 p-1 m-2 bg-white rounded-xl">
            <EditorIconButton tool={new CursorTool()}>
                <BiPointer></BiPointer>
            </EditorIconButton>
            <EditorIconButton tool={new MoveTool()}>
                <BiMove></BiMove>
            </EditorIconButton>
            <FormIconButton size="md" colorSchema="secondary" onClick={() => canvasInstance?.fit()}>
                <BiFullscreen></BiFullscreen>
            </FormIconButton>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <EditorToolButton tool={(label) => new BoundingBoxTool(label)} toolName="bounding_box" title="Draw a box">
                <BiSquare></BiSquare>
            </EditorToolButton>
            <EditorToolButton tool={(label) => new PolygonTool(label)} toolName="polygon" title="Draw a polygon">
                <BiShapePolygon></BiShapePolygon>
            </EditorToolButton>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <EditorIaButton colorSchema="secondary" >
                <BsStars></BsStars>
            </EditorIaButton>
        </div>
    );
}

export default EditorToolBar;