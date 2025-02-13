import {Outlet} from "react-router";
import {Sidebar} from "../../component_library/navigation/Sidebar";
import { BiCog, BiData} from "react-icons/bi";
import Logo from '../../assets/datagenLogo.png'

const elements = [
    {
        label : "Datasets",
        icon : <BiData></BiData>,
        path: "datasets"
    },
    {
        label : "Configuration",
        icon : <BiCog></BiCog>,
        path: "configuration",
        isBottom: true
    },
]

function AppPage() {
    return (
        <Sidebar.Wrapper>
            <Sidebar.Bar size="sm" colorSchema="brand_secondary" logoImg={Logo} elements={elements}></Sidebar.Bar>
            <Sidebar.Content size="sm">
                <Outlet></Outlet>
            </Sidebar.Content>
        </Sidebar.Wrapper>
    );
}

export default AppPage;