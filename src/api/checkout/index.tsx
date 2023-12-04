import { makeCartEmpty } from '@/src/actions/cart'
import { createOrder } from '@/src/actions/checkout'
import { CheckoutActionType } from '@/src/actions/checkout/enum'
import { CartItem } from '@/src/types/prisma'
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
        mutationKey: [CheckoutActionType.createOrder],
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
            router.replace('/profile')
        },
    })

    return mutation
}
