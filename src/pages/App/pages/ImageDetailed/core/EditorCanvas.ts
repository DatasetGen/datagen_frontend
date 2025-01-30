import * as fabric from "fabric";
import {useEditorCanvasStore} from "./core.ts";

export class EditorCanvas extends fabric.Canvas {
    public isDragging = false;
    public lastPosX = 0;
    public lastPosY = 0;
    public canPan = true;
    public canZoom = true;
    public _canEditElements = true;
    public tools: EditorTool[] = []
    public plugins: EditorPlugin[] = []
    public prevTool: EditorTool | undefined = undefined
    public currentTool: EditorTool | undefined = undefined

    public initialize(image: string) {
        const canvasWidth = window.innerWidth - 260;
        const canvasHeight = window.innerHeight;
        this.preserveObjectStacking = true;
        this.enableRetinaScaling=true;
        this.uniformScaling=false

        fabric.Image.fromURL(image).then((img) => {
            const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
            img.scale(scale)
            this.backgroundImage = img
            this.zoomToPoint(
                new fabric.Point(this.width / 2, this.height / 2),
                0.8
            );
            this.renderAll()
        })
    }

    public addPlugin(plugin : EditorPlugin){
        this.plugins.push(plugin);
        plugin.plug(this)
    }

    public addTool(tool : EditorTool){
        this.tools.push(tool);
    }

    public selectTool(name : string){
        this.prevTool = this.currentTool;
        const nextTool = this.tools.find(x => x.name === name);
        this.plugins.forEach(plugin => plugin.unplug(this))
        this.currentTool?.onDeselect(this, nextTool)
        nextTool?.onSelect(this, this.currentTool)
        this.currentTool = nextTool;
        this.plugins.forEach(plugin => plugin.plug(this))
        useEditorCanvasStore.setState({
            currentTool: name
        })
    }
    public deselectTool(){
        this.selectTool("cursor")
    }

    public disableInteraction(){
        // Disable all objects' interaction
        this.forEachObject((obj) => {
            obj.set({
                selectable: false,
                evented: false, // Disables mouse events on objects (like clicking, dragging)
                hasControls: false, // Disables the object's resizing and rotation controls
            });
        });

        // Disable selection and movement of objects
        this.selection = false;
    }


    set canEditElements(enabled: boolean) {
        this._canEditElements = enabled;

        this.forEachObject((obj) => {
            obj.set({
                selectable: enabled,
                evented: enabled,
                hasControls: enabled,
            });
        });

        this.selection = enabled;
        this.renderAll();
    }

    get canEditElements() {
        return this._canEditElements;
    }

    fit() {
        this.setViewportTransform([1, 0, 0, 1, 0, 0]); // Reset transform matrix
        this.zoomToPoint(new fabric.Point(this.width / 2, this.height / 2), 0.8); // Reset zoom to 1x
        this.renderAll();
    }

    requestFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                this.resizeCanvas();
            }).catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    private resizeCanvas() {
        this.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        this.renderAll();
    }


}

export interface EditorPlugin{
    name: string;
    plug: (canvas : EditorCanvas) => void
    unplug: (canvas : EditorCanvas) => void
}


export interface EditorTool{
    name: string;
    onSelect: (canvas: EditorCanvas, prevTool?: EditorTool) => void
    onDeselect: (canvas : EditorCanvas, nextTool ?: EditorTool) => void
}