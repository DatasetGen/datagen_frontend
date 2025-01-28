export type Dataset = {
    id: number;
    num_images: number;
    num_labels: number;
    total_weight: string;
    name: string;
    description: string;
    thumbnail: string;
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
    labels: string[]
};
