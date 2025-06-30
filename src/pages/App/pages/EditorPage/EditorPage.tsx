import React, {useEffect} from 'react';
import { useParams } from "react-router";
import {useDatasetImage} from "../../../../api/app/datasets.ts";
import Editor from "./components/Editor.tsx";
import FetchLayout from "../../../../component_library/layouts/FetchLayout";


function EditorPage() {

    const {dataset_id, image_id} = useParams();
    const {data, status } = useDatasetImage(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))({}, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
        staleTime:0
    });

    useEffect(() => {
        const listener = (event: BeforeUnloadEvent) => {
                event.preventDefault(); // Necesario en algunos navegadores
                event.returnValue = "¿Estás seguro de que quieres salir? Perderás los datos no guardados.";
            }
            window.addEventListener("beforeunload", listener);
        return () => window.removeEventListener("beforeunload", listener);
    }, []);

    return (
        <FetchLayout status={status}>
            <Editor image={data}></Editor>
        </FetchLayout>
    );
}

export default EditorPage;