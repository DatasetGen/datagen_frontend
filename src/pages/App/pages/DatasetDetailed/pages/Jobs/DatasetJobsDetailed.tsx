import React from 'react';
import Title from "../../../../../../component_library/texts/Title.tsx";
import JobCard from "../../../../../../business_components/JobCard.tsx";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import {useDatasetJobs} from "../../../../../../api/app/datasets.ts";
import {useParams} from "react-router";
import Button from "../../../../../../component_library/forms/Button.tsx";
import {useDialog} from "@ark-ui/react";
import DatasetJobCreateForm from "./components/DatasetJobCreateForm.tsx";

function DatasetJobsDetailed(props) {
    const {dataset_id, job_category_id} = useParams();
    const {data: jobData, status: jobStatus} = useDatasetJobs(parseInt(dataset_id ?? ""))({
        category: job_category_id
    })
    const dialog = useDialog()

    return (
        <>
            <DatasetJobCreateForm dialog={dialog}></DatasetJobCreateForm>
            <FetchLayout>

                <Title>Labeling Task</Title>
                <div className="my-3">
                    <div className="max-w-[180px]">
                        <Button size="md" onClick={() => dialog.setOpen(true)}>
                            Create job
                        </Button>
                    </div>
                </div>
                <div className="grid gap-3 mt-3">
                    {
                        jobData?.results.map(x => (
                            <JobCard job={x}></JobCard>
                        ))
                    }
                </div>
            </FetchLayout>
        </>
    );
}

export default DatasetJobsDetailed;