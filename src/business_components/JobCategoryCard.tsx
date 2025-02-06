import React from 'react';
import {JobCategory} from "../types";
import {Link, useNavigate, useParams} from "react-router";
import MenuButton from "../component_library/forms/MenuButton.tsx";
import {OptionMenuContainer} from "../component_library/utils/OptionMenu.tsx";
import {BiTrash} from "react-icons/bi";
import DeleteDialog from "../component_library/dialogs/DeleteDialog.tsx";
import {useDestroyDatasetJobCategory} from "../api/app/datasets.ts";
import {useDialog} from "@ark-ui/react";
import {queryClient} from "../api/client.ts";

function JobCategoryCard({category}: {category: JobCategory}) {
    const date = new Date(category.timestamp)
    const completedPercentage = (category.completed/category.total)
    const { job_category_id, dataset_id} = useParams();
    const active = category.id === parseInt(job_category_id ?? "");
    const navigate = useNavigate();
    const {mutateAsync} = useDestroyDatasetJobCategory(
        parseInt(dataset_id ?? ""),
        category.id
    )({
    onSuccess: async () => {
        await queryClient.invalidateQueries({
            queryKey: ["datasets",  parseInt(dataset_id ?? ""), "job_categories"],
        })
        dialog.setOpen(false)
        if(active) navigate("/app/datasets/20/dataset_jobs/")
    }
    })
    const dialog = useDialog();

    return (
        <OptionMenuContainer
            buttonSize="sm"
            iconProps={{colorSchema: "secondary"}}
            items={[
                {
                    title: "Delete",
                    trash: true,
                    icon: <BiTrash size={15}/>,
                    callback: () => { dialog.setOpen(true)}
                }
            ]}>
            <DeleteDialog dialog={dialog} callback={async () => await mutateAsync({})}></DeleteDialog>
        <Link to={category.id.toString()}>
            <div className={"p-3 bg-gray-200 rounded-xl grid gap-2 border-2 border-solid " + (active && " border-brand_primary-500")}>
                <div className="font-semibold text-gray-800">{category.name}</div>
                <div className="text-gray-500 text-xs">Created on: {date.getDay()}/{date.getMonth()}/{date.getFullYear()}</div>
                <div className="mt-2">
                    <div className="font-semibold text-xs text-gray-500 mb-2">
                        {category.completed} completed , {category.total} total
                    </div>
                    <div className="w-full bg-gray-100 h-2 relative rounded-xl overflow-hidden ">
                        <div className="absolute top-0 left-0 h-2 bg-brand_primary-500" style={{width: completedPercentage+"%"}}>

                        </div>
                    </div>
                </div>
            </div>
        </Link>
        </OptionMenuContainer>
    );
}

export default JobCategoryCard;