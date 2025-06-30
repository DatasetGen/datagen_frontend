import Title from "../../../../../../component_library/texts/Title.tsx";
import {useDatasetLabels} from "../../../../../../api/app/datasets.ts";
import { useNavigate, useParams } from 'react-router';
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import {IoMdAdd} from "react-icons/io";
import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import DatasetLabelCard from "../../../../../../business_components/DatasetLabelCard.tsx";
import DatasetLabelCreateFormDialog from "./components/DatasetLabelCreateFormDialog.tsx";
import {useDialog} from "@ark-ui/react";
import EmptyLabels from '../../../../../../assets/emptyLabels.png';
import Paragraph from '../../../../../../component_library/texts/Paragraph.tsx';
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';

function DataEmpty(){
  return <div className="w-full flex flex-col items-center justify-center gap-3 mt-10">
    <img className="max-w-[400px]" src={EmptyLabels}/>
    <Title size="md" colorSchema="primary">You don't have labels yet</Title>
    <Paragraph size="sm" colorSchema="secondary">Add your first label to start working</Paragraph>
  </div>
}

function DatasetConfigurationPage() {

    const {dataset_id} = useParams();
    const {data, status} = useDatasetLabels(parseInt(dataset_id || ""))()
    const createLabelDialog = useDialog()

    return (
        <PageLayout title="Configuration">
            <DatasetLabelCreateFormDialog dialog={createLabelDialog}/>
              <div className="flex gap-2 w-full justify-between mt-6">
                  <Title size="md">Labels</Title>
                  <FormIconButton size="md" colorSchema="primary" onClick={() => createLabelDialog.setOpen(true)}>
                    <IoMdAdd></IoMdAdd>
                  </FormIconButton>
              </div>
            <FetchLayout status={status} isEmpty={(data?.results.length ?? 0) < 1} emptyComponent={<DataEmpty/>}>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {
                    data?.results?.map(x => (
                        <DatasetLabelCard key={x.id} label={x}></DatasetLabelCard>
                    ))
                }
                </div>
            </FetchLayout>
        </PageLayout>
    );
}

export default DatasetConfigurationPage;