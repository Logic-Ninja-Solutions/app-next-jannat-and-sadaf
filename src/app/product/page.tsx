import ImagesCarousel from '@/src/components/product/Carousel'
import ProductDetails from '@/src/components/product/ProductDetails'
import clsx from 'clsx'

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
