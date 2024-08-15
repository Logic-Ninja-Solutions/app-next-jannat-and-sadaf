'use client'

import { Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import serverInstance from '../../actions/api'
import { listCollections } from '../../actions/collections'
import { Product } from '../../types/product'
import Title from '../core/Title/Title'
import CollectionCard from './CollectionCard/CollectionCard'
import NewArrivals from './NewArrivals/NewArrivals'

function HomePage() {
    const { data: collections, isLoading: isLoadingCollections } = useQuery({
        queryKey: ['collection-list'],
        queryFn: () => listCollections(),
    })

    const { data: newArrivals, isLoading: isLoadingNewArrivals } = useQuery({
        queryKey: ['new-arrivals'],
        queryFn: async () => {
            const response = await serverInstance.get<{ products: Product[] }>(
                'product/new-arrivals'
            )
            return response.data?.products ?? []
        },
    })

    if (isLoadingCollections) {
        return (
            <div className="flex items-center justify-center">
                <Spinner color="secondary" />
            </div>
        )
    }

    return (
        <>
            <Title>Collections</Title>
            <div className="mb-3" />
            <div className="container mx-auto flex flex-wrap gap-5 relative justify-center">
                {(collections ?? [])?.map((collection) => (
                    <div
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                        key={collection.id}
                    >
                        <CollectionCard collection={collection} />
                    </div>
                ))}
            </div>
            <div className="mt-10" />
            {isLoadingNewArrivals || newArrivals?.length === 0 ? null : (
                <>
                    <Title>New Arrivals</Title>
                    <div className="mb-3" />
                    <NewArrivals products={newArrivals ?? []} />
                </>
            )}
            <div className="mt-10" />
        </>
    )
}

export default HomePage
