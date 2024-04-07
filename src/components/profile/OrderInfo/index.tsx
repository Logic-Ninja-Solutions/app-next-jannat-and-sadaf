import { listOrders } from '@/src/actions/order'
import { OrderActionType } from '@/src/actions/order/enum'
import { Button } from '@nextui-org/button'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Image,
    Spinner,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Order } from '../../../types/order'

interface OrderInfoProps {
    userID?: string
}

function NoOrdersCard() {
    return (
        <Card>
            <CardBody>
                <div className="flex flex-col justify-center items-center">
                    <p>You haven&apos;t placed any orders yet.</p>
                    <Button className="w-48 mt-5" as={Link} href="/">
                        Continue Shopping
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

interface OrderInfoProps {
    order: Order
}

function OrderInfo({ order }: OrderInfoProps) {
    return (
        <>
            <Card>
                <CardHeader className="flex justify-between items-center mb-2">
                    <Chip>Order# {order.orderNumber}</Chip>
                    <Chip>{order.status}</Chip>
                </CardHeader>

                <div className="container mx-auto px-8 sm:px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {order.items.map((item) => (
                            <div key={item.itemID} className="mb-2">
                                <div className="flex items-center gap-5">
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
                                    <div className="flex flex-col gap-1">
                                        <span>{item.title}</span>
                                        <span>{item.variant.size}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <CardFooter className="flex justify-end">
                    <span>Total Price: ${order.totalPrice}</span>
                </CardFooter>
            </Card>
            <Divider className="my-3" />
        </>
    )
}

interface ListOrdersProps {
    userID?: string
}

export default function ListOrders({ userID }: ListOrdersProps) {
    const { data, isLoading } = useQuery({
        queryKey: [OrderActionType.listOrders],
        queryFn: () => {
            return listOrders(userID!)
        },
        enabled: !!userID,
    })

    return (
        <>
            {isLoading ? (
                <div className="m-auto">
                    <Spinner color="secondary" />
                </div>
            ) : (
                <>
                    {data?.length == 0 ? (
                        <NoOrdersCard />
                    ) : (
                        <div>
                            {data?.map((order) => (
                                <OrderInfo key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}
