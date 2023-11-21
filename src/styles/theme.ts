'use client';

import { CSSVariablesResolver, Input, createTheme } from '@mantine/core';
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

export const resolver: CSSVariablesResolver = (mantineTheme) => ({
  variables: {
    '--mantine-custom-bg': mantineTheme.other.bgColor,
  },
  light: {},
  dark: {},
});
