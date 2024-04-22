'use client'

import Title from '../components/core/Title/Title'
import CategoryCard from '../components/home/CategoryCard/CategoryCard'
import CollectionCard from '../components/home/CollectionCard/CollectionCard'
import NewArrivals from '../components/home/NewArrivals/NewArrivals'

function Page() {
    return (
        <>
            <Title>Collections</Title>
            <div className="mb-3" />
            <div className="container mx-auto flex gap-5 relative justify-center">
                <CollectionCard title="Collection 1" />
                <CollectionCard title="Collection 2" />
            </div>
            <div className="mt-10" />
            <Title>New Arrivals</Title>
            <div className="mb-3" />
            <NewArrivals />
            <div className="mt-10" />
            <Title>Categories</Title>
            <div className="mb-3" />
            <div className="container mx-auto flex flex-wrap justify-center">
                <div className="w-1/2 lg:w-1/4 xl:w-1/6 p-2"><CategoryCard title="Category 1" /></div>
                <div className="w-1/2 lg:w-1/4 xl:w-1/6 p-2"><CategoryCard title="Category 2" /></div>
                <div className="w-1/2 lg:w-1/4 xl:w-1/6 p-2"><CategoryCard title="Category 3" /></div>
                <div className="w-1/2 lg:w-1/4 xl:w-1/6 p-2"><CategoryCard title="Category 4" /></div>
                <div className="w-1/2 lg:w-1/4 xl:w-1/6 p-2"><CategoryCard title="Category 5" /></div>
                <div className="w-1/2 lg:w-1/4 xl:w-1/6 p-2"><CategoryCard title="Category 6" /></div>
            </div>

        </>
    )
}

export default Page
