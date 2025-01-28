import React from 'react';
import {DatasetLabel} from "../types";
import {IoMdClose, IoMdPricetag} from "react-icons/io";
import FormIconButton from "../component_library/forms/FormIconButton.tsx";
import OptionMenu from "../component_library/utils/OptionMenu.tsx";
import {BiDotsHorizontal, BiDotsVertical, BiTrash} from "react-icons/bi";
import DeleteDialog from "../component_library/dialogs/DeleteDialog.tsx";
import {useDialog} from "@ark-ui/react";
import {useRemoveDatasetLabel} from "../api/app/datasets.ts";
import {useParams} from "react-router";
import {queryClient} from "../api/client.ts";

interface DatasetLabelCardProps {
    label: DatasetLabel
}

function DatasetLabelCard({label} : DatasetLabelCardProps) {

    const {dataset_id} = useParams()
    const deleteDialog = useDialog();
    const {mutateAsync} = useRemoveDatasetLabel(parseInt(dataset_id ?? ""), label.id)({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ["datasets", parseInt(dataset_id ?? ""), "labels"]
            })
            deleteDialog.setOpen(false)
        }
    })

    return (
        <>
        <DeleteDialog callback={async () => {await mutateAsync({})}} dialog={deleteDialog}></DeleteDialog>
        <div key={label.id} className="px-2 py-1 bg-gray-100 border-2 rounded-xl flex items-center gap-7 text-gray-500 font-semibold">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <IoMdPricetag color={label?.color}></IoMdPricetag>
                    {label.name}

                </div>
            </div>
            <OptionMenu items={[
                {
                    icon: <BiTrash></BiTrash>,
                    title: "Eliminar",
                    callback: () => {deleteDialog.setOpen(true)},
                    trash: true
                }
            ]}>
                <FormIconButton size={"sm"} colorSchema="primary">
                    <BiDotsVertical></BiDotsVertical>
                </FormIconButton>
            </OptionMenu>
        </div>
        </>
    );
}

export default DatasetLabelCard;