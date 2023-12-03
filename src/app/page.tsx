'use client'

import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Image,
    Spinner,
} from '@nextui-org/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { listPaginatedProducts } from '../actions/product'
import { ProductActionType } from '../actions/product/enums'
import { formatPrice } from '../models/product'

export default function Home() {
    async function fetchPaginatedData({
        pageParam,
    }: {
        pageParam: string | null
    }) {
        const response = await listPaginatedProducts('20', pageParam)
        const { lastCursor, hasNextPage } = response

        return {
            items: response.data,
            nextToken: hasNextPage ? lastCursor : null,
        }
    }

    const {
        data: paginatedProductsData,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [ProductActionType.fetchProducts],
        queryFn: fetchPaginatedData,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextToken,
        staleTime: Infinity,
    })

    function getPage(page: number) {
        return {
            items: paginatedProductsData?.pages[page]?.items,
            nextToken: paginatedProductsData?.pages[page]?.nextToken ?? null,
        }
    }

    const [page, setPage] = useState(0)
    const { items: products, nextToken } = getPage(page)

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <>
                {isFetching || isFetchingNextPage ? (
                    <Spinner color="secondary" />
                ) : (
                    <div className="container mx-auto px-8 sm:px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products?.map((product, index) => (
                                <Card
                                    as={Link}
                                    href={`/product/${product.slug}`}
                                    key={index}
                                    isFooterBlurred
                                >
                                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                        <p className="text-tiny text-white/60 uppercase font-bold">
                                            New
                                        </p>
                                    </CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Card example background"
                                        className="z-0 w-full h-full object-cover"
                                        src={product.images[0]}
                                    />
                                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                        <div>
                                            <p className="text-black text-tiny">
                                                {product.title}
                                            </p>
                                            <p className="text-black text-tiny">
                                                {formatPrice(
                                                    product.variants[0]?.price
                                                )}
                                            </p>
                                        </div>
                                        <Button
                                            className="text-tiny"
                                            color="primary"
                                            radius="full"
                                            size="sm"
                                        >
                                            View
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </>
        </section>
    )
}
