import React from 'react';
import {Job} from "../types";
import {Link, useNavigate, useParams} from "react-router";
import { Avatar } from '@ark-ui/react/avatar'
import {FaCheck, FaMessage, FaPlay} from "react-icons/fa6";
import Button from "../component_library/forms/Button.tsx";
import {IoIosAdd} from "react-icons/io";
import { useDestroyJob, useModifyDatasetJob } from '../api/app/datasets.ts';
import {queryClient} from "../api/client.ts";
import { useDialog } from '@ark-ui/react';
import DeleteDialog from '../component_library/dialogs/DeleteDialog.tsx';
import { BiTrash } from 'react-icons/bi';
import { OptionMenuContainer } from '../component_library/utils/OptionMenu.tsx';
import { MdClose } from 'react-icons/md';

function JobCard({job}: {job: Job}) {
    const completed = job.done_frames === job.frames
    const {dataset_id} = useParams();
    const navigate = useNavigate()
    const {mutateAsync} = useModifyDatasetJob(parseInt(dataset_id ?? ""), job.id)({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
            queryKey: ["datasets", parseInt(dataset_id??""), "jobs"]
            })
        }
    })
    const destroyDialog = useDialog()
    const {mutateAsync: destroyJob} = useDestroyJob(
      parseInt(dataset_id ?? ""),
      job.id
    )({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["datasets",  parseInt(dataset_id ?? ""), "batches"],
            })
            await queryClient.invalidateQueries({
                queryKey: ["datasets",  parseInt(dataset_id ?? ""), "jobs"],
            })
            destroyDialog.setOpen(false)
        }
    })
    return (
      <>
          <DeleteDialog callback={async () => await destroyJob({})} dialog={destroyDialog}></DeleteDialog>

          <OptionMenuContainer
            size="sm"
            buttonSize="xs"
            iconProps={{colorSchema: "secondary"}}
            items={[
                {
                    title: "Delete",
                    trash: true,
                    icon: <BiTrash size={15}/>,
                    callback: () => { destroyDialog.setOpen(true)}
                }
            ]}>
        <div className="bg-gray-200  rounded-xl">
        <div className="pt-4 px-4">
            <div >
                <div className="mb-1">
                    <Link to="" className="text-gray-800 font-semibold text-sm">
                        Task number {job.id}#
                    </Link>
                    {job.done}
                </div>


                <div className="my-3">
                    <p className="text-[10px] font-semibold text-gray-500 mb-1">{job.done_frames}/{job.frames} frames done</p>
                    <div className="relative w-full h-[7px] bg-gray-300 rounded-xl overflow-hidden">
                        <div style={{width: 100*(job.done_frames/job.frames) + "%"}} className={`h-[7px] bg-brand_primary-500 ${completed && " "}`}></div>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-gray-200 my-1"></div>

                <div className="my-1 flex items-center justify-between">

                    <div className="flex items-center gap-2 w-full">
                        {
                            !job.done && completed &&
                            <div className="w-full">
                                <Button size="sm" colorSchema="brand_primary" onClick={() => mutateAsync({
                                    done: true,
                                    reviewed: false
                                })}>
                                    <span className="text-nowrap">
                                        Send to review
                                    </span>
                                    <FaMessage></FaMessage>
                                </Button>
                            </div>
                        }
                        {
                            job.done && !job.reviewed &&

<>
                          <div className="w-full">
                              <Button danger size="sm" colorSchema="brand_primary" onClick={() => mutateAsync({
                                  reviewed: false,
                                  done: false
                              })}>
                                    <span className="text-nowrap">
                                        Reject
                                    </span>
                                  <MdClose size={17}></MdClose>
                              </Button>
                          </div>
                            <div className="w-full">
                                <Button size="sm" colorSchema="brand_primary" onClick={() => mutateAsync({
                                    reviewed: true
                                })}>
                                    <span className="text-nowrap">
                                        Approve
                                    </span>
                                    <FaCheck></FaCheck>
                                </Button>
                            </div>
</>
                        }
                    </div>
                </div>

            </div>
            </div>
            {
              !job.assignee &&
              <div
                className="bg-gray-300 text-gray-600 cursor-pointer hover:bg-gray-300 flex h-[30px] w-[30px] rounded-full justify-center items-center">
                  <IoIosAdd size={20}></IoIosAdd>
              </div>
            }
            {
              job.assignee &&
              <>
                  <div className="w-full h-[1px] bg-gray-300 my-3"></div>
                  <div className="flex items-center justify-between pb-4 px-4">
                  <div className="flex gap-3 items-center text-xs text-gray-700 font-semibold ">
                      <div className="flex items-center">
                          <Avatar.Root
                            className="w-[25px] h-[25px] rounded-full overflow-hidden bg-brand_primary-700 text-white flex items-center justify-center">
                              <Avatar.Fallback>{job.assignee.first_name[0]}{job.assignee.last_name[0]}</Avatar.Fallback>
                              <Avatar.Image src={job.assignee.avatar} alt="avatar" />
                          </Avatar.Root>
                      </div>
                      <p>{job.assignee.first_name} {job.assignee.last_name}</p>
                  </div>
                  <div className="w-full max-w-[100px]">
                      <Button onClick={() => {
                          navigate(`/app/datasets/${dataset_id}/job/${job.id}/image/${!job.current_image ? job.start_range : job.current_image}/`)
                      }} size="sm" colorSchema={!completed ? "brand_primary" : "primary"}>
                          {
                              !completed ? "Label" : "Review"
                          }
                          <FaPlay></FaPlay>
                      </Button>
                  </div>
                  </div>

              </>
            }

        </div>
          </OptionMenuContainer>
      </>
    );
}

export default JobCard;