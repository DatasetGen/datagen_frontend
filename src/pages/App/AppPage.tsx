import {Outlet} from "react-router";
import {Sidebar} from "../../component_library/navigation/Sidebar";
import {BiBot, BiCog, BiData, BiHome} from "react-icons/bi";
import Logo from '../../assets/datagenLogo.png'

const elements = [
    {
        label : "Home",
        icon : <BiHome></BiHome>,
        path: "home"
    },
    {
        label : "Datasets",
        icon : <BiData></BiData>,
        path: "datasets"
    },
    {
        label : "Models",
        icon : <BiBot></BiBot>,
        path: "models"
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
            <Sidebar.Bar colorSchema="brand_secondary" logoImg={Logo} elements={elements}></Sidebar.Bar>
            <Sidebar.Content>
                <Outlet></Outlet>
            </Sidebar.Content>
        </Sidebar.Wrapper>
    );
}

export default AppPage;