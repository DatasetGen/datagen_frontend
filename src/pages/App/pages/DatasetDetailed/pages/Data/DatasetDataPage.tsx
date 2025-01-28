import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import {useDatasetImages} from "../../../../../../api/app/datasets.ts";
import {Link, useParams} from "react-router";
import {BsStars} from "react-icons/bs";
import {useFilters, withFilters} from "../../../../../../component_library/formik/FormikFilters.tsx";
import {BiData, BiSearch} from "react-icons/bi";
import DatasetImageCard from "../../../../../../business_components/DatasetImageCard.tsx";
import DatasetImageOptionMenu from "./components/DatasetImageOptionMenu.tsx";
import MenuButton from "../../../../../../component_library/forms/MenuButton.tsx";
import {MdFolderZip, MdImage} from "react-icons/md";
import {useDialog} from "@ark-ui/react";
import DatasetImageCreateFormDialog from "./components/DatasetImageCreateFormDialog.tsx";
import DatasetImageCreateZipFormDialog from "./components/DatasetImageCreateZipFormDialog.tsx";
import {FormikPagination} from "../../../../../../component_library/formik/FormikPagination.tsx";

const DataGenOptions = [
    {
        title: "Generar basado en prompt",
        icon: <BsStars></BsStars>,
        callback: () => {}
    },
    {
        title: "Generar similar a otra imágen",
        icon: <BsStars></BsStars>,
        callback: () => {}
    },
    {
        title: "Generación autoetiquetada",
        icon: <BsStars></BsStars>,
        callback: () => {}
    },
]


function DatasetDataPage() {

    const {dataset_id} = useParams()
    const filters = useFilters<{page:string}>()
    const {data, status} = useDatasetImages(parseInt(dataset_id ?? ""))(filters)

    const createImageDialog = useDialog();
    const createZipImageDialog = useDialog();

    const UploadImageOptions = [
        {
            title: "Subir imagen",
            icon: <MdImage></MdImage>,
            callback: () => { createImageDialog.setOpen(true)}
        },
        {
            title: "Subir .zip",
            icon: <MdFolderZip></MdFolderZip>,
            callback: () => { createZipImageDialog.setOpen(true)}
        },
        {
            title: "Importar dataset",
            icon: <BiData></BiData>,
            callback: () => {}
        },
    ]

    return (
        <>
        <DatasetImageCreateFormDialog dialog={createImageDialog}/>
        <DatasetImageCreateZipFormDialog dialog={createZipImageDialog}/>
            <FetchLayout status={status} >
                <div className="w-full flex justify-between gap-4 py-4">
                    <div className="w-full max-w-[600px]">
                        <FormikPagination colorSchema="secondary" name="page" paginationProps={{
                            count: data?.count ?? 0,
                            siblingCount: 1,
                            pageSize: data?.page_size ?? 0
                        }}></FormikPagination>
                    </div>
                    <div className="flex gap-4 max-w-[350px] w-full">
                        <MenuButton items={UploadImageOptions} size="md" colorSchema="primary">Añadir datos</MenuButton>
                        <MenuButton items={DataGenOptions} size="md"><BsStars/>Generar con IA</MenuButton>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
                {
                    data?.results.map((image) => (
                        <DatasetImageOptionMenu key={image.id} image={image}>
                            <Link to={"/app/datasets/" + dataset_id + "/image_editor/" + image.id}>
                                <DatasetImageCard image={image}></DatasetImageCard>
                            </Link>
                        </DatasetImageOptionMenu>
                    ))
                }
                </div>
            </FetchLayout>
        </>
    )
        ;
}

const DatasetDataPageWithFilters = withFilters<{ page: number }>(DatasetDataPage, {page: 1, page_size: 10});
export default DatasetDataPageWithFilters