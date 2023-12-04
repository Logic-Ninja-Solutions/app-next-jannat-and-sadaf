'use client'

import { isAuthenticated } from '@/src/actions/auth'
import { AuthAction } from '@/src/actions/auth/enum'
import { getCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { getUserData } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { subtitle, title } from '@/src/components/primitives'
import { formatPrice } from '@/src/models/product'
import { CartItem, UserWithAddresses } from '@/src/types/prisma'
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
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'

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

interface UserInfoProps {
    userData: UserWithAddresses
}

function UserInfo({ userData }: UserInfoProps) {
    return (
        <Card>
            <CardBody className="p-unit-md">
                <Accordion>
                    <AccordionItem key="1" aria-label="Account" title="Account">
                        <div className="flex justify-between align-middle items-center ">
                            <p>
                                Email: <span>{userData.email}</span>
                            </p>
                            <Button>Logout</Button>
                        </div>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Address" title="Address">
                        <RadioGroup
                            color="secondary"
                            label="Select your address"
                            className="w-ful"
                        >
                            {userData.addresses.map((address, index) => {
                                return (
                                    <>
                                        <Radio
                                            key={index}
                                            value={address.id}
                                            className="mb-5"
                                        >
                                            <Card shadow="lg" className="w-96">
                                                <CardBody>
                                                    <p>
                                                        {address.addressLine1}
                                                    </p>
                                                    <p>
                                                        {address.addressLine2}
                                                    </p>
                                                    <p>
                                                        {address.city},{' '}
                                                        {address.zipCode}
                                                    </p>
                                                </CardBody>
                                            </Card>
                                        </Radio>
                                    </>
                                )
                            })}
                        </RadioGroup>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    )
}

export default function Checkout() {
    const { data: cart } = useQuery({
        queryKey: [CartActionType.getCart],
        queryFn: getCart,
    })

    const { data: auth, isSuccess: isAuthSuccess } = useQuery({
        queryKey: [AuthAction.auth],
        queryFn: isAuthenticated,
    })

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: [ProfileAction.getUser],
        queryFn: () => getUserData(auth?.user?.email),
        enabled: isAuthSuccess && !!auth,
    })

    if (!cart || !userData) return <Spinner />

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
