import React from 'react'
import CollectionProducts from '../../../components/collection/CollectionProducts/CollectionProducts'

type Props = {
    params: {
        name: string
    }
}

async function Page({ params }: Props) {
    const { name } = params
    return (
        <>
            <CollectionProducts collection={name} />
        </>
    )
}

export default Page
