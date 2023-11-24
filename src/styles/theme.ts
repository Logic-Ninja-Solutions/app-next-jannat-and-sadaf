'use client';

import { Button, CSSVariablesResolver, createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'dark',
  primaryShade: 5,
  defaultRadius: 'md',
  focusRing: 'never',
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: 'filled',
      },
    }),
  },
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {},
  dark: {},
});
