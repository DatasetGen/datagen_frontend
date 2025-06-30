import React from 'react';
import {useDatasetBatch, useDatasetImages} from "../../../../../../api/app/datasets.ts";
import PageLayout from "../../../../../../component_library/layouts/PageLayout.tsx";
import {Link, useParams} from "react-router";
import {FormikPagination} from "../../../../../../component_library/formik/FormikPagination.tsx";
import DatasetImageOptionMenu from "../Data/components/DatasetImageOptionMenu.tsx";
import DatasetImageCard from "../../../../../../business_components/DatasetImageCard.tsx";
import { useFilters, withFilters } from '../../../../../../component_library/formik/FormikFilters.tsx';

function BatchDetailed(props) {

    const {batch_id, dataset_id} = useParams();
    const { data, status } = useDatasetBatch(parseInt(dataset_id ?? ""), parseInt(batch_id ?? ""))()
    const filters = useFilters<{page:string, page_size : number}>()
    const {data: images, status: imagesStatus} = useDatasetImages(parseInt(dataset_id ?? ""))({
        batch: batch_id,
        ...filters
    });

    return (
          <PageLayout title={"Batch name: "+ data?.name} isDetailed={true} status={status} backPage={`/app/datasets/${dataset_id}/dataset_jobs`}>
                  <div className="w-full flex justify-between gap-4 py-4">
                      <div className="w-full max-w-[600px]">
                          <FormikPagination size="sm" colorSchema="secondary" name="page" paginationProps={{
                              count: images?.count ?? 0,
                              siblingCount: 1,
                              pageSize: filters.page_size ?? 0
                          }}></FormikPagination>
                      </div>
                  </div>
                    <div className="grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5  gap-4">
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
          </PageLayout>
    );
}

const Page = withFilters<{page: number, page_size: number}>(BatchDetailed, {page: 1, page_size : 12});
export default Page