import React from 'react';
import DefaultEmptyComponent from "./components/DefaultEmptyComponent.tsx";
import DefaultPendingComponent from "./components/DefaultPendingComponent.tsx";
import DefaultErrorComponent from "./components/DefaultErrorComponent.tsx";
import DefaultEmptySearchComponent from "./components/DefaultEmptySearchComponent.tsx";

interface Props extends React.HTMLProps<HTMLDivElement> {
    children : React.ReactNode
    status ?: ("pending" | "success" | "error"),
    statusArray ?: ("pending" | "success" | "error")[]
    isEmpty?: boolean,
    isEmptySearch?: boolean,
    emptyComponent?: React.ReactNode,
    pendingComponent?: React.ReactNode,
    errorComponent?: React.ReactNode,
    emptySearchComponent?: React.ReactNode,
}

function Index({children, status, isEmpty, statusArray, isEmptySearch,
                   emptyComponent = <DefaultEmptyComponent/>,
                   pendingComponent = <DefaultPendingComponent/>,
                   errorComponent = <DefaultErrorComponent/>,
                    emptySearchComponent = <DefaultEmptySearchComponent/>,
                   ...other} :  Props) {


    
    const finalStatus = status ? [status,] : statusArray
    
    if(finalStatus?.some((x) => x === "pending")) return pendingComponent
    if(finalStatus?.some((x) => x === "error")) return errorComponent
    if(isEmpty) return emptyComponent
    if(isEmptySearch) return emptySearchComponent

    return (
        <div {...other}>
            {
               children
            }
        </div>
    );
}

export default Index;