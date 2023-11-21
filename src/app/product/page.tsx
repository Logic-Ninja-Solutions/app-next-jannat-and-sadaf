'use client';

import '@mantine/carousel/styles.css';

import { Carousel, Embla } from '@mantine/carousel';
import { Box, Flex, Grid, Image, Title, rem } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import cx from 'clsx';
import classes from './Product.module.scss';

const img1 =
  'https://www.mishalakhani.com/cdn/shop/files/10-B_21824d2f-46e5-48ee-934a-c9c261517e0f.jpg?v=1683652977&width=1400';
const img2 =
  'https://www.mishalakhani.com/cdn/shop/files/10-C_968594e3-31d9-4fdf-8e3f-1b2c77ae1755.jpg?v=1683647643&width=1400';
const img3 =
  'https://www.mishalakhani.com/cdn/shop/files/10-D_842b2a95-b8e1-4c86-a002-0e658b056a15.jpg?v=1683647644&width=1400';
const img4 =
  'https://www.mishalakhani.com/cdn/shop/files/10-E_b487621c-7956-4292-bf24-b1d4fe6a38ab.jpg?v=1683647644&width=1400';

const imageList = [img1, img2, img3, img4];

export default function Product() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [selectedSlide, setSelectedSlide] = useState<number>(0);

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        setSelectedSlide(embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  return (
    <Box mt="lg">
      <Grid>
        <Grid.Col span={8}>
          <Box m="xl">
            <Carousel
              getEmblaApi={setEmbla}
              withControls
              style={{
                maxWidth: rem(682),
                maxHeight: rem(1024),
              }}
              nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
              previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
            >
              {imageList.map((image, index) => (
                <Image key={index} src={image} />
              ))}
            </Carousel>
            <Flex
              style={{
                maxWidth: rem(682),
                maxHeight: rem(1024),
              }}
              justify="center"
              wrap="wrap"
            >
              {imageList.map((image, index) => (
                <Image
                  onClick={() => {
                    setSelectedSlide(index);
                    embla?.scrollTo(index);
                  }}
                  w="20%"
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
          </Box>
        </Grid.Col>

        <Grid.Col span={3}>
          <Title fw={500} order={3}>
            NIMR KURTI W/ DUPATTA & IZAAR
          </Title>
          RS.333,000
        </Grid.Col>
      </Grid>
    </Box>
  );
}
