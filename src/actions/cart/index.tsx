import { CartItem } from '@/src/types/cart'
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
    const productIndex = cart.findIndex(
        (item) => item.itemID === cartItem.itemID
    )

    if (productIndex === -1) {
        cart.push(cartItem)
    } else {
        cart[productIndex].quantity += cartItem.quantity
    }

    setCookie('cart', cart)

    return cart
}

export async function removeFromCart(productID: string) {
    const cart: CartItem[] = await getCookie<CartItem[]>('cart', [])
    const productIndex = cart.findIndex((item) => item.itemID === productID)

    if (productIndex === -1) return

    cart.splice(productIndex, 1)

    setCookie('cart', cart)
}

export async function getCart(): Promise<CartItem[]> {
    const data = await getCookie<CartItem[]>('cart', [])
    return data
}
