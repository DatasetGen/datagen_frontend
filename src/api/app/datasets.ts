import {createMutationHook, createQueryHook} from "../engine/factories";
import {Dataset, DatasetImage, DatasetLabel} from "../../types";
import {ApiPagination} from "../engine/types.ts";


export const useDatasets = createQueryHook<ApiPagination<Dataset>>(["datasets",], "/datasets/")
export const useDataset = (pk : number) => (
    createQueryHook<Dataset>(["datasets", pk], `/datasets/${pk}/`)
)
export const useCreateDataset = createMutationHook<{name: string, description: string}, Dataset>("POST", "/datasets/")
export const useRemoveDataset = (id: number) => createMutationHook<{}, Dataset>("DELETE", "/datasets/" + id + "/")

export const useRemoveDatasetImage = (dataset_id: number, image_id: number) => (
    createMutationHook<{}, Dataset>("DELETE", "/datasets/" + dataset_id + "/images/" + image_id)
)
export const useDatasetImages = (dataset_pk : number) => (
    createQueryHook<ApiPagination<DatasetImage>>(["datasets", dataset_pk, "images"], `/datasets/${dataset_pk}/images/`)
)
export const useCreateDatasetImages = (dataset_id: number) => createMutationHook<{image: string}, Dataset>("POST", "/datasets/" + dataset_id +"/images/")
export const useCreateZipDatasetImages = (dataset_id: number) => createMutationHook<{zip_file: string}, Dataset>("POST", "/datasets/" + dataset_id +"/images/zip/")

export const useDatasetLabels = (dataset_pk : number) => (
    createQueryHook<ApiPagination<DatasetLabel>>(["datasets", dataset_pk, "labels"], `/datasets/${dataset_pk}/labels/`)
)
export const useRemoveDatasetLabel = (dataset_id: number, label_id: number) => (
    createMutationHook<{}, Dataset>("DELETE", "/datasets/" + dataset_id + "/labels/" + label_id)
)
export const useCreateDatasetLabel = (dataset_id: number) => createMutationHook<{name: string, slug: string, color: string}, Dataset>("POST", "/datasets/" + dataset_id +"/labels/")
export const useDatasetImage = (dataset_pk : number, image_pk : number) => (
    createQueryHook<DatasetImage>(["datasets", dataset_pk, "images", image_pk], `/datasets/${dataset_pk}/images/${image_pk}`)
)
