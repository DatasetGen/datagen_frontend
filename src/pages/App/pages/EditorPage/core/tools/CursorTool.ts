import {EditorCanvas, EditorTool} from "../EditorCanvas.ts";


export class CursorTool implements EditorTool {
    public name : string = "cursor"
    private stack: any[] = []


    onSelect(canvas: EditorCanvas, prevTool?: EditorTool){
        this.stack.push(canvas._canEditElements)
        canvas.canEditElements = true
        this.stack.push(canvas.canZoom)
        canvas.canZoom = true;
        this.stack.push(canvas.canPan)
        canvas.canPan = false;
    };

    onDeselect(canvas: EditorCanvas, nextTool?: EditorTool){
        canvas.canPan = this.stack.pop();
        canvas.canZoom = this.stack.pop();
        canvas._canEditElements = false
    };

}