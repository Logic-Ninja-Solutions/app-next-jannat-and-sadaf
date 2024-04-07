import { makeCartEmpty } from '@/src/actions/cart'
import { createOrder } from '@/src/actions/order'
import { OrderActionType } from '@/src/actions/order/enum'
import { CartItem } from '@/src/types/common'
import { useMutation } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'

interface UseCreateOrderMutationProps {
    userID: string
    addressID: string
    paymentMethod: string
    cart: CartItem[]
    finalPrice: number
}

export function UseCreateOrderMutation({
    userID,
    addressID,
    paymentMethod,
    cart,
    finalPrice,
}: UseCreateOrderMutationProps) {
    const router = useRouter()
    const mutation = useMutation({
        mutationKey: [OrderActionType.createOrder],
        mutationFn: () =>
            createOrder({
                cart,
                finalPrice,
                addressID,
                paymentMethod,
                userID,
            }),
        onSuccess: () => {
            makeCartEmpty()
            router.replace('/profile?orders')
        },
    })

    return mutation
}
