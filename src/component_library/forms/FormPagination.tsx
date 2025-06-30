import { Pagination, UsePaginationReturn } from '@ark-ui/react/pagination';
import { tv } from 'tailwind-variants';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { StyleSystemProps } from '../types.ts';

export interface FormPaginationProps extends StyleSystemProps {
  pagination: UsePaginationReturn;
}

const paginationStyles = tv({
  slots: {
    container:
      'flex gap-3 select-none bg-gray-100 w-fit p-2 rounded-xl border-[1px] border-gray-200',
    button:
      'flex cursor-pointer justify-center items-center p-2 rounded-lg hover:bg-gray-200 transition',
    activePage: 'font-semibold text-white',
    inactivePage: 'font-semibold text-gray-500',
    ellipsis: 'text-gray-400 font-semibold mx-1',
  },
  variants: {
    size: {
      sm: {
        button: 'h-7 w-7 text-sm',
        activePage: 'text-xs',
        inactivePage: 'text-xs',
        container: 'p-1',
      },
      md: {
        button: 'h-8 w-8 text-sm',
        activePage: 'text-sm',
        inactivePage: 'text-sm',
      },
      lg: {
        button: 'h-9 w-9 text-sm',
        activePage: 'text-sm',
        inactivePage: 'text-sm',
      },
      xl: {
        button: 'h-10 w-10 text-base',
        activePage: 'text-bae',
        inactivePage: 'text-base',
      },
    },
    colorSchema: {
      brand_primary: {
        activePage: '!bg-brand_primary-700',
        inactivePage: 'bg-gray-100',
      },
      brand_secondary: {
        activePage: '!bg-brand_secondary-700',
        inactivePage: 'bg-gray-100',
      },
      primary: {
        button: 'bg-gray-100 hover:bg-gray-200',
        activePage: '!bg-brand_primary-600',
        inactivePage: 'bg-gray-100',
        container: 'bg-white border-gray-100',
      },
      secondary: {
        button: 'bg-white',
        activePage: '!bg-brand_primary-600',
        inactivePage: 'bg-gray-100',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    colorSchema: 'primary',
  },
});

export const FormPagination = ({
  pagination,
  colorSchema,
  size,
}: FormPaginationProps) => {
  const styles = paginationStyles({ size, colorSchema });

  return (
    <Pagination.RootProvider value={pagination}>
      <div className={styles.container()}>
        <Pagination.PrevTrigger className={styles.button()}>
          <BiChevronLeft />
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {(pagination) => (
            <div className="flex gap-1 items-baseline">
              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item
                    className={`${styles.button()} ${
                      page.value === pagination.page
                        ? styles.activePage()
                        : styles.inactivePage()
                    }`}
                    key={index}
                    {...page}
                  >
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis
                    key={index}
                    index={index}
                    className={styles.ellipsis()}
                  >
                    &#8230;
                  </Pagination.Ellipsis>
                )
              )}
            </div>
          )}
        </Pagination.Context>
        <Pagination.NextTrigger className={styles.button()}>
          <BiChevronRight />
        </Pagination.NextTrigger>
      </div>
    </Pagination.RootProvider>
  );
};
