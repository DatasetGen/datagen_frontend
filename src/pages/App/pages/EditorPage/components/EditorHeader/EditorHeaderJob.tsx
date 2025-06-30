import FormIconButton from '../../../../../../component_library/forms/FormIconButton';
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router';
import { Slider } from '@ark-ui/react';
import { useDatasetImage, useDatasetJob } from '../../../../../../api/app/datasets.ts';
import Spinner from '../../../../../../component_library/utils/Spinner.tsx';

function EditorHeaderJob() {
  const navigate = useNavigate()
  const {image_id, dataset_id, job_id} = useParams()
  const imageId = parseInt(image_id??"")
  const {data } = useDatasetJob(parseInt(dataset_id ?? ""), parseInt(job_id ?? ""))({}, {
    enabled: job_id !== undefined
  })
  const {data: image } = useDatasetImage(parseInt(dataset_id ?? ""),imageId)({}, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
    refetchOnMount: false
  })
  const imageIndex = data?.images.indexOf(imageId)?? 0;

  if(!image || !data) return <Spinner size="lg" colorSchema="brand_primary"/>
  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-1">
        <FormIconButton rounded disabled={image?.id <= data?.start_range} size="md" onClick={() => {
          navigate(`/app/datasets/${dataset_id}/job/${job_id}/image/${data?.start_range}/`)
        }}>
          <BiChevronsLeft></BiChevronsLeft>
        </FormIconButton>
        <FormIconButton rounded disabled={image?.id <= data?.start_range} size="md" onClick={() => {
          navigate(`/app/datasets/${dataset_id}/job/${job_id}/image/${data?.images[imageIndex-1]}/`)
        }}>
          <BiChevronLeft></BiChevronLeft>
        </FormIconButton>
      </div>
      <Slider.Root onValueChangeEnd={(e) => {
        navigate(`/app/datasets/${dataset_id}/job/${job_id}/image/${data?.images[e?.value - 1]}/`)
      }} value={[imageIndex+1]} step={1} min={1} max={data?.images.length} className="flex flex-col gap-1">
        <Slider.ValueText  className="text-xs text-gray-500 flex justify-center">
          {imageIndex+1}/{data.frames}
        </Slider.ValueText>
        <Slider.Control>
          <Slider.Track className="w-[300px] h-[6px] bg-gray-100 rounded-xl overflow-hidden">
            <Slider.Range className="h-[6px] bg-brand_primary-700" />
          </Slider.Track>
          <Slider.Thumb index={0} className="cursor-pointer active:bg-brand_primary-700 w-[15px] h-[15px] absolute mt-[-10.5px] bg-brand_primary-500 rounded-full">
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
      <div className="flex gap-1">
        <FormIconButton rounded disabled={image?.id >= data?.end_range} size="md" onClick={() => {
          navigate(`/app/datasets/${dataset_id}/job/${job_id}/image/${data?.images[imageIndex+1]}/`)
        }}>
          <BiChevronRight></BiChevronRight>
        </FormIconButton>
        <FormIconButton rounded disabled={image?.id >= data?.end_range} size="md" onClick={() => {
          navigate(`/app/datasets/${dataset_id}/job/${job_id}/image/${data?.end_range}/`)
        }}>
          <BiChevronsRight></BiChevronsRight>
        </FormIconButton>
      </div>
    </div>
  );
}

export default EditorHeaderJob;