import { Image } from '@mantine/core';
import Link from 'next/link';
import classes from './Logo.module.scss';

export function Logo() {
  return (
    <>
      <Link href="/" className={classes.dark}>
        <Image className={classes.logo} h={80} src="logo-cropped-no-bg.png" />
      </Link>

      <Link href="/" className={classes.light}>
        <Image className={classes.logo} h={80} src="logo-cropped-white-no-bg.png" />
      </Link>
    </>
  );
}
