import React, {useEffect, useRef, useState} from 'react';
import FormIconButton from "../../../../component_library/forms/FormIconButton.tsx";
import {MdArrowBack, MdArrowLeft} from "react-icons/md";
import {useNavigate, useParams} from "react-router";
import { useDatasetImage } from "../../../../api/app/datasets.ts";
import ImageEditor from "./components/ImageEditor.tsx";

import { create } from 'zustand'
import {
    BiFullscreen,
    BiMouse,
    BiMove,
    BiPointer,
    BiPolygon,
    BiRotateLeft,
    BiScreenshot, BiShapePolygon,
    BiSquare, BiZoomIn, BiZoomOut
} from "react-icons/bi";
import Title from "../../../../component_library/texts/Title.tsx";

const useEditorStore = create((set) => ({
    canvas: {
        top: 0,
        left: 0
    }
}))

function ImageDetailedPage() {

    const {dataset_id, image_id} = useParams();
    const {data, status} = useDatasetImage(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))();
    const navigate = useNavigate()
    const [imageLoaded, setImageLoaded] = useState(false);
    const image = new Image();
    image.src = data?.image;

    useEffect(() => {
        image.onload = () => setImageLoaded(true);
    }, [image]);

    if(status !== "success") return<div>loading</div>

    return (
        <div className="h-[100vh] bg-gray-200">
            <div className="absolute border-b-2 border-gray-200 w-full bg-white flex gap-3 items-center p-3 z-20">
                <FormIconButton size="lg" rounded colorSchema="primary" onClick={() => navigate(-1)}>
                    <MdArrowBack></MdArrowBack>
                </FormIconButton>
                <h1 className="font-semibold text-lg text-gray-600">
                    Image editor
                </h1>
            </div>
            <div className="absolute h-[100vh] right-0 w-[260px] bg-white pt-[65px]">
                <div className="p-4">
                    <Title>
                        Labels
                    </Title>
                </div>
            </div>
            <div className="mr-[260px] relative">
                <div id="tool-menu"
                     className="z-20 flex flex-col gap-1 absolute right-0 bottom-0 transform  p-1 m-2 bg-white rounded-xl">
                    <FormIconButton size="md" colorSchema="secondary">
                        <BiZoomIn></BiZoomIn>
                    </FormIconButton>
                    <FormIconButton size="md" colorSchema="secondary">
                        <BiZoomOut></BiZoomOut>
                    </FormIconButton>
                </div>
                <div id="tool-menu"
                     className="z-20 flex flex-col gap-1 absolute left-0 top-1/2 transform -translate-y-1/2 p-1 m-2 bg-white rounded-xl">
                    <FormIconButton size="md">
                        <BiPointer></BiPointer>
                    </FormIconButton>
                    <FormIconButton size="md" colorSchema="secondary">
                        <BiMove></BiMove>
                    </FormIconButton>
                    <FormIconButton size="md" colorSchema="secondary">
                        <BiRotateLeft></BiRotateLeft>
                    </FormIconButton>
                    <FormIconButton size="md" colorSchema="secondary">
                        <BiFullscreen></BiFullscreen>
                    </FormIconButton>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                    <FormIconButton size="md" colorSchema="secondary">
                        <BiSquare></BiSquare>
                    </FormIconButton>
                    <FormIconButton size="md" colorSchema="secondary">
                        <BiShapePolygon></BiShapePolygon>
                    </FormIconButton>
                </div>
                <ImageEditor data={data} image={image}></ImageEditor>
            </div>
        </div>
    );
}

export default ImageDetailedPage;