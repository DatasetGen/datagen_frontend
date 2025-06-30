import {create} from "zustand/index";
import {EditorCanvas} from "./EditorCanvas.ts";
import {PanningPlugin} from "./plugins/PanningPlugin.ts";
import {ZoomPlugin} from "./plugins/ZoomPlugin.ts";
import {CursorTool} from "./tools/CursorTool.ts";
import {DatasetImage, DatasetLabel} from "../../../../../types";
import { Annotation } from './annotators/types.ts';
import { FabricObject, Path } from 'fabric';
import { KeyboardEventsPlugin } from './plugins/KeyboardEventsPlugin.ts';

interface EditorCanvasStore {
    annotations: Annotation[]
    selectedAnnotation: Annotation | null,
    selectAnnotation?: (obj : Annotation) => void,
    addAnnotation(annotation: Annotation): void;
    canvasInstance: EditorCanvas | null;
    setCanvasInstance: (image: DatasetImage) => void;
    currentTool: string | undefined,
    deleteAnnotation: (annotation: string) => void;
    hideAnnotation: (annotation: string) => void;
    showAnnotation: (annotation: string) => void;
    changeAnnotationLabel: (label: DatasetLabel, annotation: Annotation) => void;
}

// Create the Zustand store
export const useEditorCanvasStore = create<EditorCanvasStore>((set) => ({
    annotations: [],
    selectedAnnotation: null,
    addAnnotation: (annotation: Annotation) => {
        set((state)=>({
            annotations: [...state.annotations, annotation]
        }))
    },
    selectAnnotation: (obj) => {
        set(() => ({
            selectedAnnotation: obj
        }))
    },
    canvasInstance: null,
    setCanvasInstance: async (image: DatasetImage) => {
        set((state)=>{
            state?.canvasInstance?.dispose()
            return ({
                annotations: []
            })
        })
        const editor = new EditorCanvas("principal_canvas")
        editor.addPlugin(new PanningPlugin())
        editor.addPlugin(new ZoomPlugin())
        editor.addPlugin(new KeyboardEventsPlugin())
        await editor.initialize(image.image);
        editor.selectTool(new CursorTool())
        set((state) => {
            image.annotations.forEach(annotation => editor.addAnnotation(annotation))
            return { canvasInstance: editor, currentLabel: undefined };
        });
    },
    hideAnnotation: (id: string) => {
        set((state)=> {
            const annotation = state.annotations.find((annotation) => annotation.id === id);
            if(!annotation) return {}
            annotation.object.visible = false
            annotation.object.hasControls = false
            annotation.object.hasBorders = false
            state.canvasInstance?.renderAll()
            return {}
        })
    },
    showAnnotation: (id: string) => {
        set((state)=> {
            const annotation = state.annotations.find((annotation) => annotation.id === id);
            if(!annotation) return {}
            annotation.object.visible = true
            annotation.object.hasControls = true
            annotation.object.hasBorders = true
            state.canvasInstance?.renderAll()
            return {}
        })
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
    changeAnnotationLabel: (label: DatasetLabel, annotation: Annotation) => {
        set((state)=> {
                state.canvasInstance?.remove(annotation.object)
                const endAnnotation = state?.canvasInstance?.changeAnnotationLabel(annotation, label)
                return {
                    annotations: state.annotations.map(x => {
                        if(x.id === annotation.id) {
                            return {
                                ...annotation,
                                label: label.id,
                                object: endAnnotation!.object
                            }
                        }
                        return x
                    })
                }
            })
    },
    currentTool: undefined
}));

export const useCanvasInstance = () => useEditorCanvasStore(state => state.canvasInstance)