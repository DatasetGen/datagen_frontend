import React, { useEffect } from 'react';
import EditorHeader from "./EditorHeader/EditorHeader.tsx";
import EditorSidebar from "./EditorSidebar/EditorSidebar.tsx";
import EditorZoomBar from "./EditorZoomBar.tsx";
import EditorToolBar from "./EditorToolBar/EditorToolBar.tsx";
import {useEditorCanvasStore} from "../core/core.ts";
import {DatasetImage} from "../../../../../types";

function Editor({ image }: { image?: DatasetImage }) {
    const { setCanvasInstance, canvasInstance } = useEditorCanvasStore()

    useEffect(() => {
      if(image !== undefined) {
        console.log(image)
        setCanvasInstance(image)
      }
    }, [image]);

    return (
        <div className="h-[100vh] bg-gray-200 overflow-hidden">
            <EditorHeader></EditorHeader>
            <EditorSidebar></EditorSidebar>
            <div className="mr-[300px] relative">
                <EditorZoomBar></EditorZoomBar>
                <EditorToolBar></EditorToolBar>
                {
                  image &&
                  <canvas
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    className="z-0 absolute"
                    id="principal_canvas"
                    width={window.innerWidth - 300}  // Subtract 260 for the sidebar
                    height={window.innerHeight}
                  />
                }
            </div>
        </div>
    );
}

export default Editor;
