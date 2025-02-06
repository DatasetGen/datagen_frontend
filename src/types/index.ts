import {InputAnnotation} from "../pages/App/pages/ImageDetailed/core/annotators/types.ts";

export type User ={
    id: number,
    email: string,
    first_name: string,
    last_name:string,
    is_active: boolean,
    avatar?: string
}

export type Dataset = {
    id: number;
    num_images: number;
    num_labels: number;
    total_weight: string;
    name: string;
    description: string;
    thumbnail: DatasetImage;
    labels: DatasetLabel[];
};

export type DatasetLabel = {
    id: number;
    name: string;
    slug: string;
    color: string;
};

export type DatasetImage = {
    id: number;
    image: string;
    total_weight: string;
    extension: string;
    name: string;
    labels: DatasetLabel[];
    annotations: InputAnnotation<any>[]
};

export type Job = {
    id: number;
    frames: number;
    duration: number;
    range: string;
    timestamp: string;  // ISO 8601 format
    status: string;
    done: boolean;
    owner: User,
    assignee: string | null;
    category: string | null;
};

export type JobCategory = {
    id: number;
    total: number;
    completed: number;
    name: string;
    timestamp: string;  // ISO 8601 format
    dataset: number;
};



