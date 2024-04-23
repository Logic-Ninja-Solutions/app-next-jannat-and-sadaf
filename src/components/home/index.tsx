'use client';

import { Collection } from '../../actions/collections'
import Title from '../core/Title/Title'
import CollectionCard from './CollectionCard/CollectionCard'
import NewArrivals from './NewArrivals/NewArrivals'

type HomePageProps = {
    collections: Collection[]
}

function HomePage({ collections }: HomePageProps) {
    return (
        <>
            <Title>Collections</Title>
            <div className="mb-3" />
            <div className="container mx-auto flex gap-5 relative justify-center">
                {
                    collections.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))
                }
            </div>
            <div className="mt-10" />
            <Title>New Arrivals</Title>
            <div className="mb-3" />
            <NewArrivals />
            <div className="mt-10" />
        </>
    )
}

export default HomePage
