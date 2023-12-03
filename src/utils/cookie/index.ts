'use server'

import { cookies } from 'next/headers'

export async function getCookie<T>(key: string, fallback: T): Promise<T> {
    const cookieStore = cookies()
    const cookie = cookieStore.get(key)
    return cookie ? JSON.parse(cookie.value) : fallback
}

export async function setCookie<T>(key: string, value: T) {
    const cookieStore = cookies()
    cookieStore.set(key, JSON.stringify(value))
}
