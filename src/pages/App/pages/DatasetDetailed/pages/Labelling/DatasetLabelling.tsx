import { useNavigate, useParams } from 'react-router';
import {useDatasetBatches} from "../../../../../../api/app/datasets.ts";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import Title from "../../../../../../component_library/texts/Title.tsx";
import BatchCard from "../../../../../../business_components/BatchCard.tsx";
import { BiUpload} from "react-icons/bi";
import DatasetJobCategoryCreateForm from "./components/DatasetJobCategoryCreateForm.tsx";
import {useDialog} from "@ark-ui/react";
import DatasetJobColumn from "./DatasetJobColumn.tsx";
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';

function DatasetLabelling() {

    const {dataset_id} = useParams();
    const navigate = useNavigate()
    const {data: categoryData, status: categoryStatus} = useDatasetBatches(parseInt(dataset_id ?? ""))({
        "unassigned_gt": 0,
        "workbench": false
    })
    const createCategoryDialog = useDialog();

    return (
        <PageLayout status={categoryStatus} title="Labeling Page">
            <DatasetJobCategoryCreateForm dialog={createCategoryDialog}/>
            <div className="gap-2 mt-5 overflow-auto w-full">
                <div className="flex gap-3 overflow-hidden w-fit min-w-full">
                    <div className="bg-gray-100 p-4  sticky rounded-xl h-[86vh] w-[350px] z-30 overflow-auto">
                        <Title>Batch</Title>
                        <div className="grid gap-2 mt-3">
                            <div onClick={() => navigate(`/app/datasets/${dataset_id}/dataset_upload`)}
                                 className="justify-center hover:bg-gray-300 cursor-pointer flex px-3 py-2 rounded-lg gap-2 bg-gray-200 items-center text-sm font-semibold text-gray-600 ">
                                <BiUpload></BiUpload>
                                Upload files
                            </div>
                            {
                                categoryData?.results.map(x => (
                                    <BatchCard key={x.id} batch={x}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4  sticky rounded-xl h-[86vh] overflow-auto w-[350px] z-3">
                        <DatasetJobColumn title="In progress" filters={{done: false}}></DatasetJobColumn>
                    </div>
                    <div className="bg-gray-100 p-4  sticky rounded-xl h-[86vh] overflow-auto w-[350px] z-2">
                        <DatasetJobColumn title="Reviewing" filters={{done: true, reviewed: false}}></DatasetJobColumn>
                    </div>
                    <div className="bg-gray-100 p-4  sticky rounded-xl h-[86vh] overflow-auto w-[350px]">
                        <DatasetJobColumn title="Done" filters={{done: true, reviewed: true}}></DatasetJobColumn>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default DatasetLabelling;