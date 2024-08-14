'use client'

import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'
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

    const router = useRouter()

    useEffect(() => {
        if (inAuthenticatedRoutes && !isLoggedIn) {
            router.replace(`/login?callbackUrl=${path}`)
        }

        if (inUserAuthRoutes && isLoggedIn) {
            router.replace(callbackURL ?? '/')
        }
    }, [isLoggedIn, inAuthenticatedRoutes, inUserAuthRoutes, path, router, callbackURL])

    return <UserProvider user={user}>{children}</UserProvider>
}

export default ClientAuthProvider
