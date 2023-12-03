import { getCart, removeFromCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { formatPrice } from '@/src/models/product'
import { CartItem } from '@/src/types/cart'
import { Button } from '@nextui-org/button'
import { Image, Spinner } from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useContext } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import Drawer, { DrawerBody, DrawerFooter, DrawerHeader } from '../../drawer'
import { CartDrawerContext } from '../../layouts/DefaultLayout'

type Props = {
    isOpen: boolean
    onOpenChange: () => void
    onClose: () => void
}

interface CartBodyProps {
    cart?: CartItem[]
}

function CartBody({ cart }: CartBodyProps) {
    const queryClient = useQueryClient()

    const removeMutation = useMutation({
        mutationKey: [CartActionType.removeFromCart],
        mutationFn: removeFromCart,
        onSuccess: (removedItemID: string | null) => {
            if (!removedItemID) return
            queryClient.setQueryData(
                [CartActionType.getCart],
                (oldData: CartItem[]) => {
                    return oldData.filter(
                        (item) => item.itemID !== removedItemID
                    )
                }
            )
        },
    })

    const { closeCart } = useContext(CartDrawerContext)

    return (
        <>
            {cart?.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between border-b py-2"
                >
                    <div className="flex gap-4 align-middle items-center">
                        <Image
                            src={item.image}
                            alt="Product Image"
                            className="w-32 h-36 object-cover"
                        />
                        <div className="flex flex-col gap-2">
                            <p>{item.title}</p>
                            <p>{item.variant.size}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>{formatPrice(item.variant.price)}</p>
                            <div className="flex gap-3">
                                <Button
                                    onClick={closeCart}
                                    as={Link}
                                    href={`/product/${item.slug}`}
                                    isIconOnly
                                >
                                    <FaEye
                                        color="secondary"
                                        className="text-secondary cursor-pointer"
                                    />
                                </Button>

                                <Button
                                    isIconOnly
                                    onClick={() => {
                                        removeMutation.mutate(item.itemID)
                                    }}
                                >
                                    {removeMutation.isPending ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        <FaTrash
                                            color="danger"
                                            className="text-danger cursor-pointer"
                                        />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default function CartDrawer({ isOpen, onOpenChange, onClose }: Props) {
    const { data: cart, isLoading } = useQuery({
        queryKey: [CartActionType.getCart],
        queryFn: getCart,
    })

    function handleCartButton() {
        if (cart?.length === 0) {
            onClose()
        } else {
            onClose()
        }
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            >
                <DrawerHeader className="flex flex-col gap-1">
                    My Bag
                </DrawerHeader>
                <DrawerBody className="overflow-auto">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            {cart?.length === 0 ? (
                                <div className="m-auto">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <CartBody cart={cart} />
                            )}
                        </>
                    )}
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        onClick={handleCartButton}
                        fullWidth
                        color="secondary"
                    >
                        {cart?.length === 0 ? 'Continue Shopping' : 'Checkout'}
                    </Button>
                </DrawerFooter>
            </Drawer>
        </>
    )
}
