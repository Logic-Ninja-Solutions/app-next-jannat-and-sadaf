import ImagesCarousel from '@/src/components/product/Carousel'
import ProductDetails from '@/src/components/product/ProductDetails'
import { hardCodedProducts } from '@/src/models/product'
import clsx from 'clsx'

interface ProductPageProps {
    params: {
        slug: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = hardCodedProducts.find(
        (product) => product.slug === params.slug
    )

    return (
        <>
            {!product ? (
                <div className="m-auto">
                    <h1>Product not found</h1>
                </div>
            ) : (
                <div className="mt-10 sm:px-20 pb-20">
                    <div
                        className={clsx(
                            'sm:grid grid-cols-6',
                            'gap-5 sm:gap-28'
                        )}
                    >
                        <div className="px-10 sm:px-0 col-span-3 ">
                            <ImagesCarousel imageList={product.images} />
                        </div>
                        <div className="col-span-3">
                            <ProductDetails product={product} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
