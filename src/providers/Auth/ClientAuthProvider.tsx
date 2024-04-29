'use client'

import { redirect, usePathname, useSearchParams } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import { User } from '../../types/user'

type AuthProviderProps = PropsWithChildren & {
    user?: User
}

const authenticatedRoutes = ['/profile']
const userRoutes = ['/login', '/signup']

function isInRoutes(url: string, routes: string[]) {
    return routes.some((route) => url.startsWith(route))
}

function ClientAuthProvider({ children, user }: AuthProviderProps) {
    const path = usePathname()
    const isLoggedIn = !!user
    const inAuthenticatedRoutes = isInRoutes(path, authenticatedRoutes)
    const inUserAuthRoutes = isInRoutes(path, userRoutes)

    const searchParams = useSearchParams()
    const callbackURL = searchParams.get('callbackUrl') as string

    if (inAuthenticatedRoutes && !isLoggedIn) {
        return redirect(`/login?callbackUrl=${path}`)
    }

    if (inUserAuthRoutes && isLoggedIn) {
        return redirect(callbackURL ?? '/')
    }

    return <>{children}</>
}

export default ClientAuthProvider
