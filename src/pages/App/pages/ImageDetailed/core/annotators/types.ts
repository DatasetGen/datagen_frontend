import {Object} from "fabric";
import {DatasetLabel} from "../../../../../../types";

export interface Annotator<Type>{
    loadAnnotation(annotation: InputAnnotation<Type>): Annotation;
    annotationToJson(annotation: Annotation): OutputAnnotation<Type>;
}

export interface Annotation{
    id: string;
    type: string;
    label: number;
    object: Object;
}

export interface InputAnnotation<T>{
    id: string;
    type: string;
    label: DatasetLabel;
    data: T;
}
export interface OutputAnnotation<T>{
    id: string;
    type: string;
    label: number;
    data: T;
}


