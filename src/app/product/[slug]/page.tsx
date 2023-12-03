'use client'

import { getProduct as getProductBySlug } from '@/src/actions/product'
import { ProductActionType } from '@/src/actions/product/enums'
import ImagesCarousel from '@/src/components/product/Carousel'
import ProductDetails from '@/src/components/product/ProductDetails'
import { Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

interface ProductPageProps {
    params: {
        slug: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    const { data: product, isLoading } = useQuery({
        queryKey: [ProductActionType.getProduct, params.slug],
        queryFn: () => getProductBySlug(params.slug),
    })

    return (
        <>
            {isLoading ? (
                <>
                    <Spinner color="secondary" />
                </>
            ) : (
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
                                    <ImagesCarousel
                                        imageList={product?.images ?? []}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <ProductDetails product={product} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
