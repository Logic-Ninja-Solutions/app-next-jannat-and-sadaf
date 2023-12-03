'use server'

import { prisma } from '@/server'

export async function getUserData(email?: string | null) {
    if (!email) return null
    const user = await prisma.user.findUnique({
        where: { email },
    })
    return user
}
