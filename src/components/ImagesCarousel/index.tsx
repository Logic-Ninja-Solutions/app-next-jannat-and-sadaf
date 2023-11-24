import { Carousel, Embla } from '@mantine/carousel';
import { Flex, Image, Stack, em, rem } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import cx from 'clsx';

import { useMediaQuery } from '@mantine/hooks';
import classes from './ImagesCarousel.module.scss';

interface ImagesCarouselProps {
  imageList: string[];
}

export default function ImagesCarousel({ imageList }: ImagesCarouselProps) {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [selectedSlide, setSelectedSlide] = useState<number>(0);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        setSelectedSlide(embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  return (
    <Stack
      ml={{
        md: 'xl',
      }}
    >
      <Carousel
        getEmblaApi={setEmbla}
        withControls
        className={classes.carousel}
        nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
        previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
      >
        {imageList.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image radius="md" src={image} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Flex className={classes.carouselSlides} justify="center" wrap="wrap">
        {imageList.map((image, index) => (
          <Image
            onClick={() => {
              setSelectedSlide(index);
              embla?.scrollTo(index);
            }}
            radius="md"
            w={isMobile ? '15%' : '20%'}
            m="md"
            className={cx(
              classes.carouselSlide,
              index === selectedSlide ? classes.carouselSlideSelected : null
            )}
            key={index}
            src={image}
          />
        ))}
      </Flex>
    </Stack>
  );
}
