import {DatasetLabel} from "../types";
import { IoMdPricetag} from "react-icons/io";
import FormIconButton from "../component_library/forms/FormIconButton.tsx";
import OptionMenu from "../component_library/utils/OptionMenu.tsx";
import { BiDotsVertical, BiEdit, BiTrash } from 'react-icons/bi';
import DeleteDialog from "../component_library/dialogs/DeleteDialog.tsx";
import {useDialog} from "@ark-ui/react";
import {useRemoveDatasetLabel} from "../api/app/datasets.ts";
import {useParams} from "react-router";
import {queryClient} from "../api/client.ts";
import DatasetLabelUpdateFormDialog
    from '../pages/App/pages/DatasetDetailed/pages/Configuration/components/DatasetLabelUpdateFormDialog.tsx';

interface DatasetLabelCardProps {
    label: DatasetLabel
}

function DatasetLabelCard({label} : DatasetLabelCardProps) {

    const {dataset_id} = useParams()
    const deleteDialog = useDialog();
    const modifyDialog = useDialog()
    const {mutateAsync} = useRemoveDatasetLabel(parseInt(dataset_id ?? ""), label.id)({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ["datasets", parseInt(dataset_id ?? ""), "labels"]
            })
            deleteDialog.setOpen(false)
        }
    })

    /*

     */

    return (
        <>
        <DatasetLabelUpdateFormDialog dialog={modifyDialog} label={label}></DatasetLabelUpdateFormDialog>
        <DeleteDialog callback={async () => {await mutateAsync({})}} dialog={deleteDialog}></DeleteDialog>
        <div key={label.id} className="p-3 bg-gray-100 border-2 rounded-xl flex items-center gap-7 text-gray-500 font-semibold w-full">
            <div className="w-full flex justify-between">
                <div className="flex items-center gap-2 text-base">
                    <IoMdPricetag size={20} color={label?.color}></IoMdPricetag>
                    {label.name}
                    <p className="text-sm">
                    {label.order}
                    </p>
                </div>
                <OptionMenu items={[
                    {
                        icon: <BiEdit></BiEdit>,
                        title: "Modificar",
                        callback: () => {modifyDialog.setOpen(true)},
                    },
                    {
                        icon: <BiTrash></BiTrash>,
                        title: "Eliminar",
                        callback: () => {deleteDialog.setOpen(true)},
                        trash: true
                    },
                ]}>
                    <FormIconButton size={"sm"} colorSchema="primary">
                        <BiDotsVertical></BiDotsVertical>
                    </FormIconButton>
                </OptionMenu>

            </div>
        </div>
        </>
    );
}

export default DatasetLabelCard;