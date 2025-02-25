import {useParams} from "react-router";
import {useDataset} from "../../../../../../api/app/datasets.ts";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import DatasetHomeStats from "./components/DatasetHomeStats.tsx";
import ImagesPerLabelBarChart from "./components/ImagesPerLabelBarChart.tsx";
import RealVsSyntheticDataPieChart from "./components/RealVsSyntheticDataPieChart.tsx";
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';

function DatasetHomePage() {

    const {dataset_id} = useParams();
    const {data, status} = useDataset(parseInt(dataset_id ?? ""))()

    return (
        <PageLayout status={status} title="Home">
            <div className="grid gap-4">
                <DatasetHomeStats data={data}/>
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <RealVsSyntheticDataPieChart></RealVsSyntheticDataPieChart>
                    </div>
                    <div className="col-span-3">
                        <ImagesPerLabelBarChart></ImagesPerLabelBarChart>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default DatasetHomePage;