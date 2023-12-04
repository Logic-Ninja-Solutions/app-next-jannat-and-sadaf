'use client'

import { isAuthenticated } from '@/src/actions/auth'
import { AuthAction } from '@/src/actions/auth/enum'
import { getCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { getUserData } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import CartInfo from '@/src/components/checkout/CartInfo'
import UserInfo from '@/src/components/checkout/UserInfo'
import { Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'

export default function Checkout() {
    const { data: cart, isLoading: isCartLoading } = useQuery({
        queryKey: [CartActionType.getCart],
        queryFn: getCart,
    })

    const {
        data: auth,
        isSuccess: isAuthSuccess,
        isLoading: isAuthLoading,
    } = useQuery({
        queryKey: [AuthAction.auth],
        queryFn: isAuthenticated,
    })

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: [ProfileAction.getUser],
        queryFn: () => getUserData(auth?.user?.email),
        enabled: isAuthSuccess && !!auth,
    })

    if (isCartLoading || isAuthLoading || isUserLoading)
        return <Spinner color="secondary" />

    return (
        <>
            <div className="flex justify-center items-center h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                    <div className="mb-4 md:mb-0 h-full col-span-2 md:col-span-2">
                        <UserInfo userData={userData} />
                    </div>
                    <div className="h-full col-span-2 md:col-span-1">
                        <CartInfo cart={cart} />
                    </div>
                </div>
            </div>
        </>
    )
}
