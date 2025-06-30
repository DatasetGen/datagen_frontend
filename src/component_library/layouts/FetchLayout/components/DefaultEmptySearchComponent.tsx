import {BiSearch } from "react-icons/bi";

function DefaultEmptySearchComponent() {
    return (
        <div>
            <div className="w-full justify-center items-center flex mt-10 flex-col mb-10">
                <div className="h-[80px] w-[80px] bg-gray-100 flex items-center justify-center rounded-full">
                    <BiSearch className="text-gray-500" size={40}></BiSearch>
                </div>
                <h1 className="font-normal text-center text-gray-500 text-lg">
                    Parece que no se ha encontrado lo que buscabas.
                </h1>
            </div>
        </div>
    );
}

export default DefaultEmptySearchComponent;