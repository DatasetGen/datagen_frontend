import {Annotation, Annotator, InputAnnotation, OutputAnnotation} from "./types.ts";
import { controlsUtils, Point, Polygon} from "fabric";
import {addAlpha} from "../../../../../../utils.ts";
import {v4 as uuidv4} from "uuid";
import {EditorCanvas} from "../EditorCanvas.ts";

export interface PolygonAnnotation {
    left: number,
    top: number,
    points: number[][]
}

export class PolygonAnnotator implements Annotator<PolygonAnnotation> {
    constructor(private readonly canvas : EditorCanvas) {
    }

    loadAnnotation(annotation: InputAnnotation<PolygonAnnotation>): Annotation {

        console.log(annotation.data)
        const point = this.canvas.denormalizeCoords(annotation.data.left, annotation.data.top)
        const points = annotation.data.points.map(x => this.canvas.denormalizeCoords(x[0], x[1]))

        const label = annotation.label;
        const polygon = new Polygon(points.map(x => new Point(x[0], x[1])), {
            left: point[0],
            top: point[1],
            fill: addAlpha(label?.color ?? "", 0.3),
            strokeWidth: 3/(this.canvas.getZoom()/0.8),
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
            this?.canvas.renderAll();
        });

        polygon.on("mouseout", () => {
            polygon.set({
                fill: addAlpha(label?.color ?? "", 0.3),
            });
            this?.canvas.renderAll();
        });

        const event = () => {
            polygon.set({
                strokeWidth: 3/(this.canvas.getZoom()/0.8)
            })
        }
        this.canvas.on("mouse:wheel", event)
        polygon.on("removed", () => {
            this.canvas.off("mouse:wheel", event)
        })

        this.canvas.add(polygon)
        return {
            id: uuidv4(),
            type: "polygon",
            label: label?.id ?? -1,
            object: polygon
        }
    }

    annotationToJson(annotation: Annotation): OutputAnnotation<PolygonAnnotation>{
        const point = this.canvas.normalizeCoords(annotation.object.left, annotation.object.top)
        const polygon = annotation.object as Polygon;

        return {
            type: "polygon",
            id: annotation.id,
            label: annotation.label,
            data: {
                left: point[0],
                top: point[1],
                points: [...polygon.points.map(point => this.canvas.normalizeCoords(point.x, point.y))]
            }
        }
    }
}
