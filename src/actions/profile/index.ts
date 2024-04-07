'use server'

import { UserUpdateInput } from '@/src/types/common'
import { Address } from '../../types/address'
import { User } from '../../types/user'
import serverInstance from '../api'

export async function getUserData(email?: string | null) {
    if (!email) return null
    const response = await serverInstance.get<{ user: User }>(
        `/user/email/${email}`
    )

    const user = response.data
    return user
}

export async function updateAddress(user: User, address: Address) {
    const response = await serverInstance.patch<{ user: User }>(
        `user/address/${user.id}`,
        address
    )
    return response.data
}

export async function addAddress(user: User, address: Address) {
    const response = await serverInstance.patch<{ user: User }>(
        `user/address/${user.id}`,
        address
    )
    return response.data
}

export async function deleteAddress(user: User, address: Address) {
    const response = await serverInstance.delete<{
        newDefaultAddress: Address
        deletedAddress: Address
    }>(`user/address/${user.id}/${address.id}`)
    const data = response.data

    return data
}

export async function updateProfile(id: string, data: UserUpdateInput) {
    const response = await serverInstance.patch<{ user: User }>(
        `user/${id}`,
        data
    )
    const updatedUser = response.data
    return updatedUser
}
