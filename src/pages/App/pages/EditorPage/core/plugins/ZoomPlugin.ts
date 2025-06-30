import * as fabric from "fabric";
import {EditorCanvas, EditorPlugin} from "../EditorCanvas.ts";
import {TPointerEventInfo} from "fabric";

export class ZoomPlugin implements EditorPlugin{
    public name: string = "zoom"
    public zoom: (opt: TPointerEventInfo<WheelEvent>) => void = () => {};

    plug(canvas: EditorCanvas){
        this.zoom = (opt) => {
            if(!canvas.canZoom) return;
            const delta = opt.e.deltaY;
            let zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            canvas.zoomToPoint(
                new fabric.Point(opt.e.offsetX, opt.e.offsetY),
                zoom
            );
            opt.e.preventDefault();
            opt.e.stopPropagation();
        }
        canvas.on('mouse:wheel', this.zoom);
    }

    unplug(canvas: EditorCanvas){
        canvas.off("mouse:wheel", this.zoom)
    }
}
