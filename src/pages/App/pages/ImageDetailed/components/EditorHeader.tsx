import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {MdArrowBack} from "react-icons/md";
import {useNavigate, useParams} from "react-router";
import Button from "../../../../../component_library/forms/Button.tsx";
import {BiSave} from "react-icons/bi";
import {useEditorCanvasStore} from "../core/core.ts";
import {useSaveAnnotations} from "../../../../../api/app/datasets.ts";
import {toast} from "react-toastify";
import Form from "../../../../../component_library/formik/FormikForm.tsx";
import FormikButton from "../../../../../component_library/formik/FormikButton.tsx";

function EditorHeader() {
    const navigate = useNavigate()
    const {annotations, canvasInstance} = useEditorCanvasStore()
    const {image_id, dataset_id} = useParams()
    console.log(image_id, dataset_id)
    const { mutateAsync } = useSaveAnnotations(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))({
    onSuccess: () => {
        toast.success("Annotations Saved")
    }
    })

    return (
        <div className="absolute border-b-2 border-gray-200 w-full bg-white flex gap-3 items-center p-3 z-30 justify-between">
            <div className="flex items-center gap-3">
                <FormIconButton size="lg" rounded colorSchema="primary" onClick={() => navigate(-1)}>
                    <MdArrowBack></MdArrowBack>
                </FormIconButton>
                <h1 className="font-semibold text-lg text-gray-600">
                    Image editor
                </h1>
            </div>
            <div className="w-full max-w-[130px]">
                <Form initialValues={{}} onSubmit={ async () => {
                    const json = canvasInstance?.exportAnnotations(annotations)
                    await mutateAsync(json)
                }}>
                    <FormikButton colorSchema="brand_primary" size="lg">
                        <BiSave size={20}></BiSave>
                        Guardar
                    </FormikButton>
                </Form>
            </div>
        </div>
    );
}

export default EditorHeader;