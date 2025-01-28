import {Dataset} from "../../../../../../../types";
import {BiFile, BiImage} from "react-icons/bi";
import Title from "../../../../../../../component_library/texts/Title.tsx";
import Paragraph from "../../../../../../../component_library/texts/Paragraph.tsx";
import {IoMdPricetag} from "react-icons/io";

interface Props{
    data?: Dataset
}

export default function DatasetHomeStats({data}: Props){
    return (
        <div className="w-full grid-cols-3 grid gap-4 mt-4">
            <div className="bg-gray-100 p-4 rounded-2xl flex gap-3 items-center">
                <div
                    className="text-brand_primary-700 h-[60px] w-[60px] bg-brand_primary-200 rounded-xl mr-4 flex justify-center items-center">
                    <BiImage size={30}></BiImage>
                </div>
                <div className="flex items-baseline gap-3">
                    <Title size="lg">{data?.num_images}</Title>
                    <Paragraph colorSchema="secondary">images</Paragraph>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-2xl flex gap-3 items-center">
                <div
                    className="text-brand_primary-700 h-[60px] w-[60px] bg-brand_primary-200 rounded-xl mr-4 flex justify-center items-center">
                    <IoMdPricetag size={30}></IoMdPricetag>
                </div>
                <div className="flex items-baseline gap-3">
                    <Title size="lg">{data?.num_labels}</Title>
                    <Paragraph colorSchema="secondary">labels</Paragraph>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-2xl flex gap-3 items-center">
                <div
                    className="text-brand_primary-700 h-[60px] w-[60px] bg-brand_primary-200 rounded-xl mr-4 flex justify-center items-center">
                    <BiFile size={30}></BiFile>
                </div>
                <div className="flex items-baseline gap-3">
                    <Title size="lg">{data?.total_weight}</Title>
                    <Paragraph colorSchema="secondary">total size</Paragraph>
                </div>
            </div>
        </div>
    )
}