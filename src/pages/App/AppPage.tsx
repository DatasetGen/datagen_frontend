import {Outlet} from "react-router";
import {Sidebar} from "../../component_library/navigation/Sidebar";
import { BiCog, BiData} from "react-icons/bi";
import Logo from '../../assets/datagenLogo.png'
import DataseedLogo from '../../assets/dataseed.png'

const elements = [
    {
        label : "Datasets",
        icon : <BiData></BiData>,
        path: "datasets",
        pathname: "app/datasets"
    },
    {
        label : "Configuration",
        icon : <BiCog></BiCog>,
        path: "configuration",
        isBottom: true,
        pathname: "app/configuration"
    },
]

function AppPage() {
    return (
        <Sidebar.Wrapper>
            <Sidebar.Bar size="sm" reduced colorSchema="primary" title={<img className="mb-3" src={DataseedLogo}/>} elements={elements}></Sidebar.Bar>
            <Sidebar.Content size="sm" reduced>
                <Outlet></Outlet>
            </Sidebar.Content>
        </Sidebar.Wrapper>
    );
}

export default AppPage;