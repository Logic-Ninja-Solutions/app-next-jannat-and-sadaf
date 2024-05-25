export interface ProductVariant {
    size: string
    price: number
    isAvailable: boolean
    sizeMetadata?: { label: string; value: string }[];

}

export interface Product {
    id: string
    isNew: boolean
    title: string
    description: string
    slug: string
    code: string
    isAvailable: boolean
    images: string[]
    variants: ProductVariant[]
    createdAt: Date
    updatedAt: Date
    userId?: string | null
    categoryId?: string | null
}
