'use client'

import { ProductActionType } from '../../../actions/product/enums'
import ProductGrid from '../../../app/ProductGrid/page'
import { usePaginatedInfiniteQuery } from '../../../hooks/paginatedQuery'
import { Product } from '../../../types/product'

type Props = {
    collection: string
}

function CollectionProducts({ collection }: Props) {
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        usePaginatedInfiniteQuery<Product>(
            [ProductActionType.fetchProducts, collection],
            `product/collection/${collection}`
        )

    return (
        <>
            <ProductGrid
                products={data?.pages.flatMap((page) => page.items) || []}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                onFetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
            />
        </>
    )
}

export default CollectionProducts
