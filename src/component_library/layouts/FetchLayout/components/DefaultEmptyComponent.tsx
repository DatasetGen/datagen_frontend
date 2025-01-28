import {BiSolidInbox} from "react-icons/bi";

function DefaultEmptyComponent() {
    return (
        <div>
            <div className="w-full justify-center items-center flex mt-10 flex-col mb-10">
                <BiSolidInbox className="text-gray-500" size={50}></BiSolidInbox>
                <h1 className="text-base font-normal text-center text-gray-500">
                    No existen elementos. Crea uno nuevo.
                </h1>
            </div>
        </div>
    );
}

export default DefaultEmptyComponent;