import * as fabric from "fabric";
import { useEditorCanvasStore} from "./core.ts";
import { BoundingBoxAnnotator} from "./annotators/BoundingBoxAnnotator.tsx";
import { PolygonAnnotator} from "./annotators/PolygonAnnotator.tsx";
import { Annotation, Annotator, InputAnnotation } from './annotators/types.ts';
import {CursorTool} from "./tools/CursorTool.ts";
import { DatasetLabel } from '../../../../../types';

export class EditorCanvas extends fabric.Canvas {
    public isDragging = false;
    public lastPosX = 0;
    public lastPosY = 0;
    public canPan = true;
    public canZoom = true;
    public _canEditElements = true;
    public plugins: EditorPlugin[] = []
    public prevTool: EditorTool | undefined = undefined
    public currentTool: EditorTool | undefined = undefined

    public async initialize(image: string) {
        this.fireRightClick= true
        this.fireMiddleClick= true
        this.stopContextMenu = true
        const canvasWidth = window.innerWidth - 300;
        const canvasHeight = window.innerHeight;
        this.preserveObjectStacking = true;
        this.enableRetinaScaling=true;
        this.uniformScaling=false
        const img = await fabric.Image.fromURL(image);
        const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
        img.scale(scale)
        this.backgroundImage = img
        this.zoomToPoint(
            new fabric.Point(this.width / 2, this.height / 2),
            0.8
        );
        this.renderAll()
    }

    public denormalizeCoords(x : number, y: number) : [number, number]{
        if(!this.backgroundImage) return [0, 0]
        const width = this.backgroundImage?.width * this.backgroundImage?.scaleX;
        const height = this.backgroundImage?.height * this.backgroundImage?.scaleY;
        return [x*width, y*height]
    }

    public normalizeCoords(x : number, y: number) : [number, number]{
        if(!this.backgroundImage) return [0, 0]
        const width = this.backgroundImage?.width * this.backgroundImage?.scaleX;
        const height = this.backgroundImage?.height * this.backgroundImage?.scaleY;
        return [x/width, y/height]
    }

    public addPlugin(plugin : EditorPlugin){
        this.plugins.push(plugin);
        plugin.plug(this)
    }

    public selectTool(nextTool : EditorTool){
        this.prevTool = this.currentTool;
        this.plugins.forEach(plugin => plugin.unplug(this))
        this.currentTool?.onDeselect(this, nextTool)
        nextTool?.onSelect(this, this.currentTool)
        this.currentTool = nextTool;
        this.plugins.forEach(plugin => plugin.plug(this))
        useEditorCanvasStore.setState({
            currentTool: nextTool.name
        })
    }
    public deselectTool(){
        this.selectTool(new CursorTool())
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

    public centerObject(object: fabric.Object){
        const objCenter = object.getCenterPoint();
        this.zoomToPoint(new fabric.Point(objCenter.x, objCenter.y), 1.5);
        this.viewportTransform[4] = this.width / 2 - objCenter.x * this.getZoom();
        this.viewportTransform[5] = this.height / 2 - objCenter.y * this.getZoom();
        this.requestRenderAll();
        const event = new WheelEvent("wheel", { deltaY: 0 });
        this.upperCanvasEl.dispatchEvent(event);
        object.setCoords();
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

    public addAnnotation<T>(annotation: InputAnnotation<T>){
        const annotators = this.getAnnotators();
        const annotator =annotators[annotation.type] as Annotator<T>
        const importedAnnotation = annotator.loadAnnotation(annotation)
        importedAnnotation.object.on("selected", () => {
            useEditorCanvasStore.getState().selectAnnotation(importedAnnotation)
        })
        useEditorCanvasStore.getState().addAnnotation(importedAnnotation)
    }

    private getAnnotators() {
        const annotators: Record<string, Annotator<any>> = {
            "bounding_box": new BoundingBoxAnnotator(this),
            "polygon": new PolygonAnnotator(this)
        }
        return annotators;
    }


    public exportAnnotations(annotations: Annotation[]) {
        const annotators= this.getAnnotators();
        return annotations.map(x => {
            const annotator = annotators[x.type]
            return annotator.annotationToJson(x)
        })
    }


    public changeAnnotationLabel<T>(annotation: Annotation, newLabel : DatasetLabel){
        const outputAnnotation = this.exportAnnotations([annotation,])[0];
        const inputAnnotation : InputAnnotation<T> = {
            ...outputAnnotation,
            label: newLabel
        }
        return this.getAnnotators()[inputAnnotation.type].loadAnnotation(inputAnnotation)
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