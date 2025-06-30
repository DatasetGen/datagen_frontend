import {EditorCanvas, EditorPlugin } from "../EditorCanvas.ts";
import {TPointerEventInfo} from "fabric";


export class PanningPlugin implements EditorPlugin{
    public name : string = "Panning Plugin"
    private mouseDown: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};
    private mouseMove: (opt: TPointerEventInfo<MouseEvent>) => void = () => {};
    private mouseUp: () => void = () => {};

    constructor() {
    }

    plug(canvas: EditorCanvas){
        this.mouseDown= (opt: TPointerEventInfo<MouseEvent>) => {
            if(!canvas.canPan  && opt.e.button === 0) return;
            if(opt.e.button === 2) return;
            const evt = opt.e;
            console.log(opt.e.button)
            if (opt.target) return;
            canvas.isDragging = true;
            canvas.selection = false;
            canvas.lastPosX = evt.clientX;
            canvas.lastPosY = evt.clientY;
        }
        this.mouseMove = (opt: TPointerEventInfo<MouseEvent>) => {
                if (!canvas.isDragging) return; // <-- Asegúrate de que canPan sea true
                const e = opt.e;
                const vpt = canvas.viewportTransform!;
                vpt[4] += e.clientX - canvas.lastPosX;
                vpt[5] += e.clientY - canvas.lastPosY;
                canvas.requestRenderAll();
                canvas.lastPosX = e.clientX;
                canvas.lastPosY = e.clientY;
                canvas.getObjects().forEach(object => {
                    object.setCoords()
                })
        }
        this.mouseUp = () => {
            canvas.setViewportTransform(canvas.viewportTransform);
            canvas.isDragging = false;
            canvas.selection = true;
        }
        canvas.on('mouse:move', this.mouseMove);
        canvas.on('mouse:down', this.mouseDown);
        canvas.on('mouse:up', this.mouseUp);
    }

    unplug(canvas: EditorCanvas){
        canvas.off('mouse:down', this.mouseDown);
        canvas.off("mouse:move", this.mouseMove);
        canvas.off("mouse:up", this.mouseUp);
    }
}
