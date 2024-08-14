import { CustomSizes } from '../../models/custom.sizes'
import { ProductVariant } from '../product'

export type UserUpdateInput = any
export type CreateUserInput = any

export type CustomSizePreference = 'custom' | 'callback'
export type CartItem = {
    itemID: string
    slug: string
    title: string
    image: string
    variant: ProductVariant
    quantity: number
    customSizeData: CustomSizes
    customSizePreference: CustomSizePreference
}
