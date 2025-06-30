import { useParams } from 'react-router';
import { useState } from 'react';
import {
  useRemoveDatasetImage,
  useRemoveGenericDatasetImage,
} from '../../../../../api/app/datasets';
import { useImageSelectionStore } from '../../../../../stores/datasetImagesBulkActions';
import { queryClient } from '../../../../../api/client';
import FormIconButton from '../../../../../component_library/forms/FormIconButton.tsx';
import { MdClose } from 'react-icons/md';
import Button from '../../../../../component_library/forms/Button.tsx';

function SelectionActionsBar() {
  const { selectedIds, clear } = useImageSelectionStore();
  const { dataset_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useRemoveGenericDatasetImage(dataset_id);

  const handleDelete = async () => {
    const confirm = window.confirm(
      `¿Eliminar ${selectedIds.length} imagen(es)?`
    );
    if (!confirm) return;

    setIsLoading(true);
    try {
      // Ejecutar todas las mutaciones en paralelo
      await Promise.all([
        ...selectedIds.map(async (id) => {
          console.log(id);
          await mutateAsync(id); // Ejecuta la mutación
        }),
      ]);
      await queryClient.invalidateQueries({
        queryKey: ['datasets', parseInt(dataset_id ?? ''), 'images'],
      });
      clear();
    } catch (err) {
      console.error('Error eliminando imágenes:', err);
      alert('Error al eliminar algunas imágenes.');
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-200 rounded-2xl px-3 py-3 flex items-center gap-20 z-50">
    <div className="flex items-center gap-4">
      <FormIconButton
        onClick={clear}
        disabled={isLoading}
        colorSchema="primary"
        rounded={true}
        size="sm"
      >
        <MdClose></MdClose>
      </FormIconButton>
      <span className="font-semibold text-gray-700">
        {selectedIds.length} seleccionada{selectedIds.length > 1 ? 's' : ''}
      </span>
    </div>
      <div className="flex gap-2">
        <Button
          onClick={handleDelete}
          disabled={isLoading}
          danger={true}
          loading={isLoading}
        >
          {isLoading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </div>
    </div>
  );
}

export default SelectionActionsBar;
