// hooks/useRemoveGenericDatasetImage.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client.ts';
import { createMutationHook, createQueryHook } from '../engine/factories';
import {
  Dataset,
  DatasetImage,
  DatasetLabel,
  Job,
  Batch,
  User,
} from '../../types';
import { ApiPagination } from '../engine/types.ts';
import {
  InputAnnotation,
  OutputAnnotation,
} from '../../pages/App/pages/EditorPage/core/annotators/types.ts';

export const useDatasets = createQueryHook<ApiPagination<Dataset>>(
  ['datasets'],
  '/datasets/'
);
export const useDataset = (pk: number) =>
  createQueryHook<Dataset>(['datasets', pk], `/datasets/${pk}/`);
export const useModifyDataset = (pk: number) =>
  createMutationHook<Partial<Dataset>, Dataset>('PATCH', `/datasets/${pk}/`);
export const useDatasetPieChart = (pk: number) =>
  createQueryHook<{ name: string; value: number; color: string }[]>(
    ['datasets', pk, 'pie_chart'],
    `/datasets/${pk}/pie_chart/`
  );
export const useDatasetBarChart = (pk: number) =>
  createQueryHook<Dataset>(
    ['datasets', pk, 'bar_chart'],
    `/datasets/${pk}/bar_chart/`
  );
export const useUsers = () => createQueryHook<User[]>(['users'], `auth/users/`);
export const useCreateDataset = createMutationHook<
  { name: string; description: string },
  Dataset
>('POST', '/datasets/');
export const useRemoveDataset = (id: number) =>
  createMutationHook<{}, Dataset>('DELETE', '/datasets/' + id + '/');

export const useRemoveDatasetImage = (dataset_id: number, image_id: number) =>
  createMutationHook<{}, Dataset>(
    'DELETE',
    '/datasets/' + dataset_id + '/images/' + image_id
  );

export const useRemoveGenericDatasetImage = (dataset_id: number) => {
  return useMutation({
    mutationFn: async (image_id: number): Promise<Dataset> => {
      const response = await apiClient.delete(
        `/datasets/${dataset_id}/images/${image_id}`
      );
      return response.data;
    },
  });
};

export const useDatasetImages = (dataset_pk: number) =>
  createQueryHook<ApiPagination<DatasetImage>>(
    ['datasets', dataset_pk, 'images'],
    `/datasets/${dataset_pk}/images/`
  );

export const useDatasetJobs = (dataset_pk: number) =>
  createQueryHook<ApiPagination<Job>>(
    ['datasets', dataset_pk, 'jobs'],
    `/datasets/${dataset_pk}/jobs/`
  );

export const useDatasetJob = (dataset_pk: number, job_id: number) =>
  createQueryHook<Job>(
    ['datasets', dataset_pk, 'jobs', job_id],
    `/datasets/${dataset_pk}/jobs/${job_id}/`
  );

export const useDatasetBatches = (dataset_pk: number) =>
  createQueryHook<ApiPagination<Batch>>(
    ['datasets', dataset_pk, 'batches'],
    `/datasets/${dataset_pk}/batches/`
  );
export const useDatasetBatch = (dataset_pk: number, batch_pk: number) =>
  createQueryHook<Batch>(
    ['datasets', dataset_pk, 'batches', batch_pk],
    `/datasets/${dataset_pk}/batches/${batch_pk}/`
  );
export const useModifyDatasetBatch = (dataset_id: number, batch_id: number) =>
  createMutationHook<Partial<Job>, Job>(
    'PUT',
    '/datasets/' + dataset_id + '/batches/' + batch_id + '/'
  );
export const useCreateBatch = (dataset_id: number) =>
  createMutationHook<{ name: string }, Batch>(
    'POST',
    '/datasets/' + dataset_id + '/batches/'
  );
export const useCreateDatasetJob = (dataset_id: number) =>
  createMutationHook<
    { name: string; status?: string; asignee?: number; category?: number },
    Job
  >('POST', '/datasets/' + dataset_id + '/jobs/');
