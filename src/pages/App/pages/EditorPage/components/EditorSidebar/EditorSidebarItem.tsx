import { BiKey, BiLock, BiLockOpen, BiShapePolygon, BiSquare, BiTrash, BiZoomIn } from 'react-icons/bi';
import { useEditorCanvasStore } from "../../core/core";
import {useParams} from "react-router";
import {useDatasetLabels} from "../../../../../../api/app/datasets.ts";
import FormSelect from "../../../../../../component_library/forms/FormSelect.tsx";
import OptionMenu from "../../../../../../component_library/utils/OptionMenu.tsx";
import {BsStars} from "react-icons/bs";
import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import Dialog from "../../../../../../component_library/dialogs/Dialog.tsx";
import {useDialog} from "@ark-ui/react";
import Form from "../../../../../../component_library/formik/FormikForm.tsx";
import FormTextArea from "../../../../../../component_library/forms/FormTextarea.tsx";
import FormInput from "../../../../../../component_library/forms/FormInput.tsx";
import * as dg from "@ark-ui/react/dialog";
import Button from "../../../../../../component_library/forms/Button.tsx";
import FormikButton from "../../../../../../component_library/formik/FormikButton.tsx";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import { Annotation } from '../../core/annotators/types.ts';
import { useState } from 'react';

const icon = {
    "bounding_box": {
        "icon": <BiSquare/>,
        "name":"Bounding Box"
    } ,
    "polygon": {
        "icon": <BiShapePolygon></BiShapePolygon>,
        "name": "Shape Polygon"
    }
}

export default function EditorSidebarElement({annotation}: {annotation: Annotation}) {

    const {canvasInstance, deleteAnnotation, changeAnnotationLabel} = useEditorCanvasStore()
    const {dataset_id} = useParams()
    const {data, status} = useDatasetLabels(parseInt(dataset_id ?? ""))()
    const [lock, setLock] = useState(false)
    const dialog = useDialog();
    const currLabel = data?.results.find(x => x.id == annotation.label)


    return (
        <FetchLayout status={status}>
            <Dialog size="lg" dialog={dialog} title="Generar o sustituir objeto">
                <Form  initialValues={{prompt: "", negative_prompt: ""}} onSubmit={() => {
                }} className="grid gap-3">
                    <FormTextArea placeholder="Describe que quieres que aparezca en la imágen" name="prompt" label="Prompt"></FormTextArea>
                    <FormInput placeholder="Describe que es lo que no quieres que aparezca en la imágen" name="negative_prompt" label="Negative Prompt"></FormInput>
                    <div className="w-full justify-center flex  gap-3 mt-4 mx-auto">
                        <dg.DialogCloseTrigger asChild>
                            <Button size="md" colorSchema="primary">Cancel</Button>
                        </dg.DialogCloseTrigger>
                        <FormikButton size="md">Create</FormikButton>
                    </div>
                </Form>
            </Dialog>
            <div
                onMouseEnter={() => {
                    canvasInstance?.setActiveObject(annotation.object)
                    canvasInstance?.renderAll()
                }}
                className="p-4 rounded-xl bg-gray-100 cusror-pointer hover:shadow-lg"
                style={{borderWidth: 2, borderColor: currLabel?.color}}>
            <div className="flex gap-2 items-center font-semibold text-sm text-gray-700 cursor-pointer">
                    {
                        icon[annotation.type]["icon"]
                    }
                    <p>
                        {
                            icon[annotation.type]["name"]
                        }
                    </p>
                </div>
                <div className="mt-3 grid gap-2">
                    <FormSelect onChange={(e) => {
                        const label = data?.results.find(x => x.id == e.target!.value)
                        if(!label) return;
                        changeAnnotationLabel(label, annotation)
                    }} size="sm" colorSchema="secondary" defaultValue={currLabel?.id} options={data?.results.map(x => ({label: x.name, value: x.id}))}></FormSelect>
                    <div className="flex justify-between gap-2">
                        <OptionMenu size="sm" items={[{
                            icon: <BsStars></BsStars>,
                            title: "Sustituir objeto",
                            callback: () => {
                                dialog.setOpen(true)
                            }
                        },
                        {
                            icon: <BsStars></BsStars>,
                            title: "Generar nuevo objeto",
                            callback: () => {
                                dialog.setOpen(true)
                            }
                        }

                        ]}>
                            <FormIconButton colorSchema="secondary">
                                <BsStars></BsStars>
                            </FormIconButton>
                        </OptionMenu>
                        <div className="flex gap-2">
                            <FormIconButton colorSchema="secondary" onClick={() => {
                                canvasInstance?.centerObject(annotation.object)
                            }}>
                                <BiZoomIn></BiZoomIn>
                            </FormIconButton>
                            <FormIconButton colorSchema="secondary" onClick={() => {
                                if(!lock) {
                                    annotation.object.selectable= false
                                    annotation.object.evented=false
                                }else {
                                    annotation.object.selectable= true;
                                    annotation.object.evented=true;
                                }
                                setLock(!lock)
                            }}>
                                {
                                    lock?
                                        <BiLock></BiLock>
                                    :
                                      <BiLockOpen></BiLockOpen>
                                }
                            </FormIconButton>
                            <FormIconButton colorSchema="secondary" onClick={() => deleteAnnotation(annotation.id)}>
                                <BiTrash></BiTrash>
                            </FormIconButton>
                        </div>
                    </div>
                </div>
                <div className="text-[8px] mt-3 font-semibold text-gray-700 bg-gray-200 p-1 px-2 rounded-xl w-fit flex items-center gap-1 border-[1px] border-solid border-gray-300">
                    <BiKey></BiKey>
                    {annotation.id}
                </div>
            </div>
        </FetchLayout>
    )

}
