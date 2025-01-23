export type Dataset = {
    id: number;
    num_images: number;
    num_labels: number;
    total_weight: string;
    name: string;
    description: string;
    labels: Label[];
};

export type Label = {
    id: number;
    name: string;
    slug: string;
    color: string;
};
