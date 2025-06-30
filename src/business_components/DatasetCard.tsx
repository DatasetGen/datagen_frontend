import { Dataset } from "../types";
import Title from "../component_library/texts/Title.tsx";
import { IoMdPricetag} from "react-icons/io";
import Paragraph from "../component_library/texts/Paragraph.tsx";
import {BiPhotoAlbum, BiSolidFile, BiSolidImage} from "react-icons/bi";
import Button from "../component_library/forms/Button.tsx";
import {IconType} from "react-icons";
import {useNavigate} from "react-router";
import PreviewImage from "./PreviewImage.tsx";
import {useRef} from "react";



interface DatasetCardProps {
    dataset: Dataset;
}

const DatasetCard = ({ dataset }: DatasetCardProps) => {
    const numberOfLabelsToShow = 3;
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null)

    const renderInfo = (Icon:  IconType, value: string, label?: string) => (
        <div  className="p-1 py-1 text-xs rounded-lg font-semibold flex items-center gap-2 text-gray-700">
            <Icon></Icon>
            {value} {label}
        </div>
    );

    return (
        <div  onClick={() => navigate(dataset.id)} className="w-full border-4 border-gray-100 bg-gray-100 rounded-xl  relative overflow-hidden  cursor-pointer">
            <div className="grid grid-cols-1 " >
                <div ref={ref} className="w-full h-[180px]">
                    {
                        dataset.thumbnail ?
                            <PreviewImage image={dataset.thumbnail} parentRef={ref}></PreviewImage>
                            :
                            <div className="h-[170px] w-full object-cover bg-gray-300 flex justify-center items-center gap-4 font-semibold text-gray-500">
                                <BiPhotoAlbum size={40}></BiPhotoAlbum>
                                <h1>No images</h1>
                            </div>

                    }
                </div>
                <div className="flex flex-col justify-center p-6">
                    <Title size="sm">{dataset.name}</Title>
                    <Paragraph colorSchema="secondary" size="sm">
                    {dataset.description}
                    </Paragraph>
                </div>
                <div className="w-full bg-gray-200 h-[2px]"></div>
                <div className="p-1 px-3 flex gap-3">
                    {renderInfo(BiSolidFile, dataset.total_weight)}
                    {renderInfo(BiSolidImage, dataset.num_images.toString(), "images")}
                    {renderInfo(IoMdPricetag, dataset.num_labels.toString(), "labels")}
                </div>
                <div className="w-full bg-gray-200 h-[2px]"></div>
                <div className="p-3">
                    {dataset.labels.length > 0 ? (
                        <div className="flex items-baseline gap-2 overflow-auto">
                            {
                                dataset.labels.slice(0, numberOfLabelsToShow).map((label) => (
                                    <div
                                        key={label.id}
                                        className="bg-gray-200 p-2 py-1 text-xs rounded-lg font-semibold border-2 border-gray-300 flex items-center gap-2 text-gray-700 text-nowrap"
                                    >
                                        <IoMdPricetag/>
                                        {label.name}
                                    </div>
                                ))
                            }
                            {dataset.labels.length > numberOfLabelsToShow && (
                                <p className="text-lg text-gray-500">...</p>
                            )}
                        </div>
                    ) : (
                        <Button size="md" colorSchema="primary">
                            <IoMdPricetag />
                            Configurar labels
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DatasetCard;
