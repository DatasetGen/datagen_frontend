import {
  useAssignBatch, useDatasetBatch,
} from '../../../../../../../api/app/datasets.ts';
import FormikButton from "../../../../../../../component_library/formik/FormikButton.tsx";
import {UseDialogReturn} from "@ark-ui/react/dialog";
import * as dg from "@ark-ui/react/dialog";
import Button from "../../../../../../../component_library/forms/Button.tsx";
import Dialog from "../../../../../../../component_library/dialogs/Dialog.tsx";
import {useParams} from "react-router";
import UserPicker from '../../../../../../../business_components/UserPicker.tsx';
import FormikSlider from '../../../../../../../component_library/formik/FormikSlider.tsx';
import { Formik } from 'formik';
import { FaUsers } from 'react-icons/fa6';
import { FaTasks } from 'react-icons/fa';
import { RiTaskFill } from 'react-icons/ri';
import { queryClient } from '../../../../../../../api/client.ts';



interface Props{
    dialog : UseDialogReturn,
    batchId: number
}

function DatasetAssignBatchImages({dialog, batchId}: Props) {

    const {dataset_id,} = useParams();
    const {data: batch, status: jobStatus} = useDatasetBatch(parseInt(dataset_id ?? ""), batchId)()
    const {mutateAsync} = useAssignBatch(parseInt(dataset_id ?? ""), batchId)({
    onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["datasets", parseInt(dataset_id??""), "batches"]
        })
        await queryClient.invalidateQueries({
          queryKey: ["datasets", parseInt(dataset_id??""), "jobs"]
        })
    }
    })
    if(jobStatus !== "success") return "loading..."


    return (
        <Dialog size="lg" dialog={dialog} title="Assign images to team">
                 <Formik className="grid gap-2" initialValues={{user_ids: [], images_per_task: [1]}} onSubmit={async (values, helpers) => {
                    await mutateAsync({
                    user_ids: values.user_ids,
                    images_per_task: values.images_per_task[0]
                    })
                    dialog.setOpen(false)
                    helpers.resetForm()
                }}>
                   {
                     ({values}) => (
                       <>
                          <div className="w-full py-3 flex justify-center">
                            <div className="max-w-[350px] w-full bg-gray-100 p-7 rounded-xl grid gap-2 ">
                              <h1 className="font-semibold mb-3 text-gray-800 flex gap-2 items-center">
                                Task generation information
                              </h1>
                              <div className="text-sm text-gray-700 flex gap-2 items-center">
                                <span className="text-brand_primary-500">
                                  <FaTasks></FaTasks>
                                </span>
                                <span
                                  className="font-semibold">Number of tasks:</span> {Math.ceil(batch.unassigned / values.images_per_task)}
                              </div>
                              <div className="text-sm text-gray-700 flex gap-2 items-center">
                                <span className="text-brand_primary-500">
                                  <RiTaskFill></RiTaskFill>
                                </span>
                                <span
                                  className="font-semibold">Task per user:</span> {Math.ceil((Math.ceil(batch.unassigned / values.images_per_task)) / values.user_ids.length)}
                              </div>
                              <div className="text-sm text-gray-700 flex gap-2 items-center">
                                <span className="text-brand_primary-500">
                                  <FaUsers></FaUsers>
                                </span>
                                <span className="font-semibold">Number of users:</span> {values.user_ids.length}
                              </div>
                            </div>
                          </div>
                         <div className="grid gap-3">
                           <UserPicker name="user_ids"></UserPicker>
                           <FormikSlider name="images_per_task" label="Images per task" config={{
                             max: batch.unassigned,
                             min: 1
                           }}
                                         markers={[1, (batch.unassigned / 4).toFixed(0), (batch.unassigned / 2).toFixed(), (batch.unassigned * 3 / 4).toFixed(), batch.unassigned]}></FormikSlider>
                         </div>
                         <div className="w-full justify-center flex  gap-3 max-w-[300px] mt-14 mx-auto">
                           <dg.DialogCloseTrigger asChild>
                             <Button size="md" colorSchema="primary">Cancel</Button>
                           </dg.DialogCloseTrigger>
                           <FormikButton size="md">Create</FormikButton>
                         </div>

                       </>
                     )
                   }
                 </Formik>
        </Dialog>
    );
}

export default DatasetAssignBatchImages;