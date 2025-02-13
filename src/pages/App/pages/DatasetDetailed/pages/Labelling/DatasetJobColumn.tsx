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
        <FetchLayout status={jobStatus}>
            <div className="w-full flex justify-between gap-4 pb-3 items-center">
                <Title>{title}</Title>
            </div>
            <div className="grid grid-cols-1 gap-2">
                {
                    jobData?.results.map(x => (
                        <JobCard key={x.id} job={x}></JobCard>
                    ))
                }
            </div>
        </FetchLayout>
    );
}

const component=  withFilters<{page: number}>(DatasetJobColumn, {page: 1});
export default component;