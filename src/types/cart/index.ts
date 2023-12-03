import Types from '../prisma'

export interface CartItem {
    itemID: string
    slug: string
    title: string
    image: string
    variant: Types.ProductVariant
    quantity: number
}
