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
import {Link} from "react-router";

interface Filters{
    name: string
}

function DatasetsPage() {
    const filters = useFilters<Filters>()
    const {data, status} = useDatasets({...filters});
    const createFormDialog = useDialog()

    return (
        <PageLayout size="xl" title="Your datasets">
            <DatasetCreateFormDialog dialog={createFormDialog}></DatasetCreateFormDialog>
            <div className="w-full flex justify-between gap-4 py-4">
                <div className="w-full max-w-[600px]">
                    <FormikInput size="lg" name="name" leftIcon={() => <BiSearch size={20}/>} placeholder="Search a dataset..."></FormikInput>
                </div>
                <div>
                    <Button onClick={() => createFormDialog.setOpen(true)} size="lg">Crear nuevo</Button>
                </div>
            </div>
            <FetchLayout status={status} className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
                {
                    data?.results.map((dataset) => (
                            <DatasetOptionMenu key={dataset.id} dataset={dataset}>
                                <Link to={dataset.id.toString()}>
                                    <DatasetCard key={dataset.id} dataset={dataset}></DatasetCard>
                                </Link>
                            </DatasetOptionMenu>
                    ))
                }
            </FetchLayout>
        </PageLayout>
    );
}

const DatasetPage = withFilters<Filters>(DatasetsPage, {name: ""});
export default DatasetPage;