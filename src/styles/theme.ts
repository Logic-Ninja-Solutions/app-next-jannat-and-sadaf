'use client';

import { CSSVariablesResolver, Input, MantineTheme, createTheme } from '@mantine/core';
import { fontStyle } from './font';
import classes from './Theme.module.scss';

export const theme = createTheme({
  fontFamily: fontStyle,

  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
  colors: {
    skin: [
      '#514C43',
      '#6E675E',
      '#8B8479',
      '#A99F94',
      '#C7BBB0',
      '#E4D6CB',
      '#F3ECE2',
      '#F7F3EA',
      '#FBF8F1',
      '#FFFFFF',
    ],
  },
});

export const resolver: CSSVariablesResolver = (t: MantineTheme) => ({
  variables: {
    '--mantine-hero-height': t.other.heroHeight,
  },
  light: {
    '--mantine-button-color': t.colors.skin[0],
  },
  dark: {
    '--mantine-button-color': t.colors.dark[0],
  },
});
