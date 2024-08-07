import { getCart, removeFromCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { formatPrice } from '@/src/models/product'
import { CartItem } from '@/src/types/common'
import { Button } from '@nextui-org/button'
import { Chip, Image, Spinner, useDisclosure } from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import Drawer, { DrawerBody, DrawerFooter, DrawerHeader } from '../../drawer'
import { CartDrawerContext } from '../../layouts/DefaultLayout'
import CustomSizeModalStatic from '../../product/CustomSizeModal/static'
import { CustomSizes } from '../../../models/custom.sizes'

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

    const {
        isOpen: isCustomSizesModalOpened,
        onOpen: openCustomSizesModal,
        onClose: closeCustomSizesModal,
        onOpenChange: onCustomSizesModalOpenChange,
    } = useDisclosure()

    const [cartSizes, setCartSizes] = useState<CustomSizes>({})

    return (
        <>
            <CustomSizeModalStatic
                sizes={cartSizes}
                opened={isCustomSizesModalOpened}
                close={closeCustomSizesModal}
                onOpenChange={onCustomSizesModalOpenChange}
            />

            {cart?.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between border-b py-2"
                >
                    <div className="flex gap-4 align-middle items-center">
                        <div className="relative">
                            <Image
                                src={item.image}
                                alt="Product Image"
                                className="w-32 h-36 object-cover"
                            />
                            <Chip className="absolute top-0 left-0 p-1 text-sm font-semibold  z-10 -ml-2 -mt-2">
                                {item.quantity}
                            </Chip>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p>{item.title}</p>
                            {item.variant.size === 'Custom' && (
                                <div className="my-[-4px]">
                                    {item.customSizePreference == 'custom' ? (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    openCustomSizesModal()
                                                    setCartSizes(
                                                        item.customSizeData
                                                    )
                                                }}
                                            >
                                                <p className="italic text-xs">
                                                    Custom Dimensions
                                                </p>
                                            </Button>
                                        </>
                                    ) : (
                                        <p className="italic text-xs">
                                            You will recieve a callback
                                        </p>
                                    )}
                                </div>
                            )}
                            <p>{item.variant.size}</p>
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
                        onClick={onClose}
                        as={Link}
                        href={cart?.length === 0 ? '/' : '/checkout'}
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
