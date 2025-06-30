import React from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router';
import Title from '../../../../../../component_library/texts/Title.tsx';
import { BiPlus, BiTag, BiUpload } from 'react-icons/bi';
import { useCreateBatch, useDatasetBatches, useModifyDatasetBatch } from '../../../../../../api/app/datasets.ts';
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
import { RiBardLine } from 'react-icons/ri';
import FormikFileInput from '../../../../../../component_library/formik/FormikFileInput.tsx';
import { FormikInput } from '../../../../../../component_library/formik/FormikInputs.tsx';

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
            dialog.setOpen(false)
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
    "workbench": true
  })
  const {mutateAsync} = useCreateBatch(parseInt(dataset_id ?? ""))({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["datasets", parseInt(dataset_id ?? ""), "batches"]
      })

    }
  })
  const createDialog = useDialog()

  return (
    <>
      <Dialog size="md" dialog={createDialog} title="Create empty batch">
        <FormikForm  initialValues={{name: ""}} onSubmit={async (values) => {
          await mutateAsync(values)
        }}>
        <div className="grid gap-3 mt-5">
          <FormikInput name="name" placeholder="Batch name"></FormikInput>
          <FormikButton>Create Batch</FormikButton>
        </div>

        </FormikForm>
      </Dialog>
      <PageLayout title="Data Workbench">
        <div className="mt-9 flex gap-3 justify-end">
          <div className="max-w-[200px]">
            <Button size="md" colorSchema="primary" onClick={() => navigate(`/app/datasets/${dataset_id}/dataset_generation`)}>
              <RiBardLine></RiBardLine>
              Generate images
            </Button>
          </div>
          <div className="max-w-[200px]" >
            <Button colorSchema="primary" size="md" onClick={() => navigate(`/app/datasets/${dataset_id}/dataset_upload`)}>
              <BiUpload></BiUpload>
              Upload files
            </Button>
          </div>
          <div className="max-w-[200px]">
            <Button size="md" onClick={() => createDialog.setOpen(true)}>
              <BiPlus></BiPlus>
              Empty batch
            </Button>
          </div>
        </div>
        <div className="grid gap-2 md:grid-cols-3 2xl:grid-cols-4 mt-4">
          {
            categoryData?.results.map(x => (
              <BatchCard batch={x}></BatchCard>
            ))
          }
        </div>
      </PageLayout>
    </>
);
}

export default DataWorkbench;