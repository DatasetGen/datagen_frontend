import PageLayout from '../../../../component_library/layouts/PageLayout.tsx';
import { Outlet, useNavigate, useParams } from 'react-router';
import { useDataset } from '../../../../api/app/datasets.ts';
import FetchLayout from '../../../../component_library/layouts/FetchLayout';
import TabNavigation from '../../../../component_library/navigation/Tabs.tsx';
import {
  BiBot,
  BiChart,
  BiCog,
  BiData,
  BiDownload,
  BiExport,
  BiFoodTag,
  BiHome,
  BiLabel,
  BiSave,
  BiStar,
  BiStats,
  BiTag,
  BiUpload,
} from 'react-icons/bi';
import OptionMenu from '../../../../component_library/utils/OptionMenu.tsx';
import FormIconButton from '../../../../component_library/forms/FormIconButton.tsx';
import {
  FaArrowLeft,
  FaChartArea,
  FaChartBar,
  FaChartColumn,
  FaDatabase,
  FaRegFileZipper,
  FaTag,
  FaUpload,
  FaUpLong,
} from 'react-icons/fa6';
import { TbBrandGoogleDrive } from 'react-icons/tb';
import { BsHouse, BsStars } from 'react-icons/bs';
import { FaCog, FaHome } from 'react-icons/fa';
import { Sidebar } from '../../../../component_library/navigation/Sidebar';
import { MdGeneratingTokens } from 'react-icons/md';
import { RiAiGenerate, RiBardLine, RiStarSFill } from 'react-icons/ri';
import BulkFilesMenu from './components/BulkFilesMenu.tsx';

const elements = [
  {
    title: 'GENERAL',
    icon: <BiChart />,
    label: 'Home',
    path: 'dataset_general',
    pathname: 'dataset_general',
  },
  {
    icon: <BiData size={13}></BiData>,
    label: 'Data exploration',
    path: 'dataset_data',
    pathname: 'dataset_data',
  },
  {
    icon: <RiAiGenerate></RiAiGenerate>,
    title: 'DATA FLOW',
    label: 'Generate images',
    path: 'dataset_generation',
    pathname: 'dataset_generation',
  },
  {
    icon: <BiUpload></BiUpload>,
    label: 'Upload images',
    path: 'dataset_upload',
    pathname: 'dataset_upload',
  },
  {
    icon: <RiBardLine></RiBardLine>,
    label: 'Data Workbench',
    path: 'dataset_workbench',
    pathname: 'dataset_workbench',
  },
  {
    icon: <BiTag size={15}></BiTag>,
    label: 'Labeling',
    path: 'dataset_jobs',
    pathname: 'dataset_jobs',
  },
  {
    icon: <BiSave></BiSave>,
    label: 'Snapshots',
    path: 'dataset_snapshots',
    pathname: 'dataset_snapshots',
  },
  {
    icon: <BiCog></BiCog>,
    title: 'SETTINGS',
    label: 'Configuration',
    path: 'dataset_configuration',
    pathname: 'dataset_configuration',
  },
];

function HeaderExtension() {
  return (
    <div className="flex items-center gap-2">
      <OptionMenu
        items={[
          {
            title: 'Export to CVAT',
            icon: <BiData></BiData>,
            callback: () => {},
          },
          {
            title: 'Export to Google Drive',
            icon: <TbBrandGoogleDrive></TbBrandGoogleDrive>,
            callback: () => {},
          },
        ]}
      >
        <FormIconButton colorSchema="primary" size="lg" rounded>
          <BiExport></BiExport>
        </FormIconButton>
      </OptionMenu>
      <OptionMenu
        items={[
          {
            title: 'Download .zip',
            icon: <FaRegFileZipper></FaRegFileZipper>,
            callback: () => {},
          },
        ]}
      >
        <FormIconButton colorSchema="primary" size="lg" rounded>
          <BiDownload></BiDownload>
        </FormIconButton>
      </OptionMenu>
    </div>
  );
}

function DatasetDetailedPage() {
  const { dataset_id } = useParams();
  const { status, data } = useDataset(parseInt(dataset_id ?? ''))();
  const navigate = useNavigate();

  return (
    <FetchLayout status={status}>
      <Sidebar.Wrapper>
        <Sidebar.Bar
          size="md"
          colorSchema="primary"
          elements={elements}
          title={
            <div className="flex gap-3 mb-6">
              <div
                onClick={() => navigate('/app/datasets/')}
                className="min-w-[30px] h-[30px] text-gray-500 cursor-pointer w-[30px] flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <FaArrowLeft></FaArrowLeft>
              </div>
              <h1 className="text-gray-900 font-semibold text-base">
                {data?.name}
              </h1>
            </div>
          }
        ></Sidebar.Bar>
        <Sidebar.Content size="md">
          <BulkFilesMenu></BulkFilesMenu>
          <Outlet></Outlet>
        </Sidebar.Content>
      </Sidebar.Wrapper>
    </FetchLayout>
  );
}

export default DatasetDetailedPage;
