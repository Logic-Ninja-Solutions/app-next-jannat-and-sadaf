import { PropsWithChildren } from 'react'
import { User } from '../../types/user'
import ClientAuthProvider from './ClientAuthProvider'
import { isAuthenticated } from '../../actions/auth/auth'

type AuthProviderProps = PropsWithChildren

async function AuthProvider({ children }: AuthProviderProps) {
    let user: User | undefined
    await isAuthenticated()
        .then((res) => {
            user = res.user
        })
        .catch(() => {
            user = undefined
        })

    return <ClientAuthProvider user={user}>{children}</ClientAuthProvider>
}

export default AuthProvider
