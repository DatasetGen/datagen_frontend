import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import {useDatasetImages} from "../../../../../../api/app/datasets.ts";
import { Link, useNavigate, useParams } from 'react-router';
import {BsStars} from "react-icons/bs";
import {useFilters, withFilters} from "../../../../../../component_library/formik/FormikFilters.tsx";
import DatasetImageCard from "../../../../../../business_components/DatasetImageCard.tsx";
import DatasetImageOptionMenu from "./components/DatasetImageOptionMenu.tsx";
import {FormikPagination} from "../../../../../../component_library/formik/FormikPagination.tsx";
import EmptyImage from '../../../../../../assets/datasetsEmpty.png';
import Title from '../../../../../../component_library/texts/Title.tsx';
import Paragraph from '../../../../../../component_library/texts/Paragraph.tsx';
import { BiUser } from 'react-icons/bi';
import Button from '../../../../../../component_library/forms/Button.tsx';

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

function DataEmpty(){
    const {dataset_id} = useParams()
    const navigate = useNavigate()
    return <div className="w-full flex flex-col items-center justify-center gap-3">
        <img className="max-w-[400px] mb-[-60px]" src={EmptyImage}/>
        <Title size="md" colorSchema="primary">You don't images yet</Title>
        <Paragraph size="sm" colorSchema="secondary">Go to labeling page and start uploading images</Paragraph>
        <div className="max-w-[300px] mt-3">
        <Button onClick={() => navigate(`/app/datasets/${dataset_id}/dataset_jobs`)}>
            Labeling page
        </Button>
        </div>
    </div>
}



function DatasetDataPage() {

    const {dataset_id} = useParams()
    const filters = useFilters<{page:string}>()
    const {data, status} = useDatasetImages(parseInt(dataset_id ?? ""))(filters)

    return (
      <>
            <div className="w-full flex justify-between gap-4 py-4">
                <div className="w-full max-w-[600px]">
                    <FormikPagination size="sm" colorSchema="secondary" name="page" paginationProps={{
                        count: data?.count ?? 0,
                        siblingCount: 1,
                        pageSize: data?.page_size ?? 0
                    }}></FormikPagination>
                </div>
            </div>
        <FetchLayout status={status}  isEmpty={(data?.results.length ?? 0) < 1} emptyComponent={<DataEmpty/>}>
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
      </>
    )
        ;
}

const DatasetDataPageWithFilters = withFilters<{ page: number, }>(DatasetDataPage, {page: 1, page_size: 12});
export default DatasetDataPageWithFilters