'use client'

import { useQuery } from '@tanstack/react-query'
import { Collection } from '../../actions/collections'
import Title from '../core/Title/Title'
import CollectionCard from './CollectionCard/CollectionCard'
import NewArrivals from './NewArrivals/NewArrivals'
import serverInstance from '../../actions/api'
import { Product } from '../../types/product'

type HomePageProps = {
    collections: Collection[]
}

function HomePage({ collections }: HomePageProps) {
    const { data: newArrivals, isLoading: isLoadingNewArrivals } = useQuery({
        queryKey: ['new-arrivals'],
        queryFn: async () => {
            const response = await serverInstance.get<{ products: Product[] }>(
                'product/new-arrivals'
            )
            return response.data?.products ?? []
        },
    })

    return (
        <>
            <Title>Collections</Title>
            <div className="mb-3" />
            <div className="container mx-auto flex gap-5 relative justify-center">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                    />
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
