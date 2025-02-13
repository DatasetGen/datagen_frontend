import {EditorCanvas, EditorTool} from "../EditorCanvas.ts";


export class MoveTool implements EditorTool {
    public name = "move"
    private stack: any[] = []

    onSelect(canvas: EditorCanvas, prevTool?: EditorTool){
        this.stack.push(canvas.defaultCursor)
        canvas.defaultCursor="move"
        this.stack.push(canvas._canEditElements)
        canvas.canEditElements = false
        this.stack.push(canvas.canZoom)
        canvas.canZoom = true;
        this.stack.push(canvas.canPan)
        canvas.canPan = true;
    };

    onDeselect(canvas: EditorCanvas, nextTool?: EditorTool){
        canvas.canPan = this.stack.pop();
        canvas.canZoom = this.stack.pop();
        canvas._canEditElements = this.stack.pop()
        canvas.defaultCursor=this.stack.pop()
    };
}