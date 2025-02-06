import {createMutationHook, createQueryHook} from "../engine/factories";
import {Dataset, DatasetImage, DatasetLabel, Job, JobCategory, User} from "../../types";
import {ApiPagination} from "../engine/types.ts";
import {InputAnnotation, OutputAnnotation} from "../../pages/App/pages/ImageDetailed/core/annotators/types.ts";


export const useDatasets = createQueryHook<ApiPagination<Dataset>>(["datasets",], "/datasets/")
export const useDataset = (pk : number) => (
    createQueryHook<Dataset>(["datasets", pk], `/datasets/${pk}/`)
)
export const useUsers = () => (
    createQueryHook<User[]>(["users"], `auth/users/`)
)
export const useCreateDataset = createMutationHook<{name: string, description: string}, Dataset>("POST", "/datasets/")
export const useRemoveDataset = (id: number) => createMutationHook<{}, Dataset>("DELETE", "/datasets/" + id + "/")

export const useRemoveDatasetImage = (dataset_id: number, image_id: number) => (
    createMutationHook<{}, Dataset>("DELETE", "/datasets/" + dataset_id + "/images/" + image_id)
)
export const useDatasetImages = (dataset_pk : number) => (
    createQueryHook<ApiPagination<DatasetImage>>(["datasets", dataset_pk, "images"], `/datasets/${dataset_pk}/images/`)
)

export const useDatasetJobs = (dataset_pk : number) => (
    createQueryHook<ApiPagination<Job>>(["datasets", dataset_pk, "jobs"], `/datasets/${dataset_pk}/jobs/`)
)

export const useDatasetJobCategories = (dataset_pk : number) => (
    createQueryHook<ApiPagination<JobCategory>>(["datasets", dataset_pk, "job_categories"], `/datasets/${dataset_pk}/job_categories/`)
)
export const useCreateDatasetJobsCategories = (dataset_id: number) => createMutationHook<{name: string}, JobCategory>("POST", "/datasets/" + dataset_id +"/job_categories/")
export const useCreateDatasetJob = (dataset_id: number) => createMutationHook<{name: string, status?: string, asignee?: number, category?:number}, JobCategory>("POST", "/datasets/" + dataset_id +"/jobs/")
export const useDestroyDatasetJobCategory = (dataset_id: number, job_category_id: number) => createMutationHook<{}, JobCategory>("DELETE", "/datasets/" + dataset_id +"/job_categories/" + job_category_id)



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
export const useSaveAnnotations = (dataset_pk : number, image_pk : number) => (
    createMutationHook<OutputAnnotation<any>, OutputAnnotation<any>>(
        "POST", `/datasets/${dataset_pk}/images/${image_pk}/annotations/batch/`
    )
)
export const useDatasetImageAnnotations = (dataset_pk : number, image_pk : number) => (
    createQueryHook<ApiPagination<InputAnnotation<any>>>(["datasets", dataset_pk, "images", image_pk, "annotations"], `/datasets/${dataset_pk}/images/${image_pk}/annotations/`)
)

