'use server'

import { CreateUserInput } from '@/src/types/common'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { User } from '../../types/user'
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
        .safeParse(credentials)

    if (parsedCredentials.success) {
        const response = await serverInstance.post(
            '/auth/login',
            parsedCredentials.data
        )
        const data = response.data
        const token = data.token

        if (token) {
            cookies().set('token', data.token)
        }
    }
}

export async function isAuthenticated() {
    const response = await serverInstance.get<{ user: User }>('auth')
    return response.data
}

export async function getAccessToken() {
    return cookies().get('token')?.value
}

export async function unauthenticate() {
    cookies().delete('token')
}

export async function authenticate(
    prevState: string | undefined | null,
    formData: FormData
) {
    try {
        await signIn({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        })

        return null
    } catch (error: any) {
        return error?.message ?? 'Something went wrong.'
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
