'use server'

import { CartItem } from '@/src/types/common'
import { GuestAddress } from '../../types/address'
import { Order } from '../../types/order'
import serverInstance from '../api'
import { OrderStatus } from './enum'

interface CreateOrderProps {
    cart: CartItem[]
    addressID?: string
    finalPrice: number
    userID?: string
    paymentMethod: string
    guestAddressInfo?: GuestAddress
}

function generateOrderNumber(length: number): string {
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
    guestAddressInfo,
}: CreateOrderProps) {
    const data = {
        orderNumber: generateOrderNumber(3),
        items: cart,
        userId: userID,
        totalPrice: finalPrice,
        shippingPrice: 0,
        status: OrderStatus.PENDING,
        paymentMethod,
        addressId: addressId,
        guestAddressInfo,
    }

    const response = await serverInstance.post('order', data)
    const order = response.data

    return order
}

export async function listOrders(userID: string) {
    const response = await serverInstance.get<Order[]>(`order/user/${userID}`)
    const orders = response.data
    return orders
}
