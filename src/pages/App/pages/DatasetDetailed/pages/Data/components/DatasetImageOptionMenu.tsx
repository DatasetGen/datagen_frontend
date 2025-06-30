import React from 'react';
import {BiTrash} from "react-icons/bi";
import {useDialog} from "@ark-ui/react";
import {useParams} from "react-router";
import {useRemoveDatasetImage} from "../../../../../../../api/app/datasets.ts";
import {DatasetImage} from "../../../../../../../types";
import {queryClient} from "../../../../../../../api/client.ts";
import DeleteDialog from "../../../../../../../component_library/dialogs/DeleteDialog.tsx";
import {OptionMenuContainer} from "../../../../../../../component_library/utils/OptionMenu.tsx";

interface Props{
    children: React.ReactNode,
    image: DatasetImage
}

function DatasetOptionMenu({image, children}: Props) {
    const dialog = useDialog({
    });
    const {dataset_id} = useParams();
    const {mutateAsync} = useRemoveDatasetImage(parseInt(dataset_id || ""), image.id)({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["datasets",  parseInt(dataset_id ?? ""), "images"],
            })
           dialog.setOpen(false)
        }
    });

    return (
        <>
            <DeleteDialog dialog={dialog} callback={async () => await mutateAsync({})}></DeleteDialog>
            <OptionMenuContainer
                size="sm"
                buttonSize="sm"
                iconProps={{colorSchema: "secondary"}}
                items={[
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