export const useModifyDatasetJob = (dataset_id: number, job_id: number) =>
  createMutationHook<Partial<Job>, Job>(
    'PUT',
    '/datasets/' + dataset_id + '/jobs/' + job_id + '/'
  );
export const useDestroyBatch = (dataset_id: number, batch_id: number) =>
  createMutationHook<{}, Batch>(
    'DELETE',
    '/datasets/' + dataset_id + '/batches/' + batch_id
  );
export const useAssignBatch = (dataset_id: number, batch_id: number) =>
  createMutationHook<{ user_ids: number[]; images_per_task: number }, Batch>(
    'POST',
    '/datasets/' + dataset_id + '/batches/' + batch_id + '/assign/'
  );
export const useDestroyJob = (dataset_id: number, job_id: number) =>
  createMutationHook<{}, Batch>(
    'DELETE',
    '/datasets/' + dataset_id + '/jobs/' + job_id
  );

export const useCreateDatasetImages = (dataset_id: number) =>
  createMutationHook<
    { image: string; job?: number; is_synthetic?: boolean },
    DatasetImage
  >('POST', '/datasets/' + dataset_id + '/images/');
export const useModifyDatasetImage = (dataset_id: number, image_id: number) =>
  createMutationHook<Partial<DatasetImage>, DatasetImage>(
    'PATCH',
    '/datasets/' + dataset_id + '/images/' + image_id + '/'
  );

export const useCreateZipDatasetImages = (dataset_id: number) =>
  createMutationHook<{ zip_file: string }, Dataset>(
    'POST',
    '/datasets/' + dataset_id + '/images/zip/'
  );

export const useDatasetLabels = (dataset_pk: number) =>
  createQueryHook<ApiPagination<DatasetLabel>>(
    ['datasets', dataset_pk, 'labels'],
    `/datasets/${dataset_pk}/labels/`
  );

export const useDatasetLabel = (dataset_pk: number, label_pk: number) =>
  createQueryHook<DatasetLabel>(
    ['datasets', dataset_pk, 'labels', label_pk],
    `/datasets/${dataset_pk}/labels/${label_pk}`
  );


export const useModifyDatasetLabel = (dataset_id: number, label_id: number) =>
  createMutationHook<Partial<DatasetLabel>, DatasetLabel>(
    'PATCH',
    '/datasets/' + dataset_id + '/labels/' + label_id + '/'
  );
export const useDatasetSnapshots = (dataset_pk: number) =>
  createQueryHook<ApiPagination<{ name: string }>>(
    ['datasets', dataset_pk, 'snapshots'],
    `/datasets/${dataset_pk}/snapshots/`
  );

export const useCreateDatasetSnapshot = (dataset_id: number) =>
  createMutationHook<{}, Dataset>(
    'POST',
    '/datasets/' + dataset_id + '/generate_snapshot/'
  );
export const useRemoveDatasetLabel = (dataset_id: number, label_id: number) =>
  createMutationHook<{}, Dataset>(
    'DELETE',
    '/datasets/' + dataset_id + '/labels/' + label_id
  );
export const useCreateDatasetLabel = (dataset_id: number) =>
  createMutationHook<{ name: string; slug: string; color: string }, Dataset>(
    'POST',
    '/datasets/' + dataset_id + '/labels/'
  );
export const useDatasetImage = (dataset_pk: number, image_pk: number) =>
  createQueryHook<DatasetImage>(
    ['datasets', dataset_pk, 'images', image_pk],
    `/datasets/${dataset_pk}/images/${image_pk}/`
  );
export const useSaveAnnotations = (dataset_pk: number, image_pk: number) =>
  createMutationHook<OutputAnnotation<any>, OutputAnnotation<any>>(
    'POST',
    `/datasets/${dataset_pk}/images/${image_pk}/annotations/batch/`
  );
export const useDatasetImageAnnotations = (
  dataset_pk: number,
  image_pk: number
) =>
  createQueryHook<ApiPagination<InputAnnotation<any>>>(
    ['datasets', dataset_pk, 'images', image_pk, 'annotations'],
    `/datasets/${dataset_pk}/images/${image_pk}/annotations/`
  );
