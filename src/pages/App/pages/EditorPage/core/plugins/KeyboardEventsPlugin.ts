import {EditorCanvas, EditorPlugin} from "../EditorCanvas.ts";
import { useEditorCanvasStore } from '../core.ts';

export class KeyboardEventsPlugin implements EditorPlugin{
    public name: string = "keyboardEvents"
    public onKeyboardPress: (opt: KeyboardEvent) => void = () => {};

    plug(canvas: EditorCanvas){
        this.onKeyboardPress= (opt) => {
            if(opt.key == "Backspace"){
                const {selectedAnnotation, deleteAnnotation} = useEditorCanvasStore.getState()
                if(selectedAnnotation) deleteAnnotation(selectedAnnotation?.id)
            }
            if(opt.key == "h"){
                const {selectedAnnotation, annotations, showAnnotation, hideAnnotation} = useEditorCanvasStore.getState()
                annotations.filter(x => x.id != selectedAnnotation?.id).forEach(x => hideAnnotation(x.id))
            }
            if(opt.key == "s"){
                const {selectedAnnotation, annotations, showAnnotation, hideAnnotation} = useEditorCanvasStore.getState()
                annotations.filter(x => x.id != selectedAnnotation?.id).forEach(x => showAnnotation(x.id))
            }
        }
        document.addEventListener("keydown", this.onKeyboardPress)
    }

    unplug(canvas: EditorCanvas){
        document.removeEventListener('keydown', this.onKeyboardPress)
    }
}
