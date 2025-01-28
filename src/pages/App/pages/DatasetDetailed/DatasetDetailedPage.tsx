import PageLayout from "../../../../component_library/layouts/PageLayout.tsx";
import {Outlet, useParams} from "react-router";
import {useDataset} from "../../../../api/app/datasets.ts";
import FetchLayout from "../../../../component_library/layouts/FetchLayout";
import TabNavigation from "../../../../component_library/navigation/Tabs.tsx";
import {BiData, BiDownload, BiExport} from "react-icons/bi";
import OptionMenu from "../../../../component_library/utils/OptionMenu.tsx";
import FormIconButton from "../../../../component_library/forms/FormIconButton.tsx";
import {FaRegFileZipper} from "react-icons/fa6";
import {FaGoogleDrive} from "react-icons/fa6";
import {TbBrandGoogleDrive} from "react-icons/tb";

const elements = [
    {
        name: "Home",
        url: "dataset_general",
        pathname: "dataset_general"
    },
    {
        name: "Data",
        url : "dataset_data",
        pathname: "dataset_data"
    },
    {
        name: "Configuration",
        url: "dataset_configuration",
        pathname: "dataset_configuration"
    },
]

function HeaderExtension(){
    return (
        <div className="flex items-center gap-2">
            <OptionMenu items={[{title:"Export to CVAT", icon: <BiData></BiData>, callback: () => {}},
                {title:"Export to Google Drive", icon: <TbBrandGoogleDrive></TbBrandGoogleDrive>, callback: () => {}}
            ]}>
                <FormIconButton colorSchema="primary" size="lg" rounded>
                    <BiExport></BiExport>
                </FormIconButton>
            </OptionMenu>
            <OptionMenu items={[{title:"Download .zip", icon: <FaRegFileZipper></FaRegFileZipper>, callback: () => {}}]}>
                <FormIconButton colorSchema="primary" size="lg" rounded>
                    <BiDownload></BiDownload>
                </FormIconButton>
            </OptionMenu>
        </div>)
}

function DatasetDetailedPage() {

    const {dataset_id} = useParams();
    const {status, data} = useDataset(parseInt(dataset_id ?? ""))();

    return (
        <FetchLayout status={status}>
            <PageLayout isDetailed size="xl" title={data?.name} backPage="/app/datasets" headerExtension={<HeaderExtension/>}>
                <TabNavigation size="md" elements={elements}></TabNavigation>
                <Outlet></Outlet>
            </PageLayout>
        </FetchLayout>
    );
}

export default DatasetDetailedPage;