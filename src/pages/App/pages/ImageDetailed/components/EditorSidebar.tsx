import Title from "../../../../../component_library/texts/Title.tsx";
import {Annotation, useEditorCanvasStore} from "../core/core.ts";
import {BiKey, BiLock, BiShapePolygon, BiSquare, BiTrash} from "react-icons/bi";
import FormSelect from "../../../../../component_library/forms/FormSelect.tsx";
import {useDatasetLabels} from "../../../../../api/app/datasets.ts";
import {useParams} from "react-router";
import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {BsStars} from "react-icons/bs";


const icon = {
    "bounding_box": {
        "icon": <BiSquare></BiSquare>,
        "name":"Bounding Box"
    } ,
    "polygon": {
        "icon": <BiShapePolygon></BiShapePolygon>,
        "name": "Shape Polygon"
    }
}

function EditorSidebarElement({annotation}: {annotation: Annotation}) {

    const {canvasInstance, deleteAnnotation} = useEditorCanvasStore()
    const {dataset_id} = useParams()
    const {data, status} = useDatasetLabels(parseInt(dataset_id ?? ""))()

    if(status === "pending") return <div>loading...</div>
    const currLabel = data?.results.find(x => x.id == annotation.label)

    return (
        <div
            onMouseEnter={() =>{
                canvasInstance?.setActiveObject(annotation.object)
                canvasInstance?.renderAll()
            }}
            className="p-4 rounded-xl bg-gray-100 cusror-pointer hover:shadow-lg" style={{borderWidth: 2, borderColor: currLabel?.color}}>
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
                <FormSelect size="sm" colorSchema="secondary" value={currLabel?.id} options={data?.results.map(x => ({label: x.name, value: x.id}))}></FormSelect>
                <div className="flex justify-between gap-2">
                    <FormIconButton colorSchema="secondary">
                        <BsStars></BsStars>
                    </FormIconButton>
                    <div className="flex gap-2">
                        <FormIconButton colorSchema="secondary">
                            <BiLock></BiLock>
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
    )

}

function EditorSidebar() {
    const {annotations} = useEditorCanvasStore()

    return (
        <div className="absolute h-[100vh] right-0 w-[300px] bg-white pt-[65px] z-20 overflow-auto">
            <div className="p-4">
                <Title>
                    Labels
                </Title>
                <div className="grid gap-2 mt-5">
                    {
                        annotations.map(x => (
                            <EditorSidebarElement annotation={x}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EditorSidebar;