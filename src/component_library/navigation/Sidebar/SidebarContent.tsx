import React from 'react';
import {sidebarWrapperStyle} from "./Sidebar.styles.ts";
import {StyleSystemProps} from "../../types.ts";


interface Props extends StyleSystemProps{
    children : React.ReactNode
    reduced?: boolean
}

function SidebarContent({children, size, colorSchema, reduced}: Props) {
    return (
        <section className={sidebarWrapperStyle({size, colorSchema, reduced})}>
            {children}
        </section>
    );
}

export default SidebarContent;