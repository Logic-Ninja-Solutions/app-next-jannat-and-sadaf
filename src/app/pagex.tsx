// 'use client'

// import {
//     Button,
//     Card,
//     CardFooter,
//     CardHeader,
//     Image,
//     Spinner,
// } from '@nextui-org/react'
// import { useInfiniteQuery } from '@tanstack/react-query'
// import Link from 'next/link'
// import { useState } from 'react'
// import { listPaginatedProducts } from '../actions/product'
// import { ProductActionType } from '../actions/product/enums'
// import { formatPrice } from '../models/product'
// import ProductCard from '../components/product/ProductCard/ProductCard'

// export default function Home() {
//     async function fetchPaginatedData({
//         pageParam,
//     }: {
//         pageParam: string | null
//     }) {
//         const response = await listPaginatedProducts('20', pageParam)
//         const { lastCursor, hasNextPage } = response

//         return {
//             items: response.data,
//             nextToken: hasNextPage ? lastCursor : null,
//         }
//     }

//     const {
//         data: paginatedProductsData,
//         fetchNextPage,
//         hasNextPage,
//         isFetching,
//         isFetchingNextPage,
//     } = useInfiniteQuery({
//         queryKey: [ProductActionType.fetchProducts],
//         queryFn: fetchPaginatedData,
//         initialPageParam: null,
//         getNextPageParam: (lastPage) => lastPage.nextToken,
//         staleTime: Infinity,
//     })

//     function getPage(page: number) {
//         return {
//             items: paginatedProductsData?.pages[page]?.items,
//             nextToken: paginatedProductsData?.pages[page]?.nextToken ?? null,
//         }
//     }

//     const [page, setPage] = useState(0)
//     const { items: products, nextToken } = getPage(page)

//     return (
//         <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//             <>
//                 {isFetching || isFetchingNextPage ? (
//                     <Spinner color="secondary" />
//                 ) : (
//                     <div className="container mx-auto px-8 sm:px-4">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                             {products?.map((product, index) => (
//                                 <ProductCard key={index} product={product} />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </>
//         </section>
//     )
// }
