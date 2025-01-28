import React from 'react';
import {PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend} from 'recharts';
import Title from "../../../../../../../component_library/texts/Title.tsx";
import FormSelect from "../../../../../../../component_library/forms/FormSelect.tsx";

const data01 = [
    { name: 'Synthetic', value: 400, color: "#905ef8" },
    { name: 'Real', value: 300, color:"#111411" },
];

function ImagesPerLabelChart() {
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
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ImagesPerLabelChart;
