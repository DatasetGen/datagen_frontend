import {FileUpload, UseFileUploadReturn} from '@ark-ui/react/file-upload'
import {BiFile, BiTrash} from "react-icons/bi";
import {FormContainerProps} from "./FormContainer.tsx";
import FormIconButton from "./FormIconButton.tsx";

interface Props extends FormContainerProps<HTMLInputElement>{
    fileField: UseFileUploadReturn
}

const FormFileField = ({label, fileField} : Props) => {
    return (
        <FileUpload.RootProvider className="grid gap-2" value={fileField}>
            {
                label && <FileUpload.Label className="font-semibold text-gray-600 text-sm">{label}</FileUpload.Label>
            }
            <FileUpload.Dropzone className="w-full h-[200px] bg-gray-100 border-2 border-dashed border-gray-200 rounded-xl flex justify-center items-center text-gray-500 font-semibold">
                <div className="flex-col flex items-center gap-2">
                    <BiFile size={30}></BiFile>
                    <p className="text-sm">
                        Drag your file(s) here
                    </p>
                    <FileUpload.Trigger className="bg-brand_primary-500 text-xs text-white font-semibold w-fit p-2 px-4 rounded-xl hover:bg-brand_primary-700">Choose file(s)</FileUpload.Trigger>
                </div>
            </FileUpload.Dropzone>
            <FileUpload.ItemGroup>
                <FileUpload.Context>
                    {({ acceptedFiles }) =>
                      <div className="grid grid-cols-1">
                        {
                        acceptedFiles.map((file) => (
                            <FileUpload.Item key={file.name} file={file} className="justify-between bg-gray-100 p-3 rounded-lg flex items-center gap-3">
                                <div className="flex items-center gap-3 text-xs font-semibold ">
                                    <FileUpload.ItemPreview type="image/*">
                                        <FileUpload.ItemPreviewImage className="min-w-[70px] w-[70px] h-[70px] min-h-[70px] object-cover rounded-lg" />
                                    </FileUpload.ItemPreview>
                                    <FileUpload.ItemPreview type=".*">
                                        <BiFile size={20} className="text-red-500"/>
                                    </FileUpload.ItemPreview>
                                    <FileUpload.ItemName className="text-gray-500 text-sm" />
                                    <FileUpload.ItemSizeText  className="text-xs text-gray-600"/>
                                </div>
                                <FileUpload.ItemDeleteTrigger>
                                    <FormIconButton colorSchema="primary">
                                        <BiTrash ></BiTrash>
                                    </FormIconButton>
                                </FileUpload.ItemDeleteTrigger>
                            </FileUpload.Item>
                        ))
                        }
                      </div>
                    }
                </FileUpload.Context>
            </FileUpload.ItemGroup>
            <FileUpload.HiddenInput />
        </FileUpload.RootProvider>
    )
}

export default FormFileField