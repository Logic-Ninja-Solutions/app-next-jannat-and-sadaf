import { useInfiniteQuery } from '@tanstack/react-query'
import serverInstance from '../../actions/api'

interface PaginatedData<T> {
    data: T[]
    total: number
    hasNextPage: boolean
}

export const DEFAULT_PAGE_SIZE = 8

export function usePaginatedInfiniteQuery<T>(
    queryKey: string[],
    fetchApi: string
) {
    async function fetchPaginatedData({
        pageParam,
    }: {
        pageParam: string | null
    }) {
        const response = await serverInstance.get<PaginatedData<T>>(fetchApi, {
            params: {
                skip: pageParam,
                take: DEFAULT_PAGE_SIZE,
            },
        })

        const { data, total, hasNextPage } = response.data

        return {
            items: data,
            total,
            hasNextPage,
        }
    }

    return useInfiniteQuery({
        queryKey,
        queryFn: fetchPaginatedData,
        initialPageParam: null,
        getNextPageParam: (lastPage, pages) => {
            const itemsFetchedSoFar = pages.reduce(
                (acc, page) => acc + page.items.length,
                0
            )
            if (itemsFetchedSoFar >= lastPage.total) {
                return null
            }
            return itemsFetchedSoFar.toString()
        },
        staleTime: Infinity,
    })
}
