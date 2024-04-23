import serverInstance from '../api'

export interface Collection {
    slug: string
    id: string
    title: string
    image: string
}

export async function listCollections() {
    const response = await serverInstance.get<{data: Collection[]}>('collection')
    const collections = response.data?.data ?? []
    return collections
}
