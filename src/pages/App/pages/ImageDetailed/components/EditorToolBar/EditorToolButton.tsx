import {useEditorCanvasStore} from "../../core/core.ts";
import {useParams} from "react-router";
import {useDatasetLabels} from "../../../../../../api/app/datasets.ts";
import {Popover, usePopover} from "@ark-ui/react/popover";
import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import Paragraph from "../../../../../../component_library/texts/Paragraph.tsx";
import FormikButton from "../../../../../../component_library/formik/FormikButton.tsx";
import {ReactNode} from "react";
import {DatasetLabel} from "../../../../../../types";
import {EditorTool} from "../../core/EditorCanvas.ts";
import {Formik} from "formik";
import FormSelect from "../../../../../../component_library/forms/FormSelect.tsx";
import {FormikSelect} from "../../../../../../component_library/formik/FormikInputs.tsx";

export default function EditorToolButton({tool, toolName, children, title} : {
    toolName: string,
    tool: (label: DatasetLabel) => EditorTool,
    children : ReactNode,
    title: string
}
){
    const { currentTool, canvasInstance } = useEditorCanvasStore()
    const {dataset_id} = useParams()
    const {data, status, isFetching} = useDatasetLabels(parseInt(dataset_id ?? ""))()
    const popover = usePopover({
        positioning: {
            placement:"right-start"
        },
    })
    if(isFetching) return<div>loading...</div>

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
                    <Popover.Content className="bg-white p-3 rounded-lg min-w-[200px]">
                        <Paragraph size="sm">
                            <span className="font-semibold">
                                {title}
                            </span>
                        </Paragraph>
                        <Formik initialValues={{label:data.results[0].id.toString()}} onSubmit={(formData, helpers) => {
                            const label= data?.results.find(x=> x.id === parseInt(formData.label)) ?? undefined
                            helpers.setSubmitting(false)
                            popover.setOpen(false)
                            if(label) {
                                canvasInstance?.selectTool(tool(label))
                            }
                        }}>
                        <div className="mt-3 grid gap-2">
                            <FormikSelect options={data?.results.map(x => ({value: x.id.toString(), label: x.name }))}
                                          name="label" size="sm"
                            ></FormikSelect>
                            <FormikButton size="sm">
                                Shape
                            </FormikButton>
                        </div>
                        </Formik>
                    </Popover.Content>
            </Popover.Positioner>
        </Popover.RootProvider>
    )
}
