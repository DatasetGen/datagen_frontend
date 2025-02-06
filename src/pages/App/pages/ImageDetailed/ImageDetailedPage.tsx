import React, {useEffect} from 'react';
import { useParams } from "react-router";
import {useDatasetImage, useDatasetImageAnnotations} from "../../../../api/app/datasets.ts";
import Editor from "./components/Editor.tsx";


function ImageDetailedPage() {

    const {dataset_id, image_id} = useParams();
    const {data, status, isFetching} = useDatasetImage(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))({}, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
    const {data: annotations, status: annotationsStatus, isFetching: isAnnotationFetching} = useDatasetImageAnnotations(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))({}, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        const listener = (event: BeforeUnloadEvent) => {
                event.preventDefault(); // Necesario en algunos navegadores
                event.returnValue = "¿Estás seguro de que quieres salir? Perderás los datos no guardados.";
            }
            window.addEventListener("beforeunload", listener);
        return () => window.removeEventListener("beforeunload", listener);
    }, []);

    if(isFetching || isAnnotationFetching) return<div>loading</div>

    return (
        <Editor annotations={annotations?.results ?? []} image={data?.image ?? ""}></Editor>
    );
}

export default ImageDetailedPage;