import {DatasetImage} from "../types";
import {IoMdPricetag} from "react-icons/io";


interface Props{
    image: DatasetImage;
}

function DatasetImageCard({image}: Props) {
    return (
        <div className="group rounded-2xl overflow-hidden cursor-pointer relative h-[190px] text-sm">
            <div className="z-10  absolute top-0 left-0 m-3 flex gap-2">
                <div className="py-1 px-2 bg-white text-gray-500 rounded-lg border-2 border-gray-100 font-semibold">
                    {
                        image.extension.toUpperCase()
                    }
                </div>
                <div className="py-1 px-2 bg-white text-gray-500 rounded-lg border-2 border-gray-100 font-semibold">
                    {
                        image.total_weight.toUpperCase()
                    }
                </div>
            </div>
            <div className="z-10  absolute bottom-0 left-0 m-3 flex gap-2">
                {
                    image.labels.map((label, index) => (
                        <div key={index} className="py-1 px-2 bg-white text-gray-500 rounded-lg border-2 border-gray-100 font-semibold flex items-center gap-2">
                            <IoMdPricetag></IoMdPricetag>
                            {
                                label
                            }
                        </div>
                    ))
                }
            </div>
            <img className="group-hover:scale-110 transition-all duration-500 brightness-75 bg- max-h-[230px] object-cover w-full h-full absolute top-0 left-0" src={image.image}/>
        </div>
    );
}

export default DatasetImageCard;