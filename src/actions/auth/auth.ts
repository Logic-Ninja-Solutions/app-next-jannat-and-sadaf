import serverInstance from '../api'
import AuthUser from './models/auth.user'

export async function isAuthenticated() {
    const response = await serverInstance.get<{ user: AuthUser }>('auth')
    return response.data
}
