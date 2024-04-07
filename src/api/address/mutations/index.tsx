import { addAddress, deleteAddress, updateAddress } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Address } from '../../../types/address'
import { User } from '../../../types/user'

interface AddressMutationProps {
    userData?: User | null
    onSuccessfulMutation?: () => void
}

export function UseUpdateAddressMutation({
    userData,
    onSuccessfulMutation,
}: AddressMutationProps) {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: [ProfileAction.updateAddress],
        mutationFn: async (data: Address) => {
            return updateAddress(userData!, data)
        },
        onSuccess: (updatedUser: { user: User }) => {
            onSuccessfulMutation?.()
            queryClient.setQueryData([ProfileAction.getUser], updatedUser)
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
        mutationFn: async (data: Address) => {
            return addAddress(userData!, data)
        },
        onSuccess: (data: { user: User }) => {
            onSuccessfulMutation?.()
            queryClient.setQueryData([ProfileAction.getUser], data)
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
        mutationFn: (data: Address) => {
            return deleteAddress(userData!, data)
        },
        onSuccess: ({ deletedAddress, newDefaultAddress }) => {
            onSuccessfulMutation?.()
            queryClient.setQueryData(
                [ProfileAction.getUser],
                (oldData: { user: User }) => {
                    
                    const updatedAddresses = oldData.user.addresses?.filter(
                        (address) => {
                            return address.id !== deletedAddress?.id
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
                        user: {
                            ...oldData,
                            addresses: updatedAddresses,
                        },
                    }
                }
            )
        },
    })
    return mutation
}
