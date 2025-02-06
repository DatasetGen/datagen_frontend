import React, { useEffect, useRef } from 'react';
import EditorHeader from "./EditorHeader.tsx";
import EditorSidebar from "./EditorSidebar/EditorSidebar.tsx";
import EditorZoomBar from "./EditorZoomBar.tsx";
import EditorToolBar from "./EditorToolBar/EditorToolBar.tsx";
import {useEditorCanvasStore} from "../core/core.ts";
import {Annotation, InputAnnotation} from "../core/annotators/types.ts";

function Editor({ image, annotations }: { image: string, annotations: InputAnnotation<any>[] }) {
    const {setCanvasInstance} = useEditorCanvasStore()

    useEffect(() => {
        setCanvasInstance(image, annotations)
    }, []);


    return (
        <div className="h-[100vh] bg-gray-200 overflow-hidden">
            <EditorHeader></EditorHeader>
            <EditorSidebar></EditorSidebar>
            <div className="mr-[300px] relative">
                <EditorZoomBar></EditorZoomBar>
                <EditorToolBar></EditorToolBar>
                <canvas
                    style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
                    className="z-0 absolute"
                    id="principal_canvas"
                    width={window.innerWidth - 300}  // Subtract 260 for the sidebar
                    height={window.innerHeight}
                />
            </div>
        </div>
    )
    ;
}

export default Editor;
