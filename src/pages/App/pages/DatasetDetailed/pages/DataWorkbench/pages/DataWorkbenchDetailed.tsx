import React from 'react';
import { useDatasetBatch, useDatasetImages } from '../../../../../../../api/app/datasets.ts';
import { Link, useNavigate, useParams } from 'react-router';
import FetchLayout from '../../../../../../../component_library/layouts/FetchLayout';
import DatasetImageOptionMenu from '../../Data/components/DatasetImageOptionMenu.tsx';
import DatasetImageCard from '../../../../../../../business_components/DatasetImageCard.tsx';
import { useFilters, withFilters } from '../../../../../../../component_library/formik/FormikFilters.tsx';
import { BsStars } from 'react-icons/bs';
import FormInput from '../../../../../../../component_library/forms/FormInput.tsx';
import { BiSearch, BiShapePolygon } from 'react-icons/bi';
import Button from '../../../../../../../component_library/forms/Button.tsx';
import PageLayout from '../../../../../../../component_library/layouts/PageLayout.tsx';



function DataWorkbenchDetailed(props) {
  const {dataset_id, batch_id} = useParams()
  const {data: batchData, status: batchStatus} = useDatasetBatch(parseInt(dataset_id ?? ""), parseInt(batch_id ?? ""))()
  const { data, status } = useDatasetBatch(parseInt(dataset_id ?? ""), parseInt(batch_id ?? ""))()
  const filters = useFilters<{page:string, page_size : number}>()
  const { data: images, status: imagesStatus } = useDatasetImages(parseInt(dataset_id ?? ""))({
    batch: batch_id,
    ...filters
  });
  const navigate = useNavigate()

  return (
    <PageLayout title={batchData?.name} isDetailed={true}>
        <div className="w-full justify-between flex mt-10">
          <div className="max-w-[300px] w-full">
            <FormInput placeholder="Search images" leftIcon={() => <BiSearch/>}></FormInput>
          </div>
          <div className="flex gap-2">
          <div className="w-[160px]">
            <Button size="md" onClick={() => navigate('data_augmentation')}>
              <BsStars></BsStars>
              Data generation
            </Button>
          </div>
        </div>
        </div>
      <FetchLayout status={status}  isEmpty={(images?.results.length ?? 0) < 1}>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full mt-3">

          {
            images?.results.map((image) => (
              <DatasetImageOptionMenu key={image.id} image={image}>
                <Link to={`/app/datasets/${dataset_id}/job/${image.job}/image/${image.id}/`}>
                  <DatasetImageCard image={image}></DatasetImageCard>
                </Link>
              </DatasetImageOptionMenu>
            ))
          }
        </div>
      </FetchLayout>
    </PageLayout>
  );
}

const Workbench = withFilters(DataWorkbenchDetailed, {page: 1, page_size: 20})
export default Workbench;