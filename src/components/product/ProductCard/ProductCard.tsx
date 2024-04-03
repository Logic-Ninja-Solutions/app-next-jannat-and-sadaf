import { Button } from '@nextui-org/button'
import { Card, CardHeader, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { formatPrice } from '../../../models/product'

type ProductCardProps = {
    product: any
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <>
            <Card
                className="group relative h-[18rem] md:h-[35rem] lg:h-[35rem] xl:h-unit-8xl 2xl:h-unit-9xl sm:h-[30rem]"
                as={Link}
                href={`/product/${product.slug}`}
                isFooterBlurred
            >
                {/* <CardHeader className="absolute z-20 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                        New
                    </p>
                </CardHeader> */}
                <div className="relative w-full h-full">
                    <Image
                        removeWrapper
                        alt="Primary image"
                        className="transition-opacity duration-300 ease-in-out absolute inset-0 z-10 w-full h-full object-cover group-hover:opacity-0"
                        src={product.images[0]}
                    />

                    <Image
                        removeWrapper
                        alt="Secondary image"
                        src={product.images[1]}
                        className="w-full h-full object-cover  transition-opacity duration-300 ease-in-out absolute inset-0 z-0 opacity-0 group-hover:opacity-100 "
                    />
                    <Button
                        color="primary"
                        size="md"
                        radius="none"
                        className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-20 w-28"
                    >
                        View
                    </Button>
                </div>
            </Card>
        </>
    )
}

export default ProductCard
