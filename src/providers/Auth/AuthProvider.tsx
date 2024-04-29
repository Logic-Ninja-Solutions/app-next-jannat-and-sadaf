import { PropsWithChildren } from 'react'
import { isAuthenticated } from '../../actions/auth'
import { User } from '../../types/user'
import ClientAuthProvider from './ClientAuthProvider'

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
