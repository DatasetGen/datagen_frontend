import React, { useEffect, useRef } from 'react';
import { DatasetImage } from "../../../../../types";
import EditorHeader from "./EditorHeader.tsx";
import EditorSidebar from "./EditorSidebar.tsx";
import EditorZoomBar from "./EditorZoomBar.tsx";
import EditorToolBar from "./EditorToolBar.tsx";
import {useEditorCanvasStore} from "../core/core.ts";




function Editor({ image }: { image: string }) {
    const {setCanvasInstance} = useEditorCanvasStore()

    useEffect(() => {
        setCanvasInstance(image)
    }, []);


    return (
        <div className="h-[100vh] bg-gray-200 overflow-hidden">
            <EditorHeader></EditorHeader>
            <EditorSidebar></EditorSidebar>
            <div className="mr-[260px] relative">
                <EditorZoomBar></EditorZoomBar>
                <EditorToolBar></EditorToolBar>
                <canvas
                    style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
                    className="z-0 absolute"
                    id="principal_canvas"
                    width={window.innerWidth - 260}  // Subtract 260 for the sidebar
                    height={window.innerHeight}
                />
            </div>
        </div>
    )
    ;
}

export default Editor;
