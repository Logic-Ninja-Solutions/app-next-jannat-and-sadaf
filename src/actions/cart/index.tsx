import { CartItem } from '@/src/types/common'
import { getCookie, setCookie } from '@/src/utils/cookie'

export async function changeCartProductQuantity(cartItem: {
    productID: string
    quantity: number
}) {
    const { productID, quantity } = cartItem
    const cart: CartItem[] = await getCookie<CartItem[]>('cart', [])
    const productIndex = cart.findIndex((item) => item.itemID === productID)

    if (productIndex === -1) return

    cart[productIndex].quantity = quantity

    setCookie('cart', cart)

    return cart
}

export async function addToCart(cartItem: CartItem) {
    const cart: CartItem[] = await getCookie<CartItem[]>('cart', [])
    const itemIndex = cart.findIndex((item) => item.itemID === cartItem.itemID)

    if (itemIndex === -1) {
        cart.push(cartItem)
    } else {
        cart[itemIndex].quantity += cartItem.quantity
    }

    setCookie('cart', cart)

    return cart
}

export async function removeFromCart(itemID: string): Promise<string | null> {
    const cart: CartItem[] = await getCookie<CartItem[]>('cart', [])
    const itemIndex = cart.findIndex((item) => item.itemID === itemID)
    if (itemIndex === -1) return null
    cart.splice(itemIndex, 1)

    setCookie('cart', cart)

    return itemID
}

export async function makeCartEmpty() {
    await setCookie('cart', [])
}

export async function getCart(): Promise<CartItem[]> {
    const data = await getCookie<CartItem[]>('cart', [])
    return data
}
