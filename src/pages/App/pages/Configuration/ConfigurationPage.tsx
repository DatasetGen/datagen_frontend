import { useLogout } from "../../../../api/auth/useLogout.ts";
import FetchLayout from '../../../../component_library/layouts/FetchLayout';
import { Outlet } from 'react-router';
import {
  BiCard,
  BiChart,
  BiCog,
  BiCreditCard,
  BiData, BiGitBranch, BiKey, BiLogoDevTo,
  BiPieChart,
  BiTag,
  BiUpload,
  BiUser,
  BiUserCircle,
} from 'react-icons/bi';
import { RiAiGenerate, RiBardLine, RiTeamFill, RiTeamLine, RiUser3Fill } from 'react-icons/ri';
import { Sidebar } from "../../../../component_library/navigation/Sidebar/index.ts";
import { TbUsers } from 'react-icons/tb';

const elements = [
  {
    title:"ACCOUNT",
    icon: <BiUser/>,
    label: "Profile",
    path: "user_profile",
    pathname: "user_profile"
  },
  {
    icon: <TbUsers></TbUsers>,
    title:"ORGANIZATION",
    label: "Members",
    path : "organization_members",
    pathname: "organization_members"
  },
  {
    icon: <BiCreditCard></BiCreditCard>,
    label: "Plan & Billing",
    path : "organization_billing",
    pathname: "organization_billing"
  },
  {
    icon: <BiPieChart></BiPieChart>,
    label: "Usage",
    path : "organization_usage",
    pathname: "organization_usage"
  },
  {
    icon: <BiKey></BiKey>,
    title:"INTEGRATIONS",
    label: "API keys",
    path: "dataset_configuration",
    pathname: "dataset_configuration"
  },
  {
    icon: <BiGitBranch/>,
    label: "Third party keys",
    path: "dataset_configuration",
    pathname: "dataset_configuration"
  },
]

function ConfigurationPage() {

    const {logOut} = useLogout()

    return (
      <FetchLayout>
        <Sidebar.Wrapper>
          <Sidebar.Bar size="md" colorSchema="primary" elements={elements}
                       title={<div className="flex gap-3 mb-6">
                         <h1 className="text-gray-900 font-semibold text-base">
                           Configuration
                         </h1>
                         <button onClick={() => logOut()}>logout</button>
                       </div>}

          ></Sidebar.Bar>
          <Sidebar.Content size="md">
            <Outlet></Outlet>
          </Sidebar.Content>
        </Sidebar.Wrapper>
      </FetchLayout>
    );
}

export default ConfigurationPage;