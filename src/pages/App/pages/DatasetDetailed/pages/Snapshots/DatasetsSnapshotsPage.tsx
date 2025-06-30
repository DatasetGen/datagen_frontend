import Title from '../../../../../../component_library/texts/Title.tsx';
import {
  useCreateDatasetSnapshot,
  useDatasetLabels,
  useDatasetSnapshots,
} from '../../../../../../api/app/datasets.ts';
import { Link, useNavigate, useParams } from 'react-router';
import FetchLayout from '../../../../../../component_library/layouts/FetchLayout';
import { IoMdAdd } from 'react-icons/io';
import FormIconButton from '../../../../../../component_library/forms/FormIconButton.tsx';
import DatasetLabelCard from '../../../../../../business_components/DatasetLabelCard.tsx';
import DatasetLabelCreateFormDialog from './components/DatasetLabelCreateFormDialog.tsx';
import { useDialog } from '@ark-ui/react';
import EmptyLabels from '../../../../../../assets/emptyLabels.png';
import Paragraph from '../../../../../../component_library/texts/Paragraph.tsx';
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';
import { BiDownload } from 'react-icons/bi';
import Button from '../../../../../../component_library/forms/Button.tsx';
import { queryClient } from '../../../../../../api/client.ts';

function DataEmpty() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 mt-10">
      <img className="max-w-[400px]" src={EmptyLabels} />
      <Title size="md" colorSchema="primary">
        You don't have items yet
      </Title>
      <Paragraph size="sm" colorSchema="secondary">
        Add your first item to start working
      </Paragraph>
    </div>
  );
}

function DatasetSnapshotsPage() {
  const { dataset_id } = useParams();
  const { data, status } = useDatasetSnapshots(parseInt(dataset_id || ''))();
  const { mutateAsync, isPending } = useCreateDatasetSnapshot(dataset_id)({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['datasets', parseInt(dataset_id ?? ''), 'snapshots'],
      });
    },
  });

  const createLabelDialog = useDialog();

  return (
    <PageLayout className="mt-5" title="Snapshots">
      <DatasetLabelCreateFormDialog dialog={createLabelDialog} />
      <div className="flex gap-2  justify-end mt-6 w-fit w-full">
        <div className="w-fit">
          <Button
            size="md"
            loading={isPending}
            colorSchema="primary"
            onClick={() => mutateAsync({})}
          >
            Create Snapshot
            <IoMdAdd></IoMdAdd>
          </Button>
        </div>
      </div>
      <FetchLayout
        status={status}
        isEmpty={(data?.results.length ?? 0) < 1}
        emptyComponent={<DataEmpty />}
      >
        {data?.results?.map((x) => (
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="bg-gray-100 p-4 rounded-lg font-semibold justify-between flex items-center">
              <div>
                <p>Snapshot {x.id} </p>
                <p className="text-gray-500 text-xs">{x.timestamp}</p>
              </div>
              {x.file && (
                <a href={x.file}>
                  <FormIconButton colorSchema="secondary">
                    <BiDownload></BiDownload>
                  </FormIconButton>
                </a>
              )}
            </div>
          </div>
        ))}
      </FetchLayout>
    </PageLayout>
  );
}

export default DatasetSnapshotsPage;
