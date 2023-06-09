export interface Product {
    _id?: string | number
    name: string
    image: any
    price: number
    flavor: string
    description: string
    categoryId: string | number
}