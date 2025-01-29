import React from 'react';
import { useParams } from "react-router";
import { useDatasetImage } from "../../../../api/app/datasets.ts";
import Editor from "./components/Editor.tsx";


function ImageDetailedPage() {

    const {dataset_id, image_id} = useParams();
    const {data, status} = useDatasetImage(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))({});


    if(status !== "success") return<div>loading</div>

    return (
        <Editor image={data.image}></Editor>
    );
}

export default ImageDetailedPage;