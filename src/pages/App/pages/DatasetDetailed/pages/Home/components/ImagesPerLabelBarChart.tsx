import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import Title from "../../../../../../../component_library/texts/Title.tsx";
import FormSelect from "../../../../../../../component_library/forms/FormSelect.tsx";

const data = [
    {
        name: 'Label A',
        real: 4000,
        synthetic: 2400,
    },
    {
        name: 'Label B',
        real: 3000,
        synthetic: 1398,
    },
    {
        name: 'Label C',
        real: 2000,
        synthetic: 9800,
    },
    {
        name: 'Label D',
        real: 2780,
        synthetic: 3908,
    },
    {
        name: 'Label E',
        real: 1890,
        synthetic: 4800,
    },
    {
        name: 'Label F',
        real: 2390,
        synthetic: 3800,
    },
    {
        name: 'Label G',
        real: 3490,
        synthetic: 4300,
    },
];

// Add percentage values to each dataset
const processedData = data.map((entry) => {
    const total = entry.real + entry.synthetic;
    return {
        ...entry,
        realPercentage: ((entry.real / total) * 100).toFixed(1), // Calculate real %
        syntheticPercentage: ((entry.synthetic / total) * 100).toFixed(1), // Calculate synthetic %
    };
});

function ImagesPerLabelBarChart() {
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
                    <Bar dataKey="synthetic" stackId="a" fill="#905EF8">
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
                        fill="#68D391"
                        className="fill-brand_secondary-400"
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
        </div>
    );
}

export default ImagesPerLabelBarChart;
