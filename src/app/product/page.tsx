'use client'

import { subtitle, title } from '@/src/components/primitives'
import ImagesCarousel from '@/src/components/product/Carousel'
import { Button, Input, Spacer, useDisclosure } from '@nextui-org/react'

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
import { useState } from 'react'
import { FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa'

const sizes = ['XS', 'S', 'M', 'L', 'Custom']

export default function Home() {
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState(sizes[0])
    const [isEnterSizeManually, setIsEnterSizeManually] = useState(false)
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

    return (
        <>
            <div className="mt-10 sm:px-20">
                <div className={clsx('sm:grid grid-cols-2', 'gap-5 sm:gap-28')}>
                    <div className="px-10 sm:px-0">
                        <ImagesCarousel imageList={images} />
                    </div>

                    <div className="w-full  flex flex-col gap-4  sm:pr-36">
                        <div className=" text-center mt-5 sm:text-left sm:mt-0">
                            <h1
                                className={clsx(
                                    title({
                                        size: 'sm',
                                    })
                                )}
                            >
                                Product Name
                            </h1>
                            <p className={subtitle({})}>RS. 333,000</p>
                        </div>

                        <div className="flex  gap-3 justify-center sm:justify-normal">
                            <Button
                                className="self-center"
                                isIconOnly
                                color="secondary"
                                aria-label="add"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <FaPlus />
                            </Button>
                            <Input
                                variant="bordered"
                                type="number"
                                min={1}
                                max={10}
                                value={quantity.toString()}
                                style={{ textAlign: 'center' }}
                                className="w-32"
                            />
                            <Button
                                onClick={() => setQuantity(quantity - 1)}
                                className="self-center"
                                isIconOnly
                                color="secondary"
                                aria-label="minus"
                            >
                                <FaMinus />
                            </Button>
                        </div>

                        <div className="flex gap-4 ">
                            {sizes.map((size, index) => (
                                <Button
                                    onClick={() => setSelectedSize(size)}
                                    isIconOnly={size != 'Custom'}
                                    key={index}
                                    className={clsx(
                                        selectedSize === size &&
                                            'bg-secondary text-foreground-50'
                                    )}
                                    size="lg"
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>

                        {selectedSize === 'Custom' && (
                            <div>
                                <Button
                                    onClick={() =>
                                        setIsEnterSizeManually(false)
                                    }
                                    variant="bordered"
                                    className={
                                        !isEnterSizeManually
                                            ? 'bg-secondary text-foreground-50'
                                            : ''
                                    }
                                    fullWidth
                                >
                                    Request Callback
                                </Button>
                                <div className="text-center">or</div>
                                <Button
                                    onClick={() => {
                                        setIsEnterSizeManually(true)
                                        onOpen()
                                    }}
                                    variant="bordered"
                                    className={
                                        isEnterSizeManually
                                            ? 'bg-secondary text-foreground-50'
                                            : ''
                                    }
                                    fullWidth
                                >
                                    Enter Size Manually
                                </Button>
                            </div>
                        )}

                        <Button
                            className="mt-5"
                            startContent={<FaShoppingBag />}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
