import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import products from './products.json'
import ProductCard from '../../product/ProductCard/ProductCard'

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }

function NewArrivals() {
    const [sliderRef] = useKeenSlider({
        slides: { perView: 2, spacing: 5 },
        mode: 'free-snap',
        breakpoints: {
            // '(min-width: 640px)': {
            //     slides: { perView: 2, spacing: 5 },
            // },
            '(min-width: 768px)': {
                slides: { perView: 2, spacing: 10 },
            },
            '(min-width: 1024px)': {
                slides: { perView: 3, spacing: 13 },
            },
            '(min-width: 1280px)': {
                slides: { perView: 4, spacing: 10 },
            },
            '(min-width: 1536px)': {
                slides: { perView: 4, spacing: 20 },
            },
        },
    })

    return (
        <div
            ref={sliderRef}
            className="keen-slider container mx-auto px-1 sm:px-0"
        >
            {products?.map((product, index) => (
                <div className="keen-slider__slide" key={index}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    )
}

export default NewArrivals
