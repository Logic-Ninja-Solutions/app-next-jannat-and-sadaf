'use client';

import '@mantine/carousel/styles.css';

import { Box, Grid, Text, Title } from '@mantine/core';
import ImagesCarousel from '@/src/components/ImagesCarousel';
import QuantityInput from '@/src/components/core/QuantityInput';

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
  return (
    <Box mt="lg">
      <Grid flex-end="center">
        <Grid.Col
          span={{
            md: 7,
            sm: 12,
          }}
        >
          <ImagesCarousel imageList={imageList} />
        </Grid.Col>

        <Grid.Col span={5}>
          <Box>
            <Title fw={500} order={3}>
              NIMR KURTI W/ DUPATTA & IZAAR
            </Title>
            <Text>RS.333,000</Text>
            <QuantityInput />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
