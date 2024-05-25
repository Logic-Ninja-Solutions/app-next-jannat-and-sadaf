'use client'

import ImagesCarousel from '@/src/components/product/Carousel'
import ProductDetails from '@/src/components/product/ProductDetails'
import clsx from 'clsx'
import { Product } from '../../types/product'

interface ProductPageProps {
    product: Product | null
}

export default function ProductPage({ product }: ProductPageProps) {
    return (
        <>
            {!product ? (
                <div className="m-auto">
                    <h1>Product not found</h1>
                </div>
            ) : (
                <div className="mt-10 sm:px-20 pb-20">
                    <div
                        className={clsx(
                            'sm:grid grid-cols-6',
                            'gap-5 sm:gap-28'
                        )}
                    >
                        <div className="px-10 sm:px-0 col-span-3 ">
                            <ImagesCarousel imageList={product?.images ?? []} />
                        </div>
                        <div className="col-span-3">
                            <ProductDetails product={product} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
