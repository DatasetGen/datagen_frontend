import FetchLayout from '../../../../../../component_library/layouts/FetchLayout';
import { useDatasetImages } from '../../../../../../api/app/datasets.ts';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { BsStars } from 'react-icons/bs';
import {
  useFilters,
  withFilters,
} from '../../../../../../component_library/formik/FormikFilters.tsx';
import DatasetImageCard from '../../../../../../business_components/DatasetImageCard.tsx';
import DatasetImageOptionMenu from './components/DatasetImageOptionMenu.tsx';
import { FormikPagination } from '../../../../../../component_library/formik/FormikPagination.tsx';
import EmptyImage from '../../../../../../assets/datasetsEmpty.png';
import Title from '../../../../../../component_library/texts/Title.tsx';
import Paragraph from '../../../../../../component_library/texts/Paragraph.tsx';
import Button from '../../../../../../component_library/forms/Button.tsx';
import { BiUpload } from 'react-icons/bi';
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';
import { useEffect } from 'react';

const DataGenOptions = [
  {
    title: 'Generar basado en prompt',
    icon: <BsStars></BsStars>,
    callback: () => {},
  },
  {
    title: 'Generar similar a otra imágen',
    icon: <BsStars></BsStars>,
    callback: () => {},
  },
  {
    title: 'Generación autoetiquetada',
    icon: <BsStars></BsStars>,
    callback: () => {},
  },
];

function DataEmpty() {
  const { dataset_id } = useParams();
  const navigate = useNavigate();
  return;
  <div className="w-full flex flex-col items-center justify-center gap-3">
    <img className="max-w-[400px] mb-[-60px]" src={EmptyImage} />
    <Title size="md" colorSchema="primary">
      You don't images yet
    </Title>
    <Paragraph size="sm" colorSchema="secondary">
      Start uploading images
    </Paragraph>
    <div className="max-w-[300px] mt-3">
      <Button
        onClick={() => navigate(`/app/datasets/${dataset_id}/dataset_upload`)}
      >
        Upload Images <BiUpload></BiUpload>
      </Button>
    </div>
  </div>;
}

function DatasetDataPage() {
  const { dataset_id } = useParams();
  const [params, setParams] = useSearchParams();
  console.log(params.get('page'));
  const filters = useFilters<{ page: string; page_size: number }>();
  const { data, status } = useDatasetImages(parseInt(dataset_id ?? ''))({
    ...filters,
    page: parseInt(params.get('page')),
  });

  useEffect(() => {
    if (!params.get('page')) setParams({ page: '1' });
  }, []);

  return (
    <PageLayout title="Dataset data">
      <div className="w-full flex justify-between gap-4 py-4">
        <div className="w-full max-w-[600px]">
          <FormikPagination
            size="sm"
            colorSchema="secondary"
            name="page"
            paginationProps={{
              count: data?.count ?? 0,
              siblingCount: 1,
              pageSize: filters.page_size ?? 0,
            }}
          ></FormikPagination>
        </div>
      </div>
      <FetchLayout
        status={status}
        isEmpty={(data?.results.length ?? 0) < 1}
        emptyComponent={<DataEmpty />}
      >
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5  gap-4">
          {data?.results.map((image) => (
            <DatasetImageOptionMenu key={image.id} image={image}>
              <Link
                to={`/app/datasets/${dataset_id}/job/${image.job}/image/${image.id}/`}
              >
                <DatasetImageCard image={image}></DatasetImageCard>
              </Link>
            </DatasetImageOptionMenu>
          ))}
        </div>
      </FetchLayout>
    </PageLayout>
  );
}

const DatasetDataPageWithFilters = withFilters<{
  page: number;
  page_size: number;
}>(DatasetDataPage, { page: 1, page_size: 12 });
export default DatasetDataPageWithFilters;
