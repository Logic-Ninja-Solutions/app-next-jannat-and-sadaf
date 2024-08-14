'use server'

import { cookies } from 'next/headers'

export async function setAccessToken(token: string) {
    cookies().set('token', token)
}

export async function getAccessToken() {
    return cookies().get('token')?.value
}

export async function unauthenticate() {
    cookies().delete('token')
}
