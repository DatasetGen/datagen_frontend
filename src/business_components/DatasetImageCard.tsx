import { DatasetImage } from '../types';
import { IoMdPricetag } from 'react-icons/io';
import { useRef } from 'react';
import PreviewImage from './PreviewImage.tsx';
import { useImageSelectionStore } from '../stores/datasetImagesBulkActions.ts';

interface Props {
  image: DatasetImage;
}

function DatasetImageCard({ image }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { toggle, isSelected } = useImageSelectionStore();
  const selected = isSelected(image.id);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que se abra el menú contextual
    toggle(image.id); // Alterna selección
  };

  return (
    <div
      ref={ref}
      onContextMenu={handleRightClick}
      className={`group rounded-2xl overflow-hidden cursor-pointer relative h-[160px] text-xs transition-all ${
        selected
          ? 'border-4 border-brand_primary-800'
          : 'border-4 border-transparent'
      }`}
    >
      <div className="z-10 absolute top-0 left-0 m-3 flex gap-2">
        <div className="py-1 px-2 bg-white text-gray-500 rounded-lg border-2 border-gray-100 font-semibold">
          {image.extension.toUpperCase()}
        </div>
        <div className="py-1 px-2 bg-white text-gray-500 rounded-lg border-2 border-gray-100 font-semibold">
          {image.total_weight.toUpperCase()}
        </div>
      </div>
      <div className="z-10 absolute bottom-0 left-0 m-1 flex gap-2">
        {image.labels.map((label, index) => (
          <div
            key={index}
            className="py-[2px] px-[7px] bg-white text-[8px] text-gray-500 rounded-lg border-1 border-gray-100 font-semibold flex items-center gap-2"
          >
            <IoMdPricetag color={label.color} />
            {label.name}
          </div>
        ))}
      </div>
      <PreviewImage image={image} parentRef={ref} />
    </div>
  );
}

export default DatasetImageCard;
