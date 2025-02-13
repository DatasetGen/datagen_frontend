import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import {useDatasetImages} from "../../../../../../api/app/datasets.ts";
import {Link, useParams} from "react-router";
import {BsStars} from "react-icons/bs";
import {useFilters, withFilters} from "../../../../../../component_library/formik/FormikFilters.tsx";
import DatasetImageCard from "../../../../../../business_components/DatasetImageCard.tsx";
import DatasetImageOptionMenu from "./components/DatasetImageOptionMenu.tsx";
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

    return (
        <FetchLayout status={status} >
            <div className="w-full flex justify-between gap-4 py-4">
                <div className="w-full max-w-[600px]">
                    <FormikPagination size="sm" colorSchema="secondary" name="page" paginationProps={{
                        count: data?.count ?? 0,
                        siblingCount: 1,
                        pageSize: data?.page_size ?? 0
                    }}></FormikPagination>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5  gap-4">
            {
                data?.results.map((image) => (
                    <DatasetImageOptionMenu key={image.id} image={image}>
                        <Link to={`/app/datasets/${dataset_id}/job/${image.job}/image/${image.id}/`}>
                            <DatasetImageCard image={image}></DatasetImageCard>
                        </Link>
                    </DatasetImageOptionMenu>
                ))
            }
            </div>
        </FetchLayout>
    )
        ;
}

const DatasetDataPageWithFilters = withFilters<{ page: number, }>(DatasetDataPage, {page: 1, page_size: 12});
export default DatasetDataPageWithFilters