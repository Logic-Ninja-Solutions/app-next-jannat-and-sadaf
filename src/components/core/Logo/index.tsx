import { Image } from '@mantine/core';
import cx from 'clsx';
import classes from './Logo.module.scss';

export function Logo() {
  return (
    <>
      <Image className={cx(classes.logo, classes.dark)} h={80} src="logo-cropped-no-bg.png" />
      <Image
        className={cx(classes.logo, classes.light)}
        h={80}
        src="logo-cropped-white-no-bg.png"
      />
    </>
  );
}
