'use client'

import { Button } from '@nextui-org/button'
import { useDisclosure, Accordion, AccordionItem } from '@nextui-org/react'
import { useState, useContext } from 'react'
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

const sizes = ['XS', 'S', 'M', 'L', 'Custom']

function SizesList({
    selectedSize,
    setSelectedSize,
}: {
    selectedSize: string | null
    setSelectedSize: (size: string) => void
}) {
    return (
        <>
            <div className="flex gap-4">
                {sizes.map((size, index) => (
                    <Button
                        onClick={() => setSelectedSize(size)}
                        isIconOnly={size != 'Custom'}
                        key={index}
                        className={clsx(
                            selectedSize === size &&
                                'bg-secondary text-foreground-50'
                        )}
                    >
                        {size}
                    </Button>
                ))}
            </div>
        </>
    )
}

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0])
    const [isEnterSizeManually, setIsEnterSizeManually] = useState(false)
    const {
        isOpen: isCustomSizesModalOpened,
        onOpen: openCustomSizesModal,
        onClose: closeCustomSizesModal,
        onOpenChange: onCustomSizesModalOpenChange,
    } = useDisclosure()

    const { openCart } = useContext(CartDrawerContext)
    const { control } = useForm<CustomSizes>()

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
                        NIMR KURTI W/ DUPATTA
                    </h1>
                    <p className={subtitle({})}>RS. 333,000</p>
                </div>

                <div className="mx-auto sm:mx-0">
                    <SizesList
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                    />
                </div>
                {selectedSize === 'Custom' && (
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

                <div className="flex flex-col gap-5 text-md p-5 sm:p-0">
                    <p>
                        This Nimr is crafted from jamawar and embroidered using
                        age-old craftsmanship, combining resham, and zardozi
                        work. Paired with a crafted izaar, and a contrasting
                        gossamer organza dupatta, as shown here.
                    </p>
                    <ul className="list-disc pl-10">
                        <li>Crimson jamawar</li>
                        <li>Rose bud organza</li>
                        <li>Dry clean only</li>
                    </ul>
                    <p>
                        Lead time: 10 to 12 weeks from the time of purchase. A
                        measurement form will be sent upon order.
                    </p>
                    <p>Product code: BD-785</p>
                </div>

                <div className="flex gap-5 mt-5 px-10 sm:px-0">
                    <QuantityInput
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    <Button
                        color="secondary"
                        onClick={openCart}
                        className="uppercase "
                        fullWidth
                    >
                        Add to Cart
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
                            Actual colours of the outfit may vary. We do our
                            best to ensure that our photos are as true to colour
                            as possible. However, due to photography lighting
                            sources and colour settings of different monitors,
                            there may be slight variations.
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    )
}
