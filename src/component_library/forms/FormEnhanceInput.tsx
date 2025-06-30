import React from 'react';
import Button from './Button.tsx';
import { RiBardLine, RiSave2Fill, RiSave2Line } from 'react-icons/ri';


interface Props{
  children: React.ReactNode
}

function FormEnhanceInput(props) {
  return (
    <div className="p-3 py-3 border-[1px]  rounded-lg bg-brand_primary-100 border-brand_primary-500">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1 text-sm text-brand_primary-500 items-center">
          <RiBardLine></RiBardLine>
          <h1 className="font-semibold">AI Tools</h1>
        </div>
        <div className="w-fit flex gap-2 text-nowrap">
          <Button colorSchema="brand_primary" size="sm">
            Enhance
            <RiBardLine></RiBardLine>
          </Button>
        </div>

      </div>
      <div className="bg-white p-3 rounded-lg">
        {
          props.children
        }
      </div>
    </div>
  );
}

export default FormEnhanceInput;