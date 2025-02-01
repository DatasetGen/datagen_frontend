import * as fabric from "fabric";
import {BoundingBoxAnnotation, PolygonAnnotation, useEditorCanvasStore} from "./core.ts";
import {DatasetLabel} from "../../../../../types";
import {controlsUtils, Point, Polygon, Rect} from "fabric";
import {addAlpha} from "../../../../../utils.ts";
import {v4 as uuidv4} from 'uuid';

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
        const canvasWidth = window.innerWidth - 300;
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

    public createPolygonAnnotation(annotation: PolygonAnnotation){
        const label = useEditorCanvasStore.getState().currentLabel;
        const polygon = new Polygon(annotation.points.map(x => new Point(x[0], x[1])), {
            fill: addAlpha(label?.color ?? "", 0.3),
            strokeWidth: 2,
            stroke: addAlpha(label?.color ?? "", 1),
            strokeUniform: true,
            noScaleCache: true,
            cornerStyle: 'circle',
            cornerColor: addAlpha(label?.color ?? "", 1),
            transparentCorners: false,
            cornerStrokeColor: addAlpha(label?.color ?? "", 1),
            borderColor: addAlpha(label?.color ?? "", 1),
            hasBorders:false,
            objectCaching: false,
        });
        polygon.controls = controlsUtils.createPolyControls(polygon);
        polygon.on("mouseover", () => {
            polygon.set({
                fill: addAlpha(label?.color ?? "", 0.4),
            });
            this?.renderAll();
        });

        polygon.on("mouseout", () => {
            polygon.set({
                fill: addAlpha(label?.color ?? "", 0.3),
            });
            this?.renderAll();
        });

        polygon.on("mousewheel", () => {
            polygon.set({
                strokeWidth: 3/(this.getZoom()/0.8)
            })
        })

        useEditorCanvasStore.getState().addAnnotation({
            id: uuidv4(),
            type: "polygon",
            label: label?.id ?? -1,
            object: polygon
        })

        this.add(polygon)
    }

    public createBoundingBoxAnnotation(annotation: BoundingBoxAnnotation){
        const label = useEditorCanvasStore.getState().currentLabel;
        const rect = new Rect({
            left: annotation.point[0],
            top: annotation.point[1],
            stroke: addAlpha(label?.color ?? "", 1.3),
            strokeWidth: 2,
            fill: addAlpha(label?.color ?? "", 0.3),
            width: annotation.width,
            height: annotation.height,
            strokeUniform: true,
            noScaleCache: true,
            cornerStyle: 'circle',
            cornerColor: addAlpha(label?.color ?? "", 1),
            transparentCorners: false,
            cornerStrokeColor: addAlpha(label?.color ?? "", 1),
            borderColor: addAlpha(label?.color ?? "", 1),
        });
        rect.on("mouseover", () => {
            rect.set({
                fill: addAlpha(label?.color ?? "", 0.4),
            });
            this?.renderAll();
        });

        rect.on("mouseout", () => {
            rect.set({
                fill: addAlpha(label?.color ?? "", 0.3),
            });
            this?.renderAll();
        });

        this.add(rect)
        useEditorCanvasStore.getState().addAnnotation({
            id: uuidv4(),
            type: "bounding_box",
            label: label?.id ?? -1,
            object: rect
        })
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