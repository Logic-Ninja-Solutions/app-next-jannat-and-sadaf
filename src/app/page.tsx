'use client'

import Title from '../components/core/Title/Title'
import CategoryCard from '../components/home/CategoryCard/CategoryCard'
import NewArrivals from '../components/home/NewArrivals/NewArrivals'

function Page() {
    return (
        <>
            <Title>New Arrivals</Title>
            <div className="mb-3" />
            <NewArrivals />
            <div className="mt-10" />
            <Title>Categories</Title>
            <div className="mb-3" />
            <div className="container mx-auto flex gap-5 relative justify-center">
                <CategoryCard title="Hello 1" />
                <CategoryCard title="Hello 2" />
            </div>
        </>
    )
}

export default Page
