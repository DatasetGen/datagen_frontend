import {PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend} from 'recharts';
import Title from "../../../../../../../component_library/texts/Title.tsx";
import FormSelect from "../../../../../../../component_library/forms/FormSelect.tsx";
import { useDatasetPieChart } from '../../../../../../../api/app/datasets.ts';
import FetchLayout from '../../../../../../../component_library/layouts/FetchLayout';
import { useParams } from 'react-router';



function ImagesPerLabelChart() {


    const {dataset_id} = useParams()
    const {data, status} = useDatasetPieChart(parseInt(dataset_id ?? ""))()

    return (
        <div className="w-full h-[400px] bg-gray-100 p-4 rounded-2xl grid gap-6 ">
            <div className="flex items-center justify-between">
                <Title>Synthetic vs Real</Title>
                <FormSelect colorSchema="secondary" options={[
                    {
                        label:"Images",
                        value:"images"
                    },
                    {
                        label:"Annotations",
                        value:"annotations"
                    },
                ]}></FormSelect>
            </div>
            <FetchLayout statusArray={[status,]}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {data?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </FetchLayout>
        </div>
    );
}

export default ImagesPerLabelChart;
