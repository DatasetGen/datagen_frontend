import React from 'react';
import { StyleSystemProps } from "../../types.ts";
import {baseStyle, innerElementStyle} from "./Sidebar.styles.ts";
import {useNavigate} from "react-router";

interface SidebarElement {
    path?: string;
    label?: string;
    pathname: string;
    title?: string;
    icon?: React.ReactNode;
    isBottom?: boolean;
    customComponent?: (props: SidebarProps) => React.ReactNode
}

interface SidebarProps extends StyleSystemProps {
    reduced?:boolean;
    title?: React.ReactNode;
    elements: SidebarElement[];
}

function Sidebar({reduced, ...props}: SidebarProps) {
    const navigate = useNavigate()
    const {size, colorSchema, title, elements} = props
    const {base,} = baseStyle({size, colorSchema, reduced})

    const renderElements = (filterCondition: (el: SidebarElement) => boolean) =>
        elements
            .filter(el => filterCondition(el))
            .map(el => (
                (
                    el.customComponent
                        ?
                        el.customComponent(props)
                        :
                      <>
                        {
                          el.title &&
                          <p className="text-xs">
                            {el.title}
                          </p>
                        }
                        <div
                            onClick={() => navigate(el?.path ?? "")}
                            key={el.path}
                            className={innerElementStyle({colorSchema, isActive: location.pathname.includes(el.pathname ?? ""), reduced: reduced})}
                        >
                            <div className="icon">{el.icon}</div>
                            {!reduced && el.label}
                        </div>
                      </>
                )
            ));

    return (
        <nav className={base()}>
            <div className="flex flex-col">
                {title}
                <div className="flex flex-col gap-3">{renderElements(el => !el.isBottom)}</div>
            </div>
            <div className="flex flex-col gap-3">{renderElements(el => el.isBottom === true)}</div>
        </nav>
    );
}

export default Sidebar;
