import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {BiZoomIn, BiZoomOut} from "react-icons/bi";

function EditorZoomBar() {
    return (
        <div>
            <div id="tool-menu"
                 className="z-20 flex flex-col gap-1 absolute right-0 bottom-0 transform  p-1 m-2 bg-white rounded-xl">
                <FormIconButton size="md" colorSchema="secondary">
                    <BiZoomIn></BiZoomIn>
                </FormIconButton>
                <FormIconButton size="md" colorSchema="secondary">
                    <BiZoomOut></BiZoomOut>
                </FormIconButton>
            </div>
        </div>
    );
}

export default EditorZoomBar;