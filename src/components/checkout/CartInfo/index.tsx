import { formatPrice } from '@/src/models/product'
import { Card, CardBody, Image } from '@nextui-org/react'
import { CartItem } from '@prisma/client'
import { title, subtitle } from '../../primitives'

interface CartInfoProps {
    cart?: CartItem[]
}

export default function CartInfo({ cart }: CartInfoProps) {
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
