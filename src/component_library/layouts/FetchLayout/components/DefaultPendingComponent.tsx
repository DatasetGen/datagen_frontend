import Spinner from "../../../utils/Spinner.tsx";

function DefaultPendingComponent() {
    return (
        <div className="w-full">
            <div className="w-full justify-center items-center flex mt-10 mb-10">
                <Spinner size="xl" colorSchema="primary"></Spinner>
            </div>
        </div>
)
    ;
}

export default DefaultPendingComponent;