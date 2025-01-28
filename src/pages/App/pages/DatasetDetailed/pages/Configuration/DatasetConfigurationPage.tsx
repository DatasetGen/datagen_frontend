import Title from "../../../../../../component_library/texts/Title.tsx";
import {useDatasetLabels} from "../../../../../../api/app/datasets.ts";
import {useParams} from "react-router";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import {IoMdAdd, IoMdClose, IoMdPricetag, IoMdTrash} from "react-icons/io";
import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import Button from "../../../../../../component_library/forms/Button.tsx";
import DatasetLabelCard from "../../../../../../business_components/DatasetLabelCard.tsx";
import DatasetLabelCreateFormDialog from "./components/DatasetLabelCreateFormDialog.tsx";
import {useDialog} from "@ark-ui/react";

function DatasetConfigurationPage() {

    const {dataset_id} = useParams();
    const {data, status} = useDatasetLabels(parseInt(dataset_id || ""))()
    const createLabelDialog = useDialog()

    return (
        <div className="mt-5">
            <DatasetLabelCreateFormDialog dialog={createLabelDialog}/>
            <FetchLayout status={status}>
                <Title>Labels</Title>
                <div className="flex gap-2 mt-3 flex-wrap">
                {
                    data?.results?.map(x => (
                        <DatasetLabelCard key={x.id} label={x}></DatasetLabelCard>
                    ))
                }
                <FormIconButton size="md" colorSchema="primary" onClick={() => createLabelDialog.setOpen(true)}>
                    <IoMdAdd></IoMdAdd>
                </FormIconButton>
                </div>
            </FetchLayout>
        </div>
    );
}

export default DatasetConfigurationPage;