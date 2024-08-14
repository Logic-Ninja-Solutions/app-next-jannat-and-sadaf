import { PropsWithChildren } from 'react'
import ClientAuthProvider from './ClientAuthProvider'
import { isAuthenticated } from '../../actions/auth/auth'
import AuthUser from '../../actions/auth/models/auth.user'

type AuthProviderProps = PropsWithChildren

async function AuthProvider({ children }: AuthProviderProps) {
    let user: AuthUser | undefined
    await isAuthenticated()
        .then((res) => {
            user = res.user
        })
        .catch(() => {
            user = undefined
        })

    return (
        <ClientAuthProvider key={user?.email} user={user}>
            {children}
        </ClientAuthProvider>
    )
}

export default AuthProvider
