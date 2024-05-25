'use client'

import { addToCart } from '@/src/actions/cart'
import { CartActionType } from '@/src/actions/cart/enums'
import { CustomSizes, FrontSizes } from '@/src/models/custom.sizes'
import { formatPrice } from '@/src/models/product'
import { CartItem, CustomSizePreference } from '@/src/types/common'
import { Button } from '@nextui-org/button'
import {
    Accordion,
    AccordionItem,
    Link,
    Radio,
    RadioGroup,
    useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaInfo } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { Product, ProductVariant } from '../../../types/product'
import { AnchorIcon, HeartIcon } from '../../core/Icons'
import { CartDrawerContext } from '../../layouts/DefaultLayout'
import { subtitle, title } from '../../primitives'
import CustomSizeModal from '../CustomSizeModal'
import QuantityInput from '../QuantityInput'
import SizesList from '../SizeList'
import VariantSizeChartModal from '../VariantSizeChartModal'

const disclaimer =
    'Actual colours of the outfit may vary. We do our best to ensure that our photos are as true to colour as possible. However, due to photography lighting sources and colour settings of different monitors, there may be slight variations.'

interface ProductDetailsProps {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const defaultVariant = useMemo(() => {
        return product.variants.find((variant) => variant?.isAvailable)
    }, [product])

    const [quantity, setQuantity] = useState(1)
    const [quantityState, setQuantityState] = useState(
        defaultVariant
            ? {
                  [defaultVariant.size]: quantity,
              }
            : {}
    )

    function updateVariantQuantity(x: number) {
        if (selectedVariant) {
            setQuantityState({
                ...quantityState,
                [selectedVariant?.size]: x,
            })
        }
    }

    function handleVariantChange(variant: ProductVariant) {
        setSelectedVariant(variant)
        updateVariantQuantity(quantity)
        setQuantity(quantityState[variant.size] ?? 1)
    }

    function handleQuantityChange(x: number) {
        const updated = quantity + x

        setQuantity(updated)
        updateVariantQuantity(updated)
    }

    const [selectedVariant, setSelectedVariant] = useState<
        ProductVariant | undefined
    >(defaultVariant)

    const [customSizePreference, setCustomSizePreference] =
        useState<CustomSizePreference>('callback')

    const {
        isOpen: isCustomSizesModalOpened,
        onOpen: openCustomSizesModal,
        onClose: closeCustomSizesModal,
        onOpenChange: onCustomSizesModalOpenChange,
    } = useDisclosure()

    const { openCart } = useContext(CartDrawerContext)
    const { control, getValues: getCustomSizeValues } = useForm<FrontSizes>()

    const isCustomSize = useMemo(() => {
        return selectedVariant?.size === 'Custom'
    }, [selectedVariant])

    const isProductAvailable = useMemo(() => {
        return (
            selectedVariant &&
            product.isAvailable &&
            selectedVariant?.isAvailable
        )
    }, [product, selectedVariant])

    function getLabel() {
        if (!isProductAvailable) return 'Unavailable'
        return 'Add to Cart'
    }

    const queryClient = useQueryClient()

    const cartMutation = useMutation({
        mutationKey: [CartActionType.addToCart],
        mutationFn: addToCart,
        onSuccess: (updatedCart: CartItem[]) => {
            if (selectedVariant) {
                setQuantity(1)
                setQuantityState({
                    ...quantityState,
                    [selectedVariant?.size]: 1,
                })
            }
            queryClient.setQueryData([CartActionType.getCart], () => {
                return updatedCart
            })
        },
    })

    async function handleCartButton() {
        if (!isProductAvailable) return
        if (!selectedVariant) return

        await cartMutation.mutateAsync({
            itemID: `${product.id}-${selectedVariant.size}`,
            slug: product.slug,
            title: product.title,
            image: product.images[0],
            variant: selectedVariant,
            quantity,
            customSizeData: getCustomSizeValues() ?? {},
            customSizePreference,
        })
        openCart()
    }

