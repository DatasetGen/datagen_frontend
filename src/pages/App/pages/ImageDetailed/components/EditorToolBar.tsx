import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {
    BiFullscreen,
    BiMove,
    BiPointer,
    BiShapePolygon,
    BiSquare,
} from "react-icons/bi";
import {BsStars} from "react-icons/bs";
import {useEditorCanvasStore} from "../core/core.ts";
import {ReactNode} from "react";
import {Popover, usePopover} from '@ark-ui/react/popover'
import Paragraph from "../../../../../component_library/texts/Paragraph.tsx";
import Form from "../../../../../component_library/formik/FormikForm.tsx";
import {FormikInput, FormikSelect} from "../../../../../component_library/formik/FormikInputs.tsx";
import {useDatasetLabels} from "../../../../../api/app/datasets.ts";
import {useParams} from "react-router";
import FormikButton from "../../../../../component_library/formik/FormikButton.tsx";

/*
 */

interface Props{
    toolName: string,
    children : ReactNode
}

function EditorIconButton({toolName, children} : Props){
    const { currentTool, canvasInstance } = useEditorCanvasStore()
    return (<FormIconButton size="md" colorSchema={currentTool == toolName ? "brand_primary" : "secondary"} onClick={() => {
        canvasInstance?.selectTool(toolName)
    }}>
            {
                children
            }
    </FormIconButton>
    )
}

function EditorToolButton({toolName, children, title} : Props & {title: string}){
    const { currentTool, currentLabel, canvasInstance, setLabel } = useEditorCanvasStore()
    const {dataset_id} = useParams()
    const {data, status} = useDatasetLabels(parseInt(dataset_id ?? ""))()
    const popover = usePopover({
    positioning: {
        placement:"right-start"
    }
    })
    if(status =="pending" || !data?.results) return<div>loading...</div>

    return (

        <Popover.RootProvider value={popover}>
            <Popover.Trigger asChild>
                <FormIconButton size="md" colorSchema={currentTool == toolName ? "brand_primary" : "secondary"}>
                    {
                        children
                    }
                </FormIconButton>
            </Popover.Trigger>
            <Popover.Positioner>
                <Form initialValues={{label:data.results[0].id.toString()}} onSubmit={(formData, helpers) => {
                    console.log(formData.label)
                    const label= data?.results.find(x=> x.id === parseInt(formData.label)) ?? undefined
                    console.log(label)
                    if(label) {
                        setLabel(label)
                        console.log(currentLabel)
                        canvasInstance?.selectTool(toolName)
                    }

                    helpers.setSubmitting(false)
                    popover.setOpen(false)
                }}>
                    <Popover.Content className="bg-white p-3 rounded-lg min-w-[200px]">
                        <Paragraph size="sm">
                            <span className="font-semibold">
                                {title}
                            </span>
                        </Paragraph>
                        <div className="mt-3 grid gap-2">
                            <FormikSelect options={data?.results.map(x => ({value: x.id, label: x.name }))}
                                          name="label" size="sm"></FormikSelect>
                            <FormikButton size="sm">
                                Shape
                            </FormikButton>
                        </div>
                    </Popover.Content>
                </Form>
            </Popover.Positioner>
        </Popover.RootProvider>
    )
}



function EditorToolBar() {

    const {canvasInstance, currentTool} = useEditorCanvasStore()

    return (
        <div id="tool-menu"
             className="z-20 flex flex-col gap-1 absolute left-0 top-1/2 transform -translate-y-1/2 p-1 m-2 bg-white rounded-xl">
            <EditorIconButton toolName="cursor">
                <BiPointer></BiPointer>
            </EditorIconButton>
            <EditorIconButton toolName="move">
                <BiMove></BiMove>
            </EditorIconButton>
            <FormIconButton size="md" colorSchema="secondary" onClick={() => canvasInstance?.fit()}>
                <BiFullscreen></BiFullscreen>
            </FormIconButton>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <EditorToolButton toolName="bounding_box" title="Draw a box">
                <BiSquare></BiSquare>
            </EditorToolButton>
            <EditorToolButton toolName="polygon" title="Draw a polygon">
                <BiShapePolygon></BiShapePolygon>
            </EditorToolButton>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <FormIconButton size="md" colorSchema="secondary" >
                <BsStars></BsStars>
            </FormIconButton>
        </div>
    );
}

export default EditorToolBar;