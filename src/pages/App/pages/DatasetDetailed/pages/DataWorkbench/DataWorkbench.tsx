import React from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router';
import Title from '../../../../../../component_library/texts/Title.tsx';
import { BiTag, BiUpload } from 'react-icons/bi';
import { useDatasetBatches, useModifyDatasetBatch } from '../../../../../../api/app/datasets.ts';
import { Batch } from '../../../../../../types';
import Button from '../../../../../../component_library/forms/Button.tsx';
import { FaArrowRight } from 'react-icons/fa6';
import { queryClient } from '../../../../../../api/client.ts';
import { useDialog } from '@ark-ui/react';
import Dialog from '../../../../../../component_library/dialogs/Dialog.tsx';
import Encord from '../../../../../../assets/encord.jpeg'
import Roboflow from '../../../../../../assets/roboflow.png'
import Datagen from '../../../../../../assets/datagen.png'
import FormikForm from '../../../../../../component_library/formik/FormikForm.tsx';
import { Field, Form, Formik } from 'formik';
import FormikButton from '../../../../../../component_library/formik/FormikButton.tsx';
import PageLayout from '../../../../../../component_library/layouts/PageLayout.tsx';
import { BsStars } from 'react-icons/bs';
import { IoMdPricetag } from 'react-icons/io';

function BatchCard({ batch }: { batch: Batch }) {
  const date = new Date(batch.timestamp);
  const { dataset_id, batch_id } = useParams();
  const navigate = useNavigate()
  const { mutateAsync } = useModifyDatasetBatch(parseInt(dataset_id ?? ""), batch.id)({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["datasets", parseInt(dataset_id ?? ""), "batches"],

      });
      navigate(`/app/datasets/${dataset_id}/dataset_jobs`)
    },
  });
  const dialog = useDialog();

  return (
    <>
      <Dialog dialog={dialog} size="lg">
        <h1 className="font-semibold mb-4 text-xl">
          Which platform do you want to use for labeling?
        </h1>
        <Formik
          initialValues={{ platform: "" }}
          onSubmit={async (values) => {
            await mutateAsync({
              name: batch.name,
              workbench: false,
            });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { name: "Encord", src: Encord, disabled : true },
                  { name: "Roboflow", src: Roboflow, disabled: true},
                  { name: "Datagen", src: Datagen, disabled: false },
                ].map(({ name, src, disabled }) => (
                  <label key={name}>
                    <Field
                      type="radio"
                      name="platform"
                      value={name}
                      className="hidden"
                      onChange={() => disabled == false ? setFieldValue("platform", name) : ""}
                    />
                    <div
                      className={`w-full cursor-pointer bg-gray-100 p-8 rounded-lg flex justify-center items-center flex-col ${
                        values.platform === name
                          ? "border-2 border-brand_primary-500 border-solid"
                          : disabled ?  "opacity-50" : ""
                      }`}
                    >
                      <img className="rounded-full w-full max-w-[80px]" src={src} />
                      <p className="font-semibold mt-4">{name}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-center mt-5">
                <div className="max-w-[300px] w-full">
                  <FormikButton disabled={values.platform === ""}>Start labeling</FormikButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
      <Link to={`${batch.id}`}>
        <div
          className={`p-4 bg-gray-100 rounded-xl cursor-pointer border-[1px] ${
            batch.id == parseInt(batch_id ?? "") ? "border-brand_primary-500" : ""
          }`}
        >
          <h1 className="font-semibold text-sm">{batch.name}</h1>
          <h2 className="text-xs mt-1 text-gray-600">
            Created at: {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
          </h2>
          <div className="flex flex-col gap-1 mt-3">
            <h2 className="text-xs text-gray-600 font-semibold">
              Unassigned images: {batch.unassigned}
            </h2>
            <h2 className="text-xs text-gray-600 font-semibold">
              Synthetic images: {batch.synthetic}
            </h2>
          </div>
          <div className="flex justify-end gap-1 mt-6">
            <Button
              size="sm"
              colorSchema="primary"
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                dialog.setOpen(true);
              }}
            >
              Start labeling
              <IoMdPricetag />
            </Button>
            <Button
              size="sm"
              onClick={async (e) => {
                navigate(`${batch.id}`);
              }}
            >
              Data Augment
              <BsStars />
            </Button>
          </div>
        </div>
      </Link>
    </>
  );
}


function DataWorkbench() {
  const { dataset_id, batch_id } = useParams();
  const navigate = useNavigate()
  const {data: categoryData, status: categoryStatus} = useDatasetBatches(parseInt(dataset_id ?? ""))({
    "unassigned_gt": 0,
    "workbench": true
  })

  return (
    <PageLayout className="mt-3 flex gap-3" title="Data Workbench">
        <div className="grid gap-2 grid-cols-3 mt-3">
          <div onClick={() => navigate(`/app/datasets/${dataset_id}/dataset_upload`)}
               className="border-[1px] border-solid border-gray-200 justify-center min-h-[150px] hover:bg-gray-200 cursor-pointer flex px-3 py-2 rounded-xl gap-2 bg-gray-100 items-center text-base font-semibold text-gray-600 ">
            <BiUpload></BiUpload>
            Upload files
          </div>
          {
            categoryData?.results.map(x => (
              <BatchCard batch={x}></BatchCard>
            ))
          }
        </div>
    </PageLayout>
      );
      }

      export default DataWorkbench;