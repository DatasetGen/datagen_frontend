import React from 'react';
import Title from "../../../../../../component_library/texts/Title.tsx";
import JobCard from "../../../../../../business_components/JobCard.tsx";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import {useDatasetJobs} from "../../../../../../api/app/datasets.ts";
import {useParams} from "react-router";
import {useDialog} from "@ark-ui/react";
import {withFilters} from "../../../../../../component_library/formik/FormikFilters.tsx";

interface Props{
    filters: {[key: string] : string | number | boolean},
    title : string
}

function DatasetJobColumn({filters, title}: Props) {
    const {dataset_id, job_category_id} = useParams();
    const {data: jobData, status: jobStatus} = useDatasetJobs(parseInt(dataset_id ?? ""))({
        ...filters
    })
    const dialog = useDialog()

    return (
      <div className="bg-gray-100 sticky rounded-xl h-max overflow-auto w-[350px] z-3">
        <FetchLayout status={jobStatus}>
          <div className="w-full flex justify-between gap-4 pb-3 items-center p-4 border-b-[1px] border-solid border-gray-200">
            <Title>{title}</Title>
          </div>
          <div className="flex flex-col gap-2 h-[81vh] overflow-auto p-4 ">
            {
              jobData?.results.map(x => (
                <JobCard key={x.id} job={x}></JobCard>
              ))
            }
          </div>
      </FetchLayout>
      </div>
)
  ;
}

const component = withFilters < { page: number } > (DatasetJobColumn, {
  page: 1
});
export default component;