import React, { RefObject, useEffect, useRef} from 'react';
import * as fabric from "fabric";
import {EditorCanvas} from "../pages/App/pages/EditorPage/core/EditorCanvas.ts";
import {DatasetImage} from "../types";

interface Props{
    parentRef: RefObject<HTMLDivElement>
    image: DatasetImage
}

function PreviewImage({parentRef, image}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        if (!parentRef.current || !canvasRef.current) return;
        const initializeCanvas = async () => {
            if (!parentRef.current || !canvasRef.current) return;
            const canvasElement = canvasRef.current;
            const parent = parentRef.current;
            const width = parent.offsetWidth;
            const height = parent.offsetHeight;
            canvasElement.width = width;
            canvasElement.height = height;
            if (fabricCanvasRef.current) fabricCanvasRef.current.dispose();
            const canvas = new EditorCanvas(canvasElement);
            canvas.width = width;
            canvas.height = height;
            fabricCanvasRef.current = canvas;
            const img = await fabric.Image.fromURL(image.image, { crossOrigin: "anonymous" });
            const scale = Math.max(width / img.width, height / img.height);
            img.scale(scale);
            canvas.backgroundImage = img;
            //canvas.setDimensions({ width, height });
            canvas.width = width;
            canvas.height = height
            canvas.renderAll()
            image.annotations.forEach((annotation) => {
                canvas.addAnnotation(annotation)
            })
            canvas.canEditElements = false;
            canvas.defaultCursor="pointer"
        };

        initializeCanvas();

        // Usamos ResizeObserver para detectar cambios en el tamaño del contenedor
        const resizeObserver = new ResizeObserver(() => {
            initializeCanvas();
        });

        resizeObserver.observe(parentRef.current);

        return () => {
            resizeObserver.disconnect();
            fabricCanvasRef.current?.dispose();
        };
    }, [image]);

    return (
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
    );
}

export default PreviewImage;