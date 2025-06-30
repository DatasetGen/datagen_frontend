import React from 'react';
import {Dataset} from "../../../../../types";
import {OptionMenuContainer} from "../../../../../component_library/utils/OptionMenu.tsx";
import {BiTrash} from "react-icons/bi";
import {useRemoveDataset} from "../../../../../api/app/datasets.ts";
import {queryClient} from "../../../../../api/client.ts";
import DeleteDialog from "../../../../../component_library/dialogs/DeleteDialog.tsx";
import {useDialog} from "@ark-ui/react";

interface Props{
    children: React.ReactNode,
    dataset: Dataset
}

function DatasetOptionMenu({dataset, children}: Props) {
    const dialog = useDialog({
        id: 'DatasetOptionMenu' + dataset.id,
    });
    const {mutateAsync} = useRemoveDataset(dataset.id)({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["datasets",],
            })
        }
    });

    return (
        <>
            <DeleteDialog dialog={dialog} callback={async () => await mutateAsync({})}></DeleteDialog>
            <OptionMenuContainer items={[
                {
                    title: "Delete",
                    trash: true,
                    icon: <BiTrash size={15}/>,
                    callback: () => { dialog.setOpen(true);}
                }
            ]}>
                {
                    children
                }
            </OptionMenuContainer>
        </>
    );
}

export default DatasetOptionMenu;