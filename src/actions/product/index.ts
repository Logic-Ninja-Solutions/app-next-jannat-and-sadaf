'use server'

import { prisma } from '@/server'
import Types from '@/src/types/prisma'
import { getPaginatedData } from '@/src/utils/api/pagination'

export async function listPaginatedProducts(
    take: string,
    lastCursor?: string | null
) {
    const data = await getPaginatedData<Types.Product>(
        prisma.product.findMany,
        take as string,
        lastCursor as string
    )
    return data
}

export async function getProduct(slug: string) {
    const product = await prisma.product.findUnique({
        where: {
            slug,
        },
    })
    return product
}
