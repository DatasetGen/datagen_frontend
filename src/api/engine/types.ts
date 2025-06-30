export interface ApiPagination<T>{
    next: number,
    previous: number,
    count : number,
    page_size: number,
    results : T[]
}