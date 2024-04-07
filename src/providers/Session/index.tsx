'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { isAuthenticated } from '../../actions/auth'
import { AuthAction } from '../../actions/auth/enum'
import { GetAuth } from '../../api/user'

type sessionProps = {
    children: React.ReactNode
}

const authenticatedRoutes = ['/profile']
const userRoutes = ['/login', '/signup']

function isInRoutes(url: string, routes: string[]) {
    return routes.some((route) => url.startsWith(route))
}

function AuthProvider({ children }: sessionProps) {
    const path = usePathname()
    const { isLoading, isError } = GetAuth()

    const isLoggedIn = !isError;

    const router = useRouter()

    const searchParams = useSearchParams()
    const callbackURL = searchParams.get('callbackUrl') as string


    useEffect(() => {
        if (isLoading) return;

        function isAuthorized() {

            const inAuthenticatedRoutes = isInRoutes(path, authenticatedRoutes); 
            const inUserAuthRoutes = isInRoutes(path, userRoutes);
            
            if (inAuthenticatedRoutes) {
                if (isLoggedIn) return { redirect: null }
                return {  redirect: '/login' }
            }

            if (callbackURL && isLoggedIn)
                return { redirect: callbackURL }


            if (inUserAuthRoutes) {
                if (isLoggedIn) return { redirect: '/' }
            }

            return { redirect: null }
        }

        const { redirect } = isAuthorized()

        

        if (!!redirect) {
            router.replace(redirect)
        }
    }, [callbackURL, isLoading, isLoggedIn, path, router])

    return <>{children}</>
}

export default AuthProvider
