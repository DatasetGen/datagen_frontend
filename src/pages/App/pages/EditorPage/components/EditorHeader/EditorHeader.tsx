import FormIconButton from "../../../../../../component_library/forms/FormIconButton.tsx";
import {MdArrowBack} from "react-icons/md";
import {useNavigate, useParams} from "react-router";
import {
    BiCheck,
    BiSave
} from "react-icons/bi";
import {useEditorCanvasStore} from "../../core/core.ts";
import {
    useDatasetImage,
    useModifyDatasetImage,
    useSaveAnnotations
} from "../../../../../../api/app/datasets.ts";
import {toast} from "react-toastify";
import Form from "../../../../../../component_library/formik/FormikForm.tsx";
import FormikButton from "../../../../../../component_library/formik/FormikButton.tsx";
import {queryClient} from "../../../../../../api/client.ts";
import FetchLayout from "../../../../../../component_library/layouts/FetchLayout";
import EditorHeaderJob from './EditorHeaderJob.tsx';

function EditorHeader() {
    const navigate = useNavigate()
    const {annotations, canvasInstance} = useEditorCanvasStore()
    const {image_id, dataset_id, job_id} = useParams()
    const imageId = parseInt(image_id??"")
    const {data: image, status: datasetImageStatus} = useDatasetImage(parseInt(dataset_id ?? ""),imageId)({}, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 0,
        refetchOnMount: false
    })
    const { mutateAsync } = useSaveAnnotations(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))({
        onSuccess: () => {
            toast.success("Annotations Saved")
        }
    })
    const {mutateAsync : modifyDatasetImage, } = useModifyDatasetImage(parseInt(dataset_id ?? ""), parseInt(image_id ?? ""))({
        onSuccess: async (data) => {
              await mutateAsync(canvasInstance?.exportAnnotations(annotations))
              await queryClient.invalidateQueries({
                  queryKey: ["datasets", parseInt(dataset_id ?? ""), "images", parseInt(image_id ?? "")]
              })
        }
    });

    return (
        <FetchLayout statusArray={[datasetImageStatus,]}>
            <div
                className="absolute border-b-2 border-gray-200 w-full bg-white flex gap-3 items-center p-3 z-30 justify-between">
                <div className="flex items-center gap-3">
                    <FormIconButton size="md" rounded colorSchema="primary" onClick={() => {
                        navigate(-1)
                    }}>
                        <MdArrowBack></MdArrowBack>
                    </FormIconButton>
                    <div>
                        <h1 className="font-semibold text-sm text-gray-600">
                            {image?.name.slice(0, 20)}
                        </h1>
                        <h2 className="font-semibold text-xs text-gray-400 flex items-center gap-1">
                            <div>
                            {
                                image?.total_weight
                            }
                            </div>
                        </h2>
                    </div>
                </div>
                {
                    image?.job && <EditorHeaderJob></EditorHeaderJob>
                }
                <div className="flex items-center gap-2">
                    {
                      image?.job &&
                      <div className="w-full max-w-[160px]">
                          <Form initialValues={{}} onSubmit={async () => {
                              await modifyDatasetImage({
                                  done: !image?.done
                              })
                          }}>
                              <FormikButton success={image?.done} colorSchema="primary" size="md">
                                  <BiCheck size={15}></BiCheck>
                                  <span className="text-nowrap">
                                {
                                    image?.done ?
                                      "Un done"
                                      :
                                      "Mark as done"
                                }
                                </span>
                              </FormikButton>
                          </Form>
                      </div>
                    }
                    <div className="w-full max-w-[130px]">
                        <Form initialValues={{}} onSubmit={async () => {
                            const json = canvasInstance?.exportAnnotations(annotations)
                            await mutateAsync(json)
                        }}>
                            <FormikButton colorSchema="brand_primary" size="md">
                                <BiSave size={17}></BiSave>
                                Guardar
                            </FormikButton>
                        </Form>
                    </div>
                </div>
            </div>
        </FetchLayout>
    );
}

export default EditorHeader;