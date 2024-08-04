'use client'

import { AuthAction } from '@/src/actions/auth/enum'
import { getCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { paymentMethods, shippingMethods } from '@/src/actions/order/constants'
import { getUserData } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { UseCreateOrderMutation } from '@/src/api/order/mutations'
import CartInfo from '@/src/components/checkout/CartInfo'
import UserInfo from '@/src/components/checkout/UserInfo'
import { Spinner, Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { isAuthenticated } from '../../actions/auth/auth'

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

    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: [ProfileAction.getUser],
        queryFn: () => getUserData(auth?.user?.email),
        enabled: isAuthSuccess && !!auth,
    })

    const userData = user?.user

    const [selectedAddressID, setSelectedAddressID] = useState<
        string | undefined
    >()

    const [selectedShippingMethod, setSelectedShippingMethod] =
        useState<string>(shippingMethods[0].label)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
        paymentMethods[0].label
    )

    const defaultAddress = userData?.addresses.find(
        (address) => address.isDefault
    )

    useEffect(() => {
        if (defaultAddress) {
            setSelectedAddressID(defaultAddress.id)
        }
    }, [defaultAddress])

    const price = cart?.reduce((acc, curr) => acc + curr.variant.price, 0) || 0
    const orderMutation = UseCreateOrderMutation({
        userID: userData?.id!,
        addressID: selectedAddressID!,
        paymentMethod: 'Cash on Delivery',
        cart: cart!,
        finalPrice: price,
    })

    async function onCreateOrder() {
        if (!userData?.id) return null
        await orderMutation.mutateAsync()
    }

    if (isCartLoading || isAuthLoading || isUserLoading)
        return <Spinner color="secondary" />

    if (cart?.length === 0)
        return (
            <div className="m-auto">
                <p>Your cart is empty</p>
            </div>
        )

    if (!userData?.id)
        return (
            <div className="m-auto">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <p>You need to be signed in to continue</p>
                    <div className="flex justify-center mt-5">
                        <Button as={Link} href="/login">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        )

    return (
        <>
            <div className="flex justify-center items-center h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                    <div className="mb-4 md:mb-0 h-full col-span-2 md:col-span-2">
                        <UserInfo
                            isLoading={orderMutation.isPending}
                            onCreateOrder={onCreateOrder}
                            selectedAddressID={selectedAddressID}
                            setSelectedAddressID={setSelectedAddressID}
                            selectedShippingMethod={selectedShippingMethod}
                            setSelectedShippingMethod={
                                setSelectedShippingMethod
                            }
                            selectedPaymentMethod={selectedPaymentMethod}
                            setSelectedPaymentMethod={setSelectedPaymentMethod}
                            userData={userData}
                        />
                    </div>
                    <div className="h-full col-span-2 md:col-span-1">
                        <CartInfo cart={cart} totalPrice={price} />
                    </div>
                </div>
            </div>
        </>
    )
}
