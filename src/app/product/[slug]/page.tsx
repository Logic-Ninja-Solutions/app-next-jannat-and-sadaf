import { getProduct as getProductBySlug } from '@/src/actions/product'
import React from 'react'
import ProductPage from '../../../components/product'
import { deslugify } from '../../../utils/string'

interface Props {
    params: {
        slug: string
    }
}

export function generateMetadata({ params: { slug } }: Props) {
    const title = deslugify(slug)
    return {
        title: title,
    }
}

export default async function Page({ params: { slug } }: Props) {
    const product = await getProductBySlug(slug)

    return (
        <React.Fragment>
            <ProductPage product={product} />
        </React.Fragment>
    )
}
