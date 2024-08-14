import { makeCartEmpty } from '@/src/actions/cart'
import { createOrder } from '@/src/actions/order'
import { OrderActionType } from '@/src/actions/order/enum'
import { CartItem } from '@/src/types/common'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { Address, GuestAddress } from '../../../types/address'
import { CartActionType } from '../../../actions/cart/enums'

interface UseCreateOrderMutationProps {
    userID?: string
    addressID?: string
    paymentMethod: string
    cart: CartItem[]
    finalPrice: number

    guestAddressInfo?: GuestAddress
}

export function UseCreateOrderMutation({
    userID,
    addressID,
    paymentMethod,
    cart,
    finalPrice,
    guestAddressInfo,
}: UseCreateOrderMutationProps) {
    const router = useRouter()
    const client = useQueryClient();

    const mutation = useMutation({
        mutationKey: [OrderActionType.createOrder],
        mutationFn: () =>
            createOrder({
                cart,
                finalPrice,
                addressID,
                paymentMethod,
                userID,
                guestAddressInfo,
            }),
        onSuccess: async () => {
            await makeCartEmpty();
            client.invalidateQueries({
                queryKey: [CartActionType.getCart]
            })
            if (userID) {
                router.replace('/profile?orders')
            } else {
                router.replace('/success-order')
            }
        },
    })

    return mutation
}
