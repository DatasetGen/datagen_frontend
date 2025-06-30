import React from 'react';

interface Props{
    children : React.ReactNode
}

function SidebarWrapper(props: Props) {
    return (
        props.children
    );
}

export default SidebarWrapper;