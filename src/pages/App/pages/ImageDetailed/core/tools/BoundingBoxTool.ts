import {EditorCanvas, EditorTool} from "../EditorCanvas.ts";
import {Line, Point, Rect, TPointerEventInfo} from "fabric";
export class BoundingBoxTool implements EditorTool {
    public name = "bounding_box"
    private stack: any[] = []
    private points : Point[] = []
    private onMouseDown: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};
    private onMouseMove: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};

    onSelect(canvas: EditorCanvas, prevTool?: EditorTool){
        this.points = []
        this.onMouseDown = () => {}

        this.stack.push(canvas._canEditElements)
        canvas.canEditElements = false
        this.stack.push(canvas.canZoom)
        canvas.canZoom = true;
        this.stack.push(canvas.canPan)
        canvas.canPan = true;
        console.log(this.points)
        const verticalLine = new Line([-50000, 0, 50000, 0], {
            stroke: 'red',
            strokeWidth: 2,
            selectable: false,
            evented: false
        });

        const horizontalLine = new Line([0, -50000, 0, 50000], {
            stroke: 'red',
            strokeWidth: 2,

        });
        const previewRect = new Rect({
            stroke: "red",
            strokeWidth: 1,
            fill: 'rgba(255, 0, 0, 0.1)',
            strokeUniform: true,
            cornerStrokeColor: 'red',
            borderColor: "gray",
            selectable: false,
            evented: false,
            visible: false
        });
        canvas.add(previewRect)
        canvas.add(verticalLine, horizontalLine);

        this.onMouseMove = (opt) => {
            const { x, y } = opt.scenePoint;

            verticalLine.set({ x1: x, x2: x, y1: -50000, y2: 50000 });
            horizontalLine.set({ y1: y, y2: y, x1: -50000, x2: 50000 });

            if(this.points.length == 1){
                previewRect.set({
                    top: this.points[0].y,
                    left: this.points[0].x,
                    width: x-this.points[0].x,
                    height: y-this.points[0].y,
                    visible: true
                })
            }

            canvas.renderAll();
        };


        this.onMouseDown = (opt) => {
            this.points.push(new Point(opt.scenePoint.x, opt.scenePoint.y))
            console.log(this.points)
            if(this.points.length == 2){
                canvas.remove(previewRect)
                canvas.remove(horizontalLine)
                canvas.remove(verticalLine)
                const rect = new Rect({
                    left: this.points[0].x,
                    top: this.points[0].y,
                    stroke: "red",
                    strokeWidth: 1,
                    fill: 'rgba(255, 0, 0, 0.1)',
                    width: this.points[1].x - this.points[0].x,
                    height: this.points[1].y - this.points[0].y ,
                    strokeUniform: true,
                    noScaleCache: true,
                    cornerStyle: 'circle',
                    cornerColor: "red",
                    transparentCorners: false,
                    cornerStrokeColor: 'red',
                    borderColor: "red",
                });
                rect.on("mouseover", () => {
                    rect.set({
                        fill: 'rgba(255, 0, 0, 0.4)',
                    });
                    canvas?.renderAll();
                });

                rect.on("mouseout", () => {
                    rect.set({
                        fill: 'rgba(255, 0, 0, 0.1)',
                    });
                    canvas?.renderAll();
                });

                canvas.selectTool("cursor")
                canvas.add(rect)
                }
            }
        canvas.on("mouse:down", this.onMouseDown)
        canvas.on("mouse:move", this.onMouseMove)

    };

    onDeselect(canvas: EditorCanvas, nextTool?: EditorTool){
        console.log("hello here im ai")
        canvas.canPan = this.stack.pop();
        canvas.canZoom = this.stack.pop();
        canvas._canEditElements = this.stack.pop()
        this.points = []
        canvas.off("mouse:down", this.onMouseDown)
        canvas.off("mouse:move", this.onMouseMove)
    };
}