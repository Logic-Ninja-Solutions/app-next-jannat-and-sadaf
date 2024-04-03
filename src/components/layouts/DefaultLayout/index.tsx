'use client'

import { useDisclosure } from '@nextui-org/react'
import CartDrawer from '../../cart/drawer'
import { Navbar } from '../../core/Navbar'
import React from 'react'

interface CartDrawerContextProps {
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
    cartOpenChange: (open: boolean) => void
}

export const CartDrawerContext = React.createContext<CartDrawerContextProps>(
    undefined!
)

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const {
        isOpen: isCartOpen,
        onOpen: openCart,
        onClose: closeCart,
        onOpenChange: onCartOpenChange,
    } = useDisclosure()

    return (
        <div className="relative">
            <CartDrawerContext.Provider
                value={{
                    isCartOpen: isCartOpen,
                    openCart: openCart,
                    closeCart: closeCart,
                    cartOpenChange: onCartOpenChange,
                }}
            >
                <CartDrawer
                    isOpen={isCartOpen}
                    onClose={closeCart}
                    onOpenChange={onCartOpenChange}
                />
                <Navbar />
                {children}
            </CartDrawerContext.Provider>
        </div>
    )
}
