import {EditorCanvas, EditorTool} from "../EditorCanvas.ts";
import {Line, Point, Rect, TPointerEventInfo, Object} from "fabric";

export class BoundingBoxTool implements EditorTool {
    public name = "bounding_box"
    private stack: any[] = []
    private points : Point[] = []
    private onMouseDown: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};
    private onMouseMove: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};
    private onKeyDown: (opt: KeyboardEvent) => void = () => {};
    private createdElements : Object[] = []


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
        this.onKeyDown = (e) => {
            if (e.keyCode == 27) {
                canvas.deselectTool()
            }
        }
        window.addEventListener("keydown", this.onKeyDown)

        const verticalLine = new Line([-50000, 0, 50000, 0], {
            stroke: 'red',
            strokeWidth: 2,
            selectable: false,
            evented: false,
            zIndex: 9999,
            strokeUniform: true,
            absolutePositioned: true,
        });

        const horizontalLine = new Line([0, -50000, 0, 50000], {
            stroke: 'red',
            strokeWidth: 2,
            zIndex: 9999,
            selectable: false,
            evented: false,
            absolutePositioned: true,
            strokeUniform: true
        });
        const previewRect = new Rect({
            stroke: "rgba(0, 0, 0, 0.8)",
            strokeWidth: 1,
            fill: 'rgba(0, 0, 0, 0.3)',
            strokeUniform: true,
            cornerStrokeColor: 'gray',
            borderColor: "gray",
            selectable: false,
            evented: false,
            zIndex: 9999,
            visible: false,
            absolutePositioned: true,
        });

        this.createdElements.push(verticalLine);
        this.createdElements.push(horizontalLine);
        this.createdElements.push(previewRect);
        canvas.add(previewRect, verticalLine, horizontalLine)

        this.onMouseMove = (opt) => {
            verticalLine.setCoords();
            horizontalLine.setCoords();
            previewRect.setCoords();  // Ensure proper bounding updates

            const { x, y } = opt.scenePoint;
            verticalLine.set({ x1: x, x2: x, y1: -50000, y2: 50000 });
            horizontalLine.set({ y1: y, y2: y, x1: -50000, x2: 50000 });

            if (this.points.length === 1) {
                const x1 = Math.min(this.points[0].x, x);
                const y1 = Math.min(this.points[0].y, y);
                const x2 = Math.max(this.points[0].x, x);
                const y2 = Math.max(this.points[0].y, y);

                previewRect.set({
                    top: y1,
                    left: x1,
                    width: x2 - x1,
                    height: y2 - y1,
                    visible: true
                });
            }

            canvas.renderAll();
        };

        //canvas.on('zoom', updateLines);
        //canvas.on('viewport:modified', updateLines);


        this.onMouseDown = (opt) => {
            this.points.push(new Point(opt.scenePoint.x, opt.scenePoint.y))
            console.log(this.points)
            if(this.points.length == 2){
                const x1 = this.points[this.points[0].x <this.points[1].x ? 0 : 1].x
                const x2 = this.points[this.points[0].x <this.points[1].x ? 1 : 0].x
                const y1 = this.points[this.points[0].y <this.points[1].y ? 0 : 1].y
                const y2 = this.points[this.points[0].y <this.points[1].y ? 1 : 0].y

                const rect = new Rect({
                    left: x1,
                    top: y1,
                    stroke: "red",
                    strokeWidth: 1,
                    fill: 'rgba(255, 0, 0, 0.1)',
                    width: x2 - x1,
                    height: y2 - y1,
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
        canvas.defaultCursor = this.stack.pop()
        canvas.remove(...this.createdElements);
        canvas.off("mouse:down", this.onMouseDown)
        canvas.off("mouse:move", this.onMouseMove)
        window.removeEventListener("keydown", this.onKeyDown)
        this.points = []
        canvas.defaultCursor="default"
    };
}