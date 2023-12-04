'use server'

import { prisma } from '@/server'
import { CartItem } from '@/src/types/prisma'
import { OrderStatus } from './enum'

interface CreateOrderProps {
    cart: CartItem[]
    addressID: string
    finalPrice: number
    userID?: string
    paymentMethod: string
}

function generateOrderNumber(length: number) {
    function getRandomChars(count: number) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
        return Array.from(
            { length: count },
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join('')
    }

    const firstPart = getRandomChars(length)
    const secondPart = getRandomChars(length)
    const thirdPart = getRandomChars(length)

    const result = `${firstPart}-${secondPart}-${thirdPart}`
    return result
}
export async function createOrder({
    cart,
    finalPrice,
    userID,
    addressID: addressId,
    paymentMethod,
}: CreateOrderProps) {
    const order = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(3),
            items: cart,
            userId: userID,
            totalPrice: finalPrice,
            shippingPrice: 0,
            status: OrderStatus.CANCELLED,
            paymentMethod,
            addressId: addressId,
        },
    })

    return order
}
