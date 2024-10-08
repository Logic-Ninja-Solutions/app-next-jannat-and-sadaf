import { AxiosError } from 'axios'
import { z } from 'zod'
import { setAccessToken } from '.'
import { CreateUserInput } from '../../types/common'
import serverInstance from '../api'

type Credentials = {
    email: string
    password: string
}

export async function signIn(credentials: Credentials) {
    const parsedCredentials = z
        .object({
            email: z.string().email(),
            password: z.string().min(6),
        })
        .parse(credentials)

    const response = await serverInstance.post('/auth/login', parsedCredentials)
    const data = response.data
    const token = data.token

    await setAccessToken(token)
}

export async function authenticate(email: string, password: string) {
    try {
        await signIn({ email, password })
        return null
    } catch (error: any) {
        const defaultMessage = 'Something went wrong.'
        if (error instanceof AxiosError) {
            return {
                message: error?.response?.data?.message ?? defaultMessage,
            }
        }
        return {
            message: error?.message ?? defaultMessage,
        }
    }
}

export async function createUser(data: CreateUserInput) {
    const response = await serverInstance.post('/auth/signup', data)
    return response.data
}

export async function signUp(formData: CreateUserInput) {
    await createUser({
        ...formData,
        emailVerified: false,
        isStaff: false,
        isActive: true,
    })

    await signIn({
        email: formData.email,
        password: formData.password,
    })
}
