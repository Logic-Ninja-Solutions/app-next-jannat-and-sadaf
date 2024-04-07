import { formatPrice } from '@/src/models/product'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Image,
} from '@nextui-org/react'

import { title, subtitle } from '../../primitives'
import clsx from 'clsx'
import { CartItem } from '../../../types/order'

interface CartInfoProps {
    cart?: CartItem[]
    totalPrice: number
}

export default function CartInfo({ cart, totalPrice }: CartInfoProps) {
    return (
        <div>
            <Card isFooterBlurred className="mb-3">
                <CardHeader>
                    <p className={clsx(title({ size: 'sm' }), 'underline')}>
                        Order Summary
                    </p>
                </CardHeader>
                <Divider />
                <CardBody className="text-xs">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>{formatPrice(totalPrice)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between text-xs">
                    <p>Total</p>
                    <p>{formatPrice(totalPrice)}</p>
                </CardFooter>
            </Card>

            {cart?.map((item, index) => {
                return (
                    <Card key={index} className="sm:w-fit p-unit-xs mb-5">
                        <CardBody>
                            <div className="flex gap-5 items-center">
                                <div className="relative">
                                    <Image
                                        src={item.image}
                                        alt="Product Image"
                                        className="w-16 h-20 object-cover"
                                    />
                                    <Chip className="absolute top-0 left-0 p-1 text-sm font-semibold  z-10 -ml-2 -mt-2">
                                        {item.quantity}
                                    </Chip>
                                </div>

                                <div>
                                    <p
                                        className={title({
                                            size: 'sm',
                                        })}
                                    >
                                        {item.title}
                                    </p>
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
