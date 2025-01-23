import React from 'react';
import { StyleSystemProps } from "../../types.ts";
import {baseStyle, innerElementStyle} from "./Sidebar.styles.ts";
import {useNavigate} from "react-router";

interface SidebarElement {
    path?: string;
    label?: string;
    icon?: React.ReactNode;
    isBottom?: boolean;
    customComponent?: (props: SidebarProps) => React.ReactNode
}

interface SidebarProps extends StyleSystemProps {
    logoImg?: string;
    elements: SidebarElement[];
}

function Sidebar(props: SidebarProps) {
    const navigate = useNavigate()
    const {size, colorSchema, logoImg, elements} = props
    const {base, logo} = baseStyle({size, colorSchema})

    const renderElements = (filterCondition: (el: SidebarElement) => boolean) =>
        elements
            .filter(el => filterCondition(el))
            .map(el => (
                (
                    el.customComponent
                        ?
                        el.customComponent(props)
                        :
                        <div
                            onClick={() => navigate(el?.path ?? "")}
                            key={el.path}
                            className={innerElementStyle({colorSchema, isActive: location.pathname.includes(el.path ?? "")})}
                        >
                            <div className="text-xl">{el.icon}</div>
                            {el.label}
                        </div>
                )
            ));

    return (
        <nav className={base()}>
            <div className="flex flex-col gap-10">
                {logoImg && <img className={logo()} src={logoImg} alt="Logo"/>}
                <div className="flex flex-col gap-3">{renderElements(el => !el.isBottom)}</div>
            </div>
            <div className="flex flex-col gap-3">{renderElements(el => el.isBottom === true)}</div>
        </nav>
    );
}

export default Sidebar;
