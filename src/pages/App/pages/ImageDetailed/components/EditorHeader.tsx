import FormIconButton from "../../../../../component_library/forms/FormIconButton.tsx";
import {MdArrowBack} from "react-icons/md";
import {useNavigate} from "react-router";

function EditorHeader() {
    const navigate = useNavigate()
    return (
        <div className="absolute border-b-2 border-gray-200 w-full bg-white flex gap-3 items-center p-3 z-30">
            <FormIconButton size="lg" rounded colorSchema="primary" onClick={() => navigate(-1)}>
                <MdArrowBack></MdArrowBack>
            </FormIconButton>
            <h1 className="font-semibold text-lg text-gray-600">
                Image editor
            </h1>
        </div>
    );
}

export default EditorHeader;