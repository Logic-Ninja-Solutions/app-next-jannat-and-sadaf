import { Button } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Button m="xl" component={Link} href="/product" variant="light">
        Go to product page
      </Button>
    </>
  );
}
