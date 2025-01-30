import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {BiZoomIn, BiZoomOut} from "react-icons/bi";
import {useEditorCanvasStore} from "../core/core.ts";
import {Point} from "fabric";

function EditorZoomBar() {

    const {canvasInstance, currentTool} = useEditorCanvasStore()

    return (
        <div>
            <div id="tool-menu"
                 className="z-20 flex flex-col gap-1 absolute right-0 bottom-0 transform  p-1 m-2 bg-white rounded-xl">
                <FormIconButton size="md" colorSchema="secondary" onClick={() => canvasInstance?.zoomToPoint(
                    new Point(canvasInstance.width/2, canvasInstance?.height/2), canvasInstance?.getZoom()+0.1)}>
                    <BiZoomIn></BiZoomIn>
                </FormIconButton>
                <FormIconButton size="md" colorSchema="secondary" onClick={() => canvasInstance?.zoomToPoint(
                    new Point(canvasInstance.width/2, canvasInstance?.height/2), canvasInstance?.getZoom()-0.1)}>
                    <BiZoomOut></BiZoomOut>
                </FormIconButton>
            </div>
        </div>
    );
}

export default EditorZoomBar;