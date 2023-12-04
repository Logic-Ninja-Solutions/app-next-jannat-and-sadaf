'use server'

import { prisma } from '@/server'
import { auth, signIn, signOut } from '@/src/auth'
import Types, { CreateUserInput } from '@/src/types/prisma'
import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import * as bcrypt from 'bcryptjs'

export async function isAuthenticated() {
    return await auth()
}

export async function unauthenticate() {
    await signOut()
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

export async function createUser(data: CreateUserInput) {
    const userExists = await prisma.user.findUnique({
        where: { email: data.email },
    })
    if (userExists) {
        throw new Error('User already exists.')
    }
    const user = await prisma.user.create({ data })
    console.log('Successfully created user: ', user)
    return user
}

export async function signUp(formData: CreateUserInput) {
    try {
        await createUser({
            ...formData,
            emailVerified: false,
            isStaff: false,
            isActive: true,
            password: await bcrypt.hash(formData.password, 10),
        })

        await signIn('credentials', {
            email: formData.email,
            password: formData.password,
        })
    } catch (error) {
        if (error instanceof AuthError) {
        }
        console.log(error)
        throw error
    }
}
