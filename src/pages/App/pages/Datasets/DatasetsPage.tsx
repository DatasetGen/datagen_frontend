import PageLayout from "../../../../component_library/layouts/PageLayout.tsx";
import {useDatasets} from "../../../../api/app/datasets.ts";
import FetchLayout from "../../../../component_library/layouts/FetchLayout";
import DatasetCard from "../../../../business_components/DatasetCard.tsx";
import {useFilters, withFilters} from "../../../../component_library/formik/FormikFilters.tsx";
import {FormikInput} from "../../../../component_library/formik/FormikInputs.tsx";
import {BiSearch } from "react-icons/bi";
import Button from "../../../../component_library/forms/Button.tsx";
import {useDialog} from "@ark-ui/react";
import DatasetCreateFormDialog from "./components/DatasetCreateFormDialog.tsx";
import DatasetOptionMenu from "./components/DatasetOptionMenu.tsx";
import { useNavigate } from 'react-router';
import EmptyImage from '../../../../assets/datasetsEmpty.png'
import Title from '../../../../component_library/texts/Title.tsx';
import Paragraph from '../../../../component_library/texts/Paragraph.tsx';

interface Filters{
    name: string
}

function DatasetsEmpty(){
  return <div className="w-full flex flex-col items-center justify-center gap-3">
    <img className="max-w-[400px] mb-[-60px]" src={EmptyImage}/>
    <Title size="md" colorSchema="primary">You don't have any dataset yet</Title>
    <Paragraph size="sm" colorSchema="secondary">Add a new dataset in order to start using datagen</Paragraph>
  </div>
}

function DatasetsPage() {
    const filters = useFilters<Filters>()
    const {data, status} = useDatasets({...filters});
    const createFormDialog = useDialog()
    const navigate = useNavigate()

    return (
        <PageLayout size="lg" title="Your datasets">
            <DatasetCreateFormDialog dialog={createFormDialog}></DatasetCreateFormDialog>
            <div className="w-full flex justify-between gap-4 py-4">
                <div className="w-full max-w-[600px]">
                    <FormikInput size="lg" name="name" leftIcon={() => <BiSearch size={20}/>} placeholder="Search a dataset..."></FormikInput>
                </div>
                <div>
                    <Button onClick={() => createFormDialog.setOpen(true)} size="lg">Crear nuevo</Button>
                </div>
            </div>
            <FetchLayout isEmpty={(data?.results.length ?? 0) < 1} status={status} className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4" emptyComponent={<DatasetsEmpty/>}>
                {
                    data?.results.map((dataset) => (
                            <DatasetOptionMenu key={dataset.id} dataset={dataset}>
                                <div onClick={() => {navigate(dataset.id.toString())}}>
                                    <DatasetCard key={dataset.id} dataset={dataset}></DatasetCard>
                                </div>
                            </DatasetOptionMenu>
                    ))
                }
            </FetchLayout>
        </PageLayout>
    );
}

const DatasetPage = withFilters<Filters>(DatasetsPage, {name: ""});
export default DatasetPage;