    const {
        isOpen: isVariantSizeChartModalOpened,
        onOpen: openVariantSizeChartModal,
        onClose: closeVariantSizeChartModal,
        onOpenChange: onVariantSizeChartModalOpenChange,
    } = useDisclosure()

    return (
        <>
            <VariantSizeChartModal
                variant={selectedVariant}
                opened={isVariantSizeChartModalOpened}
                close={closeVariantSizeChartModal}
                onOpenChange={onVariantSizeChartModalOpenChange}
            />
            <CustomSizeModal
                control={control}
                opened={isCustomSizesModalOpened}
                close={closeCustomSizesModal}
                onOpenChange={onCustomSizesModalOpenChange}
            />
            <div className="w-full flex flex-col gap-4 sm:pr-36">
                <div className="text-center mt-5 sm:text-left sm:mt-0">
                    <h1 className={clsx('uppercase', title())}>
                        {product.title}
                    </h1>
                    <p className={subtitle({})}>
                        {selectedVariant?.price
                            ? formatPrice(selectedVariant?.price)
                            : ''}
                    </p>
                </div>

                <div className="mx-auto sm:mx-0">
                    <SizesList
                        disabled={cartMutation.isPending}
                        variants={product.variants}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={(variant) => {
                            handleVariantChange(variant)
                        }}
                    />
                </div>
                {isCustomSize ? (
                    <div className="w-full px-10 sm:px-0">
                        <RadioGroup
                            color="secondary"
                            label="Size Selection"
                            value={customSizePreference}
                            onValueChange={(val: any) => {
                                setCustomSizePreference(val)
                            }}
                        >
                            <Radio value={'custom'}>Enter Size Manually</Radio>
                            <Radio value={'callback'}>Request Callback</Radio>
                        </RadioGroup>
                        {customSizePreference == 'custom' && (
                            <div className="mt-4">
                                <Button
                                    color="secondary"
                                    onClick={() => {
                                        openCustomSizesModal()
                                    }}
                                >
                                    Enter Sizes
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {(selectedVariant?.sizeMetadata?.length ?? 0) > 0 && (
                            <div>
                                <Button onClick={openVariantSizeChartModal}>
                                    Size Chart
                                </Button>
                            </div>
                        )}
                    </>
                )}

                <div className="flex flex-col gap-5 text-md p-5 sm:p-0">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    />
                    <p>Product code: {product.code}</p>
                </div>

                <div className="flex gap-5 mt-5 px-10 sm:px-0">
                    <QuantityInput
                        isDisabled={!isProductAvailable}
                        min={1}
                        max={100}
                        quantity={quantity}
                        handleQuantity={handleQuantityChange}
                    />
                    <Button
                        color="secondary"
                        onClick={handleCartButton}
                        disabled={!isProductAvailable}
                        className={clsx('uppercase')}
                        fullWidth
                    >
                        {getLabel()}
                    </Button>
                </div>

                <div className="px-4 sm:px-0">
                    {/* +92 300 8663210 */}
                    <Button
                        as={Link}
                        href="https://wa.me/923008663210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase mt-4"
                        color="success"
                        variant="bordered"
                        startContent={
                            <IoLogoWhatsapp color="success" size={20} />
                        }
                        fullWidth
                    >
                        Whatsapp
                    </Button>
                </div>

                <div className="px-4 sm:px-0">
                    <Button
                        className="uppercase px-4 heart-icon-parent"
                        color="danger"
                        variant="bordered"
                        startContent={<HeartIcon />}
                        fullWidth
                    >
                        Add to Wishlist
                    </Button>
                </div>

                <div className="px-4 sm:px-0">
                    <Accordion>
                        <AccordionItem
                            indicator={<AnchorIcon />}
                            startContent={<FaInfo />}
                            key="1"
                            aria-label="Disclaimer"
                            title="Disclaimer"
                        >
                            {disclaimer}
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    )
}
