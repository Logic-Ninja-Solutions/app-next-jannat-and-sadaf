'use client';

import { Button, CSSVariablesResolver, Input, MantineTheme, createTheme } from '@mantine/core';
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
    Button: Button.extend({
      defaultProps: {
        variant: 'outline',
        radius: 'md',
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
  variables: {},
  light: {
    '--mantine-outline-color': t.colors.dark[5],
    '--mantine-outline-c': t.colors.dark[5],

    '--mantine-filled-color': t.colors.dark[5],
    '--mantine-filled-c': t.colors.skin[5],
  },
  dark: {
    '--mantine-outline-color': t.colors.skin[5],
    '--mantine-outline-c': t.colors.gray[5],

    '--mantine-filled-color': t.colors.skin[5],
    '--mantine-filled-c': t.colors.dark[5],
  },
});
