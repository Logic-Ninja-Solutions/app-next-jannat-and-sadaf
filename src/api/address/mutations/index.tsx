import { addAddress, deleteAddress, updateAddress } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import Types, { UserWithAddresses } from '@/src/types/prisma'
import { User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface AddressMutationProps {
    userData?: UserWithAddresses | null
    onSuccessfulMutation?: () => void
}

export function UseUpdateAddressMutation({
    userData,
    onSuccessfulMutation,
}: AddressMutationProps) {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: [ProfileAction.updateAddress],
        mutationFn: async (data: Types.Address) => {
            return updateAddress(userData!, data)
        },

        onSuccess: (updatedAddress: Types.Address) => {
            onSuccessfulMutation?.()
            queryClient.setQueryData(
                [ProfileAction.getUser],
                (user: UserWithAddresses) => {
                    const updatedAddresses = user.addresses?.map((address) => {
                        if (address.id === updatedAddress.id) {
                            return updatedAddress
                        }
                        if (address.isDefault && updatedAddress.isDefault) {
                            return {
                                ...address,
                                isDefault: false,
                            }
                        }
                        return address
                    })

                    return {
                        ...user,
                        addresses: updatedAddresses,
                    }
                }
            )
        },
    })

    return mutation
}

export function UseCreateAddressMutation({
    userData,
    onSuccessfulMutation,
}: AddressMutationProps) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: [ProfileAction.addAddress],
        mutationFn: async (data: Types.Address) => {
            return addAddress(userData!, data)
        },
        onSuccess: (data: User) => {
            onSuccessfulMutation?.()
            queryClient.setQueryData([ProfileAction.getUser], () => {
                return data
            })
        },
    })

    return mutation
}

export function UseDeleteAddressMutation({
    userData,
    onSuccessfulMutation,
}: AddressMutationProps) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: [ProfileAction.addAddress],
        mutationFn: async (data: Types.Address) => {
            return deleteAddress(userData!, data)
        },
        onSuccess: ({ deletedAddress, newDefaultAddress }) => {
            onSuccessfulMutation?.()
            queryClient.setQueryData(
                [ProfileAction.getUser],
                (oldData: UserWithAddresses) => {
                    const updatedAddresses = oldData.addresses?.filter(
                        (address) => {
                            return address.id !== deletedAddress.id
                        }
                    )
                    if (newDefaultAddress) {
                        updatedAddresses?.forEach((address) => {
                            if (address.id === newDefaultAddress.id) {
                                address.isDefault = true
                            }
                        })
                    }
                    return {
                        ...oldData,
                        addresses: updatedAddresses,
                    }
                }
            )
        },
    })
    return mutation
}
