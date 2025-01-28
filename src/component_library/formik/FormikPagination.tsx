import {FormPagination, FormPaginationProps} from "../forms/FormPagination.tsx";
import {usePagination, UsePaginationProps} from '@ark-ui/react/pagination'
import {useField} from "formik";

interface Props extends FormPaginationProps{
    name: string,
    paginationProps : UsePaginationProps
}

export function FormikPagination({paginationProps, name, ...props}: Props){
    const [field, meta, helpers] = useField(name)
    const pag = usePagination({
        ...paginationProps,
        page: field.value,
        onPageChange: (page) => {
            helpers.setValue(page.page)
        },
    })

    return <FormPagination pagination={pag} {...props}/>
}