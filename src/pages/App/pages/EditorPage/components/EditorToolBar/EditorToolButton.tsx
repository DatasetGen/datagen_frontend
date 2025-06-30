import {useEditorCanvasStore} from "../../core/core.ts";
import { useNavigate, useParams } from 'react-router';
import {useDatasetLabels} from "../../../../../../api/app/datasets.ts";
import {Popover, usePopover} from "@ark-ui/react/popover";
import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import Paragraph from "../../../../../../component_library/texts/Paragraph.tsx";
import FormikButton from "../../../../../../component_library/formik/FormikButton.tsx";
import {ReactNode} from "react";
import {DatasetLabel} from "../../../../../../types";
import {EditorTool} from "../../core/EditorCanvas.ts";
import {Formik} from "formik";
import {FormikSelect} from "../../../../../../component_library/formik/FormikInputs.tsx";
import EmptyStatus from '../../../../../../assets/emptyLabels.png'

export default function EditorToolButton({tool, toolName, children, title} : {
    toolName: string,
    tool: (label: DatasetLabel) => EditorTool,
    children : ReactNode,
    title: string
}
){
    const { currentTool, canvasInstance } = useEditorCanvasStore()
    const {dataset_id} = useParams()
    const navigate = useNavigate()
    const {data} = useDatasetLabels(parseInt(dataset_id ?? ""))()
    const popover = usePopover({
        positioning: {
            placement:"right-start"
        },
    })

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
                        {
                            (data?.results?.length ?? 0) > 0 ?
                              <Formik initialValues={{label:data?.results[0]?.id.toString()}} onSubmit={(formData, helpers) => {
                                  const label= data?.results.find(x=> x.id === parseInt(formData?.label ?? "")) ?? undefined
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
                              :
                              <div className="flex flex-col items-center gap-2">
                                    <img className="w-[170px]" src={EmptyStatus}/>
                                    <p className="font-semibold text-gray-600 text-xs text-center">
                                        First configure dataset labels
                                    </p>
                                    <div
                                        onClick={() => {navigate(`/app/datasets/${dataset_id}/dataset_configuration`)}}
                                      className="mb-2 mt-1 cursor-pointer bg-brand_primary-500 text-white text-xs p-1 px-2 rounded-lg flex justify-center items-center font-semibold w-fit">
                                      Configuration
                                    </div>
                              </div>
                        }
                    </Popover.Content>
            </Popover.Positioner>
        </Popover.RootProvider>
    )
}
