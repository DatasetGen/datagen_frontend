import React, { useEffect, useRef, useState } from 'react';
import { DatasetImage } from "../../../../../types";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import * as fabric from 'fabric'

function ImageEditor({ data, image }: { data: DatasetImage, image: HTMLImageElement}) {
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
    const [disableTransform, setDisableTransform] = useState(false);

    useEffect(() => {
        if(fabricCanvasRef.current == null){
            fabricCanvasRef.current = new fabric.Canvas("principal_canvas", {
                selection: false
            });
            const canvas = fabricCanvasRef.current;
            const imgInstance = new fabric.Image(image, {
                scaleX: canvas.width / image.width,
                scaleY: canvas.height / image.height
            });
            canvas.backgroundImage = imgInstance


            const rect = new fabric.Rect({
                left: 0,
                top: 0,
                stroke: "red",
                strokeWidth: 2,
                fill: 'rgba(255, 0, 0, 0.0)',
                width: 300,
                strokeUniform: true,
                noScaleCache: true,
                height: 300,
            });
            rect.on("mouseover", (e) => {
                console.log(e)
                rect.set({
                    fill: 'rgba(255, 0, 0, 0.4)',
                })
                canvas.renderAll()
            })
            rect.on("mouseout", (e) => {
                console.log(e)
                rect.set({
                    fill: 'rgba(255, 0, 0, 0.0)',
                })
                canvas.renderAll()
            })
            canvas.add(rect);
            canvas.on("mouse:down", (e) => {
                if(e.target) setDisableTransform(true)
            });
            canvas.on("mouse:up", () => {
                setDisableTransform(false)
            });
        }
    }, []);

    const handleZoom = ({ scale }: { scale: number }) => {
        const canvas = fabricCanvasRef.current;
        if (canvas) {
            canvas.setZoom(scale)
        }
    };



    return (
        <div className="w-full h-[100vh]">
            <TransformWrapper
                initialScale={1}
                centerOnInit={true}
                minScale={0.3}
                limitToBounds={false}
                maxScale={10}
                wheel={{ step: 0.1 }}
                panning={{
                    velocityDisabled: true
                }}
                onPanning={(e) => {
                    console.log("hwllo world")
                }}
                onZoom={(e) => {
                    console.log("good bye word")
                }}
                disabled={true}
            >
                <TransformComponent
                    wrapperStyle={{width: '100%', height: '100%'}}

                >
                    {
                        /*
                    <canvas id="principal_canvas"
                        width={image.width/image.height  * (window.innerHeight - 200)}
                        height={window.innerHeight - 200}
                    />
                         */
                    }
                    <canvas id="principal_canvas"
                            width={window.innerWidth}
                            height={window.innerHeight}
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}

export default ImageEditor;
