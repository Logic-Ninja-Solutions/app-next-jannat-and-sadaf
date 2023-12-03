'use server'

import { prisma } from '@/server'
import Types, { UserWithAddresses } from '@/src/types/prisma'

export async function getUserData(email?: string | null) {
    if (!email) return null
    const user = await prisma.user.findUnique({
        where: { email },
        include: { addresses: true },
    })
    return user
}

async function updateDefaultAddress(
    addresses: Types.Address[],
    address: Types.Address
) {
    const defaultAddress = addresses.find((address) => address.isDefault)
    if (address.isDefault && defaultAddress) {
        await prisma.address.update({
            where: { id: defaultAddress.id },
            data: { isDefault: false },
        })
    }
}

export async function updateAddress(
    user: UserWithAddresses,
    address: Types.Address
) {
    await updateDefaultAddress(user.addresses, address)
    const updatedData = {
        ...address,
        id: undefined,
    }
    const data = await prisma.address.update({
        where: { id: address.id },
        data: updatedData,
    })
    return data
}

export async function addAddress(
    user: UserWithAddresses,
    address: Types.Address
) {
    await updateDefaultAddress(user.addresses, address)
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        include: { addresses: true },
        data: {
            addresses: {
                create: address,
            },
        },
    })
    return updatedUser
}

export async function deleteAddress(
    user: UserWithAddresses,
    address: Types.Address
) {
    const data = await prisma.address.delete({
        where: { id: address.id },
    })

    if (address.isDefault) {
        const randomAddress = user.addresses.find(
            (address) => address.id !== data.id
        )
        if (randomAddress) {
            await prisma.address.update({
                where: { id: randomAddress.id },
                data: { isDefault: true },
            })
            return {
                deletedAddress: data,
                newDefaultAddress: randomAddress,
            }
        }
    }
    return { deletedAddress: data }
}
