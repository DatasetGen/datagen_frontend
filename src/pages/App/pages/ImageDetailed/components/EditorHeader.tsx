import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {MdArrowBack} from "react-icons/md";
import {useNavigate} from "react-router";
import Button from "../../../../../component_library/forms/Button.tsx";
import {BiSave} from "react-icons/bi";

function EditorHeader() {
    const navigate = useNavigate()
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
                <Button colorSchema="brand_primary" size="lg">
                    <BiSave size={20}></BiSave>
                    Guardar
                </Button>
            </div>
        </div>
    );
}

export default EditorHeader;