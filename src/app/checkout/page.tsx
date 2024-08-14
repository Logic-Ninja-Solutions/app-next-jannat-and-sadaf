'use client'

import { getCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { paymentMethods, shippingMethods } from '@/src/actions/order/constants'
import { getUserData } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { UseCreateOrderMutation } from '@/src/api/order/mutations'
import CartInfo from '@/src/components/checkout/CartInfo'
import UserInfo from '@/src/components/checkout/UserInfo'
import { Button, Link, Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserContext } from '../../providers/Auth/UserProvider'
import { GuestAddress } from '../../types/address'
import { showErrorToast } from '../../utils/toaster'

export default function Checkout() {
    const { data: cart, isLoading: isCartLoading } = useQuery({
        queryKey: [CartActionType.getCart],
        queryFn: getCart,
    })

    const { user: authenticatedUser } = useUserContext()
    const auth = { user: authenticatedUser }

    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: [ProfileAction.getUser],
        queryFn: () => getUserData(auth?.user?.email),
        enabled: !!authenticatedUser,
        staleTime: 0,
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

    const {
        control: guestAddressFormControl,
        getValues: guestAddressGetValues,
        handleSubmit: guestAddressHandleSubmit,
        setValue,
        formState: {
            isValid: guestAddressFormIsValid,
            errors: guestAddressFormErrors,
        },
    } = useForm<GuestAddress>({})

    const orderMutation = UseCreateOrderMutation({
        userID: userData?.id,
        addressID: selectedAddressID,
        paymentMethod: selectedPaymentMethod,
        cart: cart!,
        finalPrice: price,
        guestAddressInfo: guestAddressGetValues(),
    })

    async function onCreateOrder() {
        if (userData && !selectedAddressID) {
            showErrorToast('Please select an address')
            return
        }
        if (!selectedShippingMethod) {
            showErrorToast('Please select a shipping method')
            return
        }
        if (!userData) {
            const values = guestAddressGetValues()
            if (!values.guestEmail || values.guestEmail === '') {
                showErrorToast('Please provide an email')
                return
            }

            if (!guestAddressFormIsValid) {
                showErrorToast(
                    'Please fill all required fields in the address form'
                )
                return
            }
        }

        console.log('Creating order')
        await orderMutation.mutateAsync()
    }

    if (isCartLoading || isUserLoading) {
        return (
            <div className="flex items-center justify-center">
                <Spinner color="secondary" />
            </div>
        )
    }

    if (cart?.length === 0)
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col gap-5 items-center">
                    <p>Your cart is empty</p>
                    <Button href="/" as={Link}>
                        Continue Shopping
                    </Button>
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
                            guestAddressFormControl={guestAddressFormControl}
                        />
                    </div>
                    <div className="h-full col-span-2 md:col-span-1">
                        <CartInfo cart={cart} totalPrice={price} />
                        {!userData && (
                            <Button as={Link} href="/login">
                                Login Here
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
