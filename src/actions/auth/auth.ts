import { User } from '../../types/user'
import serverInstance from '../api'

export async function isAuthenticated() {
    const response = await serverInstance.get<{ user: User }>('auth')
    return response.data
}
