import React from 'react';
import {sidebarWrapperStyle} from "./Sidebar.styles.ts";
import {StyleSystemProps} from "../../types.ts";


interface Props extends StyleSystemProps{
    children : React.ReactNode
}

function SidebarContent({children, size, colorSchema}: Props) {
    return (
        <section className={sidebarWrapperStyle({size, colorSchema})}>
            {children}
        </section>
    );
}

export default SidebarContent;