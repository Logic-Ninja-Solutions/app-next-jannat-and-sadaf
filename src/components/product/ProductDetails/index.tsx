'use client'

import { Button } from '@nextui-org/button'
import { useDisclosure, Accordion, AccordionItem } from '@nextui-org/react'
import { useState, useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { FaInfo } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { HeartIcon, AnchorIcon } from '../../core/Icons'
import { CartDrawerContext } from '../../layouts/DefaultLayout'
import { title, subtitle } from '../../primitives'
import CustomSizeModal from '../CustomSizeModal'
import QuantityInput from '../QuantityInput'
import clsx from 'clsx'
import { CustomSizes } from '@/src/models/custom.sizes'
import Size from '@/src/models/product.size'
import SizesList from '../SizeList'
import Product, { formatPrice } from '@/src/models/product'

const disclaimer =
    'Actual colours of the outfit may vary. We do our best to ensure that our photos are as true to colour as possible. However, due to photography lighting sources and colour settings of different monitors, there may be slight variations.'

interface ProductDetailsProps {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const defaultSize = useMemo(() => {
        return product.sizes.find(
            (size) => size?.quantity && size?.quantity > 0
        )
    }, [product])

    const [quantity, setQuantity] = useState(defaultSize ? 1 : 0)
    const [selectedSize, setSelectedSize] = useState<Size | undefined>(
        defaultSize
    )
    const [isEnterSizeManually, setIsEnterSizeManually] = useState(false)
    const {
        isOpen: isCustomSizesModalOpened,
        onOpen: openCustomSizesModal,
        onClose: closeCustomSizesModal,
        onOpenChange: onCustomSizesModalOpenChange,
    } = useDisclosure()

    const { openCart } = useContext(CartDrawerContext)
    const { control } = useForm<CustomSizes>()

    function isOutOfStock() {
        if (selectedSize?.name === 'Custom') {
            return false
        }
        return selectedSize?.quantity === 0
    }

    function getLabel() {
        if (isOutOfStock()) return 'Out of Stock'
        if (!product.isAvailable) return 'Not Available'
        return 'Add to Cart'
    }

    return (
        <>
            <CustomSizeModal
                control={control}
                opened={isCustomSizesModalOpened}
                close={closeCustomSizesModal}
                onOpenChange={onCustomSizesModalOpenChange}
            />
            <div className="w-full flex flex-col gap-4 sm:pr-36">
                <div className="text-center mt-5 sm:text-left sm:mt-0">
                    <h1
                        className={clsx(
                            'uppercase',
                            title({
                                size: 'sm',
                            })
                        )}
                    >
                        {product.title}
                    </h1>
                    <p className={subtitle({})}>{formatPrice(product.price)}</p>
                </div>

                <div className="mx-auto sm:mx-0">
                    <SizesList
                        sizes={[
                            ...product.sizes,
                            ...(product.allowCustomSize
                                ? [{ name: 'Custom', quantity: undefined }]
                                : []),
                        ]}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                    />
                </div>
                {selectedSize?.name === 'Custom' && product.allowCustomSize && (
                    <div className="w-full px-10 sm:px-0">
                        <Button
                            onClick={() => setIsEnterSizeManually(false)}
                            color="secondary"
                            variant={isEnterSizeManually ? 'bordered' : 'solid'}
                            fullWidth
                        >
                            Request Callback
                        </Button>
                        <div className="text-center">or</div>
                        <Button
                            onClick={() => {
                                setIsEnterSizeManually(true)
                                openCustomSizesModal()
                            }}
                            color="secondary"
                            variant={
                                !isEnterSizeManually ? 'bordered' : 'solid'
                            }
                            fullWidth
                        >
                            Enter Size Manually
                        </Button>
                    </div>
                )}

                <div className="flex flex-col gap-5 text-md p-5 sm:p-0   list-disc">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    />
                    <p>Product code: {product.code}</p>
                </div>

                <div className="flex gap-5 mt-5 px-10 sm:px-0">
                    <QuantityInput
                        isDisabled={isOutOfStock() || !product.isAvailable}
                        min={1}
                        max={selectedSize?.quantity ?? 1}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    <Button
                        color="secondary"
                        onClick={openCart}
                        disabled={isOutOfStock() || !product.isAvailable}
                        className={clsx('uppercase')}
                        fullWidth
                    >
                        {getLabel()}
                    </Button>
                </div>

                <div className="px-4 sm:px-0">
                    <Button
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
