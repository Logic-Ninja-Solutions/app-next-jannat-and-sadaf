'use server'

import { CreateUserInput } from '@/src/types/common'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { z } from 'zod'
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

    if (!parsedCredentials.success) {
        throw new Error('Invalid credentials')
    }

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

export async function getAccessToken() {
    return cookies().get('token')?.value
}

export async function unauthenticate() {
    cookies().delete('token')
}

export async function authenticate(
    prevState: { message: string } | null,
    formData: FormData
) {
    try {
        await signIn({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        })

        return null
    } catch (error: any) {
        const defaultMessage = 'Something went wrong.'
        if (error instanceof AxiosError)
            return {
                message: error?.response?.data?.message ?? defaultMessage,
            }
        if (error instanceof Error)
            return {
                message: error?.message ?? defaultMessage,
            }

        return {
            message: defaultMessage,
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
