import React from 'react';
import {Batch} from "../types";
import { useNavigate, useParams} from "react-router";
import {OptionMenuContainer} from "../component_library/utils/OptionMenu.tsx";
import {BiTrash} from "react-icons/bi";
import DeleteDialog from "../component_library/dialogs/DeleteDialog.tsx";
import {useDestroyBatch} from "../api/app/datasets.ts";
import {useDialog} from "@ark-ui/react";
import {queryClient} from "../api/client.ts";
import Button from "../component_library/forms/Button.tsx";
import {FaArrowRight} from "react-icons/fa6";
import DatasetAssignBatchImages
  from '../pages/App/pages/DatasetDetailed/pages/Labelling/components/DatasetAssignBatchImages.tsx';

function BatchCard({batch, onClickAssign}: {batch: Batch, onClickAssign: () => void}) {
    const date = new Date(batch.timestamp)
    const { job_category_id, dataset_id} = useParams();
    const active = batch.id === parseInt(job_category_id ?? "");
    const navigate = useNavigate();
    const {mutateAsync} = useDestroyBatch(
        parseInt(dataset_id ?? ""),
        batch.id
    )({
    onSuccess: async () => {
        await queryClient.invalidateQueries({
            queryKey: ["datasets",  parseInt(dataset_id ?? ""), "batches"],
        })
        dialog.setOpen(false)
    }
    })
    const dialog = useDialog();
    const assignDialog = useDialog()

    return (
      <>
        <DatasetAssignBatchImages batchId={batch.id} dialog={assignDialog}></DatasetAssignBatchImages>
        <DeleteDialog dialog={dialog} callback={async () => await mutateAsync({})}></DeleteDialog>
        <OptionMenuContainer
            size="sm"
            buttonSize="xs"
            iconProps={{colorSchema: "secondary"}}
            items={[
                {
                    title: "Delete",
                    trash: true,
                    icon: <BiTrash size={15}/>,
                    callback: () => { dialog.setOpen(true)}
                }
            ]}>
            <div
                className={"p-3 bg-gray-200 rounded-xl grid gap-1 border-2 border-solid " + (active && " border-brand_primary-500")}>
                <div className="font-semibold text-gray-800 text-sm">{batch.name}</div>
                <div className="text-gray-500 text-[10px]">Created
                    on: {date.getDay()}/{date.getMonth()}/{date.getFullYear()}</div>
                <div className="mt-2">
                    <div className="font-semibold text-[10px] text-gray-500 mb-2">
                        {batch.unassigned} unassigned images
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" colorSchema="primary"
                            onClick={() => navigate(`/app/datasets/${dataset_id}/batch/${batch.id}`)}
                    >
                                    <span className="text-nowrap">
                                        View images
                                    </span>
                    </Button>
                    <Button size="sm" colorSchema="brand_primary" onClick={() => assignDialog.setOpen(true)}>
                                    <span className="text-nowrap">
                                        Assign images
                                    </span>
                        <FaArrowRight></FaArrowRight>
                    </Button>
                </div>
            </div>
        </OptionMenuContainer>
      </>
    );
}

export default BatchCard;