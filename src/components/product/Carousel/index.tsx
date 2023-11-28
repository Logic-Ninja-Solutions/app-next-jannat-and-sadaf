'use client'

import { Image, Spacer } from '@nextui-org/react'
import 'keen-slider/keen-slider.min.css'
import {
    KeenSliderInstance,
    KeenSliderPlugin,
    useKeenSlider,
} from 'keen-slider/react'
import { MutableRefObject } from 'react'

function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove('active')
            })
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add('active')
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener('click', () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on('created', () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on('animationStarted', (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

type ImagesCarouselProps = {
    imageList: string[]
}

export default function ImagesCarousel({ imageList }: ImagesCarouselProps) {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    })
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    return (
        <div>
            <div ref={sliderRef} className="keen-slider">
                {imageList.map((image, idx) => (
                    <div key={idx} className={`keen-slider__slide `}>
                        <Image src={image} alt="" />
                    </div>
                ))}
            </div>

            <Spacer y={2} />

            <div ref={thumbnailRef} className="keen-slider cursor-pointer">
                {imageList.map((image, idx) => (
                    <div key={idx} className={`keen-slider__slide`}>
                        <Image src={image} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}
