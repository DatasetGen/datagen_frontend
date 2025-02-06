import {create} from "zustand/index";
import {EditorCanvas} from "./EditorCanvas.ts";
import {PanningPlugin} from "./plugins/PanningPlugin.ts";
import {ZoomPlugin} from "./plugins/ZoomPlugin.ts";
import {CursorTool} from "./tools/CursorTool.ts";
import {DatasetLabel} from "../../../../../types";
import {Annotation, Annotator, InputAnnotation} from "./annotators/types.ts";

interface EditorCanvasStore {
    annotations: Annotation[]
    addAnnotation(annotation: Annotation): void;
    canvasInstance: EditorCanvas | null;
    setCanvasInstance: (image: string, annotations: InputAnnotation<any>[]) => void;
    currentTool: string | undefined,
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
    setCanvasInstance: async (image, annotations: InputAnnotation<any>[]) => {
        set((state)=>({
            annotations: []
        }))
        const editor = new EditorCanvas("principal_canvas")
        editor.addPlugin(new PanningPlugin())
        editor.addPlugin(new ZoomPlugin())
        await editor.initialize(image);
        editor.selectTool(new CursorTool())
        annotations.forEach(annotation => editor.addAnnotation(annotation))
        set((state) => {
            return { canvasInstance: editor, currentLabel: undefined };
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