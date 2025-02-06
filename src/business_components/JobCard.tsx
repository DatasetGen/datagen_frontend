import React from 'react';
import {Job} from "../types";
import {Link} from "react-router";
import { Avatar } from '@ark-ui/react/avatar'
import {FaCalendar, FaImage} from "react-icons/fa6";
import FormSelect from "../component_library/forms/FormSelect.tsx";
import Button from "../component_library/forms/Button.tsx";

function JobCard({job}: {job: Job}) {
    return (
        <div className="bg-gray-100 p-4 rounded-xl">
            <div className="flex justify-between items-center">
                <div>
                    <Link to="" className="text-blue-500 font-semibold hover:underline">
                        Job {job.id}#
                    </Link>
                    <div className="mt-2 grid gap-2">
                        <div className="flex gap-2 text-xs items-center font-semibold text-gray-500">
                            <FaImage></FaImage>
                            <span>{job.frames} Frames</span>
                        </div>
                        <div className="flex gap-2 text-xs items-center font-semibold text-gray-500">
                            <FaCalendar></FaCalendar>
                            <span>{job.duration} days active</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                <div>
                    <p className="font-semibold text-xs mb-1">Asignee:</p>
                    <FormSelect colorSchema="secondary" options={[{label: "pepe@pepe.com", value: 2}]}></FormSelect>
                </div>
                <div>
                    <p className="font-semibold text-xs mb-1">Status:</p>
                    <FormSelect colorSchema="secondary" options={[{label: "Completed", value: 2}]}></FormSelect>
                </div>
                </div>
                <div className="min-w-[100px]">
                    <Button size="md">
                        Label
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default JobCard;