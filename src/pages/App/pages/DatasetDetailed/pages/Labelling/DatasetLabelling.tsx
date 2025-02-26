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
        <>
            <DatasetJobCategoryCreateForm dialog={createCategoryDialog}/>
            <div className="gap-2 overflow-auto h-[100vh] w-full">
                <h1 className="text-2xl font-semibold text-gray-800 px-10 py-5">Label tasks</h1>
                <div className="flex gap-3 w-fit min-w-full pl-10 max-h-max">
                    <div className="bg-gray-100 sticky rounded-xl h-max overflow-auto w-[350px] z-3">
                        <div className="w-full flex justify-between gap-4 pb-3 items-center p-4 border-b-[1px] border-solid border-gray-200">
                            <Title>Batch</Title>
                        </div>
                                <div className="flex flex-col gap-2 h-[81vh] overflow-auto p-4 ">
                                    <div onClick={() => navigate(`/app/datasets/${dataset_id}/dataset_upload`)}
                                         className="justify-center hover:bg-gray-300 cursor-pointer flex px-3 py-2 rounded-lg gap-2 bg-gray-200 items-center text-sm font-semibold text-gray-600 ">
                                        <BiUpload></BiUpload>
                                        Upload files
                                    </div>
                                    {
                                        categoryData?.results.map(x => (
                                          <BatchCard key={x.id} batch={x} />
                                        ))
                                    }
                                </div>
                        </div>
                        <DatasetJobColumn title="In progress" filters={{ done: false }}></DatasetJobColumn>
                        <DatasetJobColumn title="Reviewing"
                                          filters={{ done: true, reviewed: false }}></DatasetJobColumn>
                        <DatasetJobColumn title="Done" filters={{ done: true, reviewed: true }}></DatasetJobColumn>
                        <div className="mr-10"></div>
                    </div>
                </div>
            </>
            );
            }

            export default DatasetLabelling;