import {InputAnnotation} from "../pages/App/pages/EditorPage/core/annotators/types.ts";

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
    order: number;
    id: number;
    name: string;
    slug: string;
    color: string;
    prompt: string;
    negative_prompt:string,
    timestamp: string
};

export type DatasetImage = {
    id: number;
    image: string;
    total_weight: string;
    extension: string;
    name: string;
    labels: DatasetLabel[];
    annotations: InputAnnotation<any>[],
    job?: number,
    batch: number,
    done: boolean,
    reviewed: boolean,
};

export type Job = {
    id: number;
    frames: number;
    duration: number;
    range: string;
    timestamp: string;  // ISO 8601 format
    status: string;
    done: boolean;
    reviewed_frames: number;
    done_frames: number;
    owner: User,
    assignee: User | null;
    category: string | null;
    current_image?: number | null;
    start_range: number,
    end_range: number,
    images: number[]
    reviewed: boolean
};

export type Batch = {
    id: number;
    total: number;
    completed: number;
    name: string;
    timestamp: string;  // ISO 8601 format
    dataset: number;
    unassigned: number;
    synthetic: number;
};



