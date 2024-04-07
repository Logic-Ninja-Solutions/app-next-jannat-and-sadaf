'use server'

import { Product } from '../../types/product'
import serverInstance from '../api'

export async function listPaginatedProducts(
    take: string,
    lastCursor?: string | null
) {
    const response = await serverInstance.get<{ data: Product[] }>(`product`)
    const products = response.data
    return products
}

export async function getProduct(slug: string) {
    const response = await serverInstance.get(`product/slug/${slug}`)
    const product = response.data
    return product
}
