'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthAction } from '../../actions/auth/enum'
import { isAuthenticated } from '../../actions/auth/auth'

export function GetCachedAuth(): any {
    const client = useQueryClient()
    const user = client.getQueryData([AuthAction.auth])
    return user
}

export function GetAuth() {
    return useQuery({
        queryKey: [AuthAction.auth],
        queryFn: isAuthenticated,
    })
}
