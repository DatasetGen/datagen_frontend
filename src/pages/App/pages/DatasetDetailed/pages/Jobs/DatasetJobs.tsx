import {Outlet, useParams} from "react-router";
import {useDatasetJobCategories, useDatasetJobs} from "../../../../../../api/app/datasets.ts";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import Title from "../../../../../../component_library/texts/Title.tsx";
import JobCategoryCard from "../../../../../../business_components/JobCategoryCard.tsx";
import {BiPlus} from "react-icons/bi";
import DatasetJobCategoryCreateForm from "./components/DatasetJobCategoryCreateForm.tsx";
import {useDialog} from "@ark-ui/react";

function DatasetJobs() {

    const {dataset_id} = useParams();
    const {data: categoryData, status: categoryStatus} = useDatasetJobCategories(parseInt(dataset_id ?? ""))()
    const createCategoryDialog = useDialog();

    return (
        <FetchLayout statusArray={[categoryStatus ]}>
            <DatasetJobCategoryCreateForm dialog={createCategoryDialog}/>
            <div className="grid-cols-8 grid mt-4 h-[80vh] gap-3 grid gap-2">
                <div className="col-span-2 bg-gray-100 p-4  sticky rounded-xl h-[80vh] overflow-auto">
                    <Title>Labeling Group</Title>
                    <div className="grid gap-2 mt-3">
                        <div onClick={() => createCategoryDialog.setOpen(true)}
                             className="hover:bg-gray-300 cursor-pointer flex px-3 py-2 rounded-lg gap-2 bg-gray-200 items-center text-sm font-semibold text-gray-600 ">
                            <BiPlus></BiPlus>
                            Add task group
                        </div>
                        {
                            categoryData?.results.map(x => (
                                <JobCategoryCard key={x.id} category={x}/>
                            ))
                        }
                    </div>
                </div>
                <div className="col-span-6 h-full overflow-auto">
                    <Outlet></Outlet>
                </div>
            </div>
        </FetchLayout>
    );
}

export default DatasetJobs;