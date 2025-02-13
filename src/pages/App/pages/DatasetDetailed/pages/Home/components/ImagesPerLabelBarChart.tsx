import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import Title from "../../../../../../../component_library/texts/Title.tsx";
import FormSelect from "../../../../../../../component_library/forms/FormSelect.tsx";
import { useDatasetBarChart } from '../../../../../../../api/app/datasets.ts';
import { useParams } from 'react-router';
import FetchLayout from '../../../../../../../component_library/layouts/FetchLayout';



function ImagesPerLabelBarChart() {

    const {dataset_id} = useParams()
    const {data, status} = useDatasetBarChart(parseInt(dataset_id ?? "", 0))()

    const processedData = data?.map((entry) => {
        const total = entry.real + entry.synthetic;
        return {
            ...entry,
            realPercentage: ((entry.real / total) * 100).toFixed(1), // Calculate real %
            syntheticPercentage: ((entry.synthetic / total) * 100).toFixed(1), // Calculate synthetic %
        };
    });

    return (
        <div className="w-full h-[400px] bg-gray-100 p-4 rounded-2xl grid gap-6">
            <div className="flex items-center justify-between">
                <Title>Data per label</Title>
                <FormSelect
                    colorSchema="secondary"
                    options={[
                        {
                            label: "Images",
                            value: "images",
                        },
                        {
                            label: "Annotations",
                            value: "annotations",
                        },
                    ]}
                ></FormSelect>
            </div>
            <FetchLayout status={status}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={processedData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="synthetic" stackId="a"
                             className="fill-brand_secondary-400"
                        >
                            <LabelList
                                dataKey="syntheticPercentage"
                                position="inside"
                                formatter={(value) => `${value}%`}
                                fill="white"
                                className="text-xs"
                            />
                        </Bar>
                        <Bar
                            radius={[10, 10, 0, 0]}
                            dataKey="real"
                            stackId="a"
                            fill="#905EF8"
                        >
                            <LabelList
                                className="text-xs"
                                dataKey="realPercentage"
                                position="inside"
                                formatter={(value) => `${value}%`}
                                fill="white"
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </FetchLayout>
        </div>
    );
}

export default ImagesPerLabelBarChart;
