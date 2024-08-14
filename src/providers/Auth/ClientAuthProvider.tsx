'use client'

import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { PropsWithChildren } from 'react'
import AuthUser from '../../actions/auth/models/auth.user'
import UserProvider from './UserProvider'

type AuthProviderProps = PropsWithChildren & {
    user?: AuthUser
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

    return <UserProvider user={user}>{children}</UserProvider>
}

export default ClientAuthProvider
