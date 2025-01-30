import {EditorCanvas, EditorTool} from "../EditorCanvas.ts";
import {Line, Point, Rect, TPointerEventInfo, Object, Circle, Polygon, controlsUtils} from "fabric";

export class PolygonTool implements EditorTool {
    public name = "polygon"
    private stack: any[] = []
    private points : {x: number, y : number}[] = []
    private onMouseDown: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};
    private onMouseMove: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};
    private onWheel: (opt: TPointerEventInfo<WheelEvent>) => void = () => {};
    private onKeyDown: (opt: KeyboardEvent) => void = () => {};
    private createdElements : Object[] = []
    private circles : Circle[] = []
    private polygon : Polygon | null = null;


    onSelect(canvas: EditorCanvas, prevTool?: EditorTool){
        this.points = []
        this.stack.push(canvas.defaultCursor)
        canvas.defaultCursor="crosshair"
        this.stack.push(canvas._canEditElements)
        canvas.canEditElements = false
        this.stack.push(canvas.canZoom)
        canvas.canZoom = true;
        this.stack.push(canvas.canPan)
        canvas.canPan = false;

        const polygon = new Polygon([], {
            fill: "rgba(0, 0, 0, 0.3)",
            strokeWidth: 2,
            stroke: "rgba(0,0, 0,0.8)",
            selectable: false,
            evented:false,
            strokeUniform: true,
        })

        this.createdElements.push(polygon)
        canvas.add(polygon)
        this.polygon = polygon

        this.onMouseMove = (opt) => {
            console.log(this.points)
            polygon.set({ points: [...this.points, {x:opt.scenePoint.x, y:opt.scenePoint.y}]});
            polygon.setCoords()
            polygon.setDimensions()
            polygon.setBoundingBox(true)
            canvas.renderAll()
        };

        this.onMouseDown = (opt) => {
            this.points.push({x: opt.scenePoint.x, y: opt.scenePoint.y});
            const rad = 6/canvas.getZoom()
            const stroke = 3/canvas.getZoom()
            const circle = new Circle({
                radius: rad,
                fill: 'gray',
                stroke:"black",
                strokeWidth: stroke,
                left: opt.scenePoint.x - rad,
                top: opt.scenePoint.y - rad,
                selectable: false,
                evented:false,
                originalPosition: opt.scenePoint
            });
            circle.set({
                originalX: opt.scenePoint.x,
                originalY: opt.scenePoint.y,
            });

            this.circles.push(circle)
            this.createdElements.push(circle)
            this.onWheel(null)
            polygon.setCoords()
            canvas.add(circle)

        }
        this.onWheel = () => {
            this.circles.forEach(x => {
                const rad = 6/(canvas.getZoom()/0.8)
                const stroke = 3/(canvas.getZoom()/0.8)
                x.set({
                    radius: rad,
                    left: x.get("originalX") - rad,
                    top: x.get("originalY") - rad,
                    strokeWidth: stroke
                })
                x.setCoords()
            })
            this.polygon?.set({
                strokeWidth: 3/(canvas.getZoom()/0.8)
            })

        }


        canvas.on("mouse:down", this.onMouseDown)
        canvas.on("mouse:move", this.onMouseMove)
        canvas.on("mouse:wheel", this.onWheel)

        this.onKeyDown = (e) => {
            if (e.keyCode == 27) {
                canvas.deselectTool()
            }
            if(e.keyCode == 78){
                if(this.points.length > 2){
                    const polygon = new Polygon([...this.points], {
                        fill: "rgba(255, 0, 0, 0.3)",
                        strokeWidth: 2,
                        stroke: "rgba(2550, 0,0.8)",
                        strokeUniform: true,
                        noScaleCache: true,
                        cornerStyle: 'circle',
                        cornerColor: "red",
                        transparentCorners: false,
                        cornerStrokeColor: 'red',
                        borderColor: "red",
                        hasBorders:false,
                        objectCaching: false,
                    });
                    polygon.controls = controlsUtils.createPolyControls(polygon);
                polygon.on("mouseover", () => {
                    polygon.set({
                        fill: 'rgba(255, 0, 0, 0.4)',
                    });
                    canvas?.renderAll();
                });

                polygon.on("mouseout", () => {
                    polygon.set({
                        fill: 'rgba(255, 0, 0, 0.1)',
                    });
                    canvas?.renderAll();
                });

                polygon.on("mousewheel", () => {
                    polygon.set({
                        strokeWidth: 2/(canvas.getZoom()/0.8)
                    })
                })


                canvas.add(polygon)
                canvas.deselectTool()
            }
        }
        }

        window.addEventListener("keydown", this.onKeyDown)

    };

    onDeselect(canvas: EditorCanvas, nextTool?: EditorTool){
        console.log("hello here im ai")
        canvas.canPan = this.stack.pop();
        canvas.canZoom = this.stack.pop();
        canvas._canEditElements = this.stack.pop()
        canvas.defaultCursor = this.stack.pop()
        canvas.remove(...this.createdElements);
        canvas.off("mouse:down", this.onMouseDown)
        canvas.off("mouse:move", this.onMouseMove)
        canvas.off("mouse:wheel", this.onWheel)
        window.removeEventListener("keydown", this.onKeyDown)
        this.points = []
        this.circles = []
        this.polygon = null;
        canvas.defaultCursor="default"
    };
}