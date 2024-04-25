'use server'

import { Product } from '../../types/product'
import serverInstance from '../api'



export async function getProduct(slug: string) {
    const response = await serverInstance.get(`product/slug/${slug}`)
    const product = response.data
    return product
}
