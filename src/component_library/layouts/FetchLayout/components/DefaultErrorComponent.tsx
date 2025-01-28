import {BiError} from "react-icons/bi";

function DefaultErrorComponent() {
    return (
        <div>
            <div className="w-full justify-center items-center flex mt-10 flex-col">
                <BiError className="text-red-500" size={50}></BiError>
                <h1 className="text-base font-normal text-center text-red-500">
                    Ha ocurrido un error inesperado. Contacte con el soporte técnico.
                </h1>
            </div>
        </div>
    );
}

export default DefaultErrorComponent;