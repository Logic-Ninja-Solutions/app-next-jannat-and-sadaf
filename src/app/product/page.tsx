'use client'

import AnchorIcon from '@/src/components/core/Icons/Anchor'
import HeartIcon from '@/src/components/core/Icons/Heart'
import { CartDrawerContext } from '@/src/components/layouts/DefaultLayout'
import { subtitle, title } from '@/src/components/primitives'
import ImagesCarousel from '@/src/components/product/Carousel'
import CustomSizeModal from '@/src/components/product/CustomSizeModal'
import QuantityInput from '@/src/components/product/QuantityInput'
import {
    Accordion,
    AccordionItem,
    Button,
    useDisclosure,
} from '@nextui-org/react'

const img1 =
    'https://www.mishalakhani.com/cdn/shop/files/10-B_21824d2f-46e5-48ee-934a-c9c261517e0f.jpg?v=1683652977&width=1400'
const img2 =
    'https://www.mishalakhani.com/cdn/shop/files/10-C_968594e3-31d9-4fdf-8e3f-1b2c77ae1755.jpg?v=1683647643&width=1400'
const img3 =
    'https://www.mishalakhani.com/cdn/shop/files/10-D_842b2a95-b8e1-4c86-a002-0e658b056a15.jpg?v=1683647644&width=1400'
const img4 =
    'https://www.mishalakhani.com/cdn/shop/files/10-E_b487621c-7956-4292-bf24-b1d4fe6a38ab.jpg?v=1683647644&width=1400'

const images = [
    img1,
    img2,
    img3,
    img4,
    img1,
    img2,
    img3,
    img4,
    img1,
    img2,
    img3,
    img4,
]

import clsx from 'clsx'
import { useContext, useState } from 'react'
import { FaAnchor, FaInfo, FaWhatsapp } from 'react-icons/fa'

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

function ProductDetails() {
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

    return (
        <>
            <CustomSizeModal
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
                        startContent={<FaWhatsapp />}
                        fullWidth
                    >
                        Whatsapp
                    </Button>
                </div>

                <div className="px-4 sm:px-0">
                    <Button
                        className="uppercase px-4"
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

export default function ProductPage() {
    return (
        <>
            <div className="mt-10 sm:px-20 pb-20">
                <div className={clsx('sm:grid grid-cols-6', 'gap-5 sm:gap-28')}>
                    <div className="px-10 sm:px-0 col-span-3 ">
                        <ImagesCarousel imageList={images} />
                    </div>
                    <div className="col-span-3">
                        <ProductDetails />
                    </div>
                </div>
            </div>
        </>
    )
}
