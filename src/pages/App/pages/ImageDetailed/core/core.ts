import {create} from "zustand/index";
import {EditorCanvas} from "./EditorCanvas.ts";
import {PanningPlugin} from "./plugins/PanningPlugin.ts";
import {ZoomPlugin} from "./plugins/ZoomPlugin.ts";
import {CursorTool} from "./tools/CursorTool.ts";
import {MoveTool} from "./tools/MoveTool.ts";
import {BoundingBoxTool} from "./tools/BoundingBoxTool.ts";
import {PolygonTool} from "./tools/PolygonTool.ts";


interface EditorCanvasStore {
    canvasInstance: EditorCanvas | null;
    setCanvasInstance: (image: string) => void;
    currentTool: string | undefined
}

// Create the Zustand store
export const useEditorCanvasStore = create<EditorCanvasStore>((set) => ({
    canvasInstance: null,
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
            return { canvasInstance: editor  };
        });
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

