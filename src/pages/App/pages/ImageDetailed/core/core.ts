import {create} from "zustand/index";
import {EditorCanvas} from "./EditorCanvas.ts";
import {PanningPlugin} from "./plugins/PanningPlugin.ts";
import {ZoomPlugin} from "./plugins/ZoomPlugin.ts";
import {CursorTool} from "./tools/CursorTool.ts";
import {MoveTool} from "./tools/MoveTool.ts";
import {BoundingBoxTool} from "./tools/BoundingBoxTool.ts";
import {PolygonTool} from "./tools/PolygonTool.ts";
import {Object} from "fabric";
import {DatasetLabel} from "../../../../../types";

export interface Annotation{
    id: string;
    type: string;
    label: number;
    object: Object;
}

export interface BoundingBoxAnnotation{
    point : number[],
    width: number,
    height: number
}

export interface PolygonAnnotation{
    points: number[][]
}


interface EditorCanvasStore {
    annotations: Annotation[]
    addAnnotation(annotation: Annotation): void;
    canvasInstance: EditorCanvas | null;
    setCanvasInstance: (image: string) => void;
    setLabel: (label: DatasetLabel) => void;
    currentTool: string | undefined,
    currentLabel: DatasetLabel | undefined,
    deleteAnnotation: (annotation: string) => void;
    changeAnnotationLabel: (label: DatasetLabel, annotation: string) => void;
}

// Create the Zustand store
export const useEditorCanvasStore = create<EditorCanvasStore>((set) => ({
    annotations: [],
    addAnnotation: (annotation: Annotation) => {
        set((state)=>({
            annotations: [...state.annotations, annotation]
        }))
    },
    canvasInstance: null,
    currentLabel: undefined,
    setLabel: (label : DatasetLabel) => {
        set({
            currentLabel: label
        })
    },
    setCanvasInstance: (image) => {
        set((state) => {

            if(state.canvasInstance) state.canvasInstance.destroy()
            const editor = new EditorCanvas("principal_canvas")
            editor.addPlugin(new PanningPlugin())
            editor.addPlugin(new ZoomPlugin())
            editor.initialize(image);
            editor.addTool(new CursorTool())
            editor.addTool(new MoveTool())
            editor.addTool(new BoundingBoxTool())
            editor.addTool(new PolygonTool())
            editor.selectTool("cursor")
            return { canvasInstance: editor, currentLabel: undefined, annotations: [] };
        });
    },
    deleteAnnotation: (id: string) => {
        set((state)=>{
            const annotation = state.annotations.find((annotation) => annotation.id === id);
            if(annotation) state.canvasInstance?.remove(annotation.object)
            return {
                annotations: state.annotations.filter(annotation => annotation.id !== id)
            }
        })
    },
    changeAnnotationLabel: (label: DatasetLabel, annotation: string) => {

    },
    currentTool: undefined
}));

export const useCanvasInstance = () => useEditorCanvasStore(state => state.canvasInstance)

/*
MoveTool.tsconst rect = new fabric.Rect({
                    left: 0,
                    top: 0,
                    stroke: "red",
                    strokeWidth: 1,
                    fill: 'rgba(255, 0, 0, 0.1)',
                    width: 300,
                    height: 300,
                    strokeUniform: true,
                    noScaleCache: true,
                    cornerStyle: 'circle',
                    cornerColor: "red",
                    transparentCorners: false,
                    cornerStrokeColor: 'red',
                    borderColor: "red"
                });
                if(editor.canvasInstance) {
                    rect.on("mouseover", () => {
                        rect.set({
                            fill: 'rgba(255, 0, 0, 0.4)',
                        });
                        editor?.canvasInstance?.renderAll();
                    });

                    rect.on("mouseout", () => {
                        rect.set({
                            fill: 'rgba(255, 0, 0, 0.1)',
                        });
                        editor?.canvasInstance?.renderAll();
                    });

                    editor.canvasInstance.add(rect)
                }
 */

