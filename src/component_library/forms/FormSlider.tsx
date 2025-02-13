import { Slider, useSlider, UseSliderProps } from '@ark-ui/react';
import React from 'react';
import { FormContainerProps } from './FormContainer.tsx';

export interface FormSliderProps extends FormContainerProps<HTMLInputElement>{
  markers ?: number[],
  config?: UseSliderProps
}

function FormSlider({label, markers, config}: FormSliderProps) {

  const slider = useSlider({
    ...config,
  })

  return (
    <Slider.RootProvider value={slider}>
      <div className="font-semibold w-full justify-between flex mb-2">
        <Slider.Label>
          {
            label && <label className="font-semibold text-gray-600 text-sm">{label}</label>
          }
        </Slider.Label>
        <Slider.ValueText className="font-semibold text-gray-600 text-sm"/>
      </div>
      <Slider.Control>
        <Slider.Track className="w-full bg-gray-100 h-[5px]">
          <Slider.Range className="bg-brand_primary-700 h-[5px]"/>
        </Slider.Track>
        <Slider.Thumb index={0} className="w-[20px] mt-[-12.5px] h-[20px] rounded-lg bg-brand_primary-500 cursor-pointer border-2 border-solid border-white">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
      {
        markers &&
        <Slider.MarkerGroup className="mt-2 text-xs text-gray-500 font-semibold blo">
          {
            markers?.map(marker => (
              <Slider.Marker key={marker} value={marker}>{marker}</Slider.Marker>
            ))
          }
        </Slider.MarkerGroup>
      }
    </Slider.RootProvider>
  );
}

export default FormSlider;