import { useField } from 'formik';
import { usePagination } from '@ark-ui/react/pagination';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { FormPagination } from '../forms/FormPagination';

export function FormikPagination({ paginationProps, name, ...props }: Props) {
  const [field, , helpers] = useField(name);
  const [searchParams, setSearchParams] = useSearchParams();

  const pag = usePagination({
    ...paginationProps,
    page: field.value,
    onPageChange: (page) => {
      helpers.setValue(page.page);
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('page', String(page.page));
        return newParams;
      });
    },
  });

  // Leer la página de la URL en el primer render
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    if (!isNaN(pageFromUrl) && pageFromUrl !== field.value) {
      helpers.setValue(pageFromUrl);
      pag.setPage(pageFromUrl);
    }
  }, []); // Solo en montaje inicial

  // Manejo de teclas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'n' && pag.nextPage) {
        const next = pag.page + 1;
        pag.setPage(next);
        helpers.setValue(next);
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('page', String(next));
          return newParams;
        });
      } else if (e.key === 'p' && pag.previousPage) {
        const prev = pag.page - 1;
        pag.setPage(prev);
        helpers.setValue(prev);
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('page', String(prev));
          return newParams;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pag.page, pag.nextPage, pag.previousPage]);

  return <FormPagination pagination={pag} {...props} />;
}
