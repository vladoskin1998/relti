export interface PostItemInterface{
    city: string,
    street: string,
    address: string,
    price: string,
    describe?: string,
    images?: string[],
}

export interface FilterInterface{
    street: null | string,
    price: null | {toPrice: string, fromPrice: string},
    date: null | {toDate: string, fromDate: string}
}