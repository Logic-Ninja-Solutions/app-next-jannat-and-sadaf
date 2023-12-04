'use client'

import { isAuthenticated } from '@/src/actions/auth'
import { AuthAction } from '@/src/actions/auth/enum'
import { getCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { getUserData, updateAddress } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { UseUpdateAddressMutation } from '@/src/api/address/mutations'
import UserInfo from '@/src/components/checkout/UserInfo'
import { subtitle, title } from '@/src/components/primitives'
import AddressModal from '@/src/components/profile/AddAddressModal'
import AddressForm from '@/src/components/profile/AddressForm'
import { formatPrice } from '@/src/models/product'
import Types, { CartItem, UserWithAddresses } from '@/src/types/prisma'
import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody,
    Image,
    Radio,
    RadioGroup,
    Spinner,
    useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'

interface CartInfoProps {
    cart?: CartItem[]
}

function CartInfo({ cart }: CartInfoProps) {
    return (
        <div>
            {cart?.map((item, index) => {
                return (
                    <Card key={index} className="w-fit p-unit-md mb-5">
                        <CardBody>
                            <div className="flex gap-5">
                                <Image
                                    src={item.image}
                                    alt="Product Image"
                                    className="w-32 h-36 object-cover"
                                />
                                <div>
                                    <p className={title()}>{item.title}</p>
                                    <p className={subtitle()}>
                                        {item.variant.size}
                                    </p>
                                    <p>{formatPrice(item.variant.price)}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}

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
