import {Annotation, Annotator, InputAnnotation, OutputAnnotation} from "./types.ts";
import { Rect} from "fabric";
import {addAlpha} from "../../../../../../utils.ts";
import {v4 as uuidv4} from "uuid";
import {EditorCanvas} from "../EditorCanvas.ts";

export interface BoundingBoxAnnotation {
    point: number[],
    width: number,
    height: number
}

export class BoundingBoxAnnotator implements Annotator<BoundingBoxAnnotation> {
    constructor(private readonly  canvas : EditorCanvas) {
    }

    loadAnnotation(annotation: InputAnnotation<BoundingBoxAnnotation>): Annotation {
        const point = this.canvas.denormalizeCoords(annotation.data.point[0], annotation.data.point[1])
        const size = this.canvas.denormalizeCoords(annotation.data.width, annotation.data.height)
        const label = annotation.label;

        const rect = new Rect({
            left: point[0],
            top: point[1],
            stroke: addAlpha(label?.color ?? "", 1.3),
            strokeWidth: 3/(this.canvas.getZoom()/0.8),
            fill: addAlpha(label?.color ?? "", 0.3),
            width: size[0],
            height: size[1],
            strokeUniform: true,
            noScaleCache: true,
            cornerStyle: 'circle',
            cornerColor: addAlpha(label?.color ?? "", 1),
            transparentCorners: false,
            cornerStrokeColor: addAlpha(label?.color ?? "", 1),
            borderColor: addAlpha(label?.color ?? "", 1),
            objectCaching: false,
        });
        rect.on("mouseover", () => {
            rect.set({
                fill: addAlpha(label?.color ?? "", 0.4),
            });
            this?.canvas.renderAll();
        });

        rect.on("mouseout", () => {
            rect.set({
                fill: addAlpha(label?.color ?? "", 0.3),
            });
            this?.canvas.renderAll();
        });

        const event = () => {
            rect.set({
                strokeWidth: 3/(this.canvas.getZoom()/0.8)
            })
        }
        this.canvas.on("mouse:wheel", event)
        rect.on("removed", () => {
            this.canvas.off("mouse:wheel", event)
        })
        this.canvas.add(rect)

        return {
            id: uuidv4(),
            type: "bounding_box",
            label: label?.id ?? -1,
            object: rect
        }
    }
    annotationToJson(annotation: Annotation): OutputAnnotation<BoundingBoxAnnotation> {
        const point = this.canvas.normalizeCoords(annotation.object.left, annotation.object.top)
        const size = this.canvas.normalizeCoords(annotation.object.width*annotation.object.scaleX, annotation.object.height*annotation.object.scaleY)
        return {
            type: "bounding_box",
            id: annotation.id,
            label: annotation.label,
            data: {
                point: point,
                width: size[0],
                height: size[1]
            }
        }
    }
}