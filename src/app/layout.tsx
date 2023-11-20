import '@mantine/core/styles.css';
import '@src/styles/globals.scss';

import DefaultLayout from '@components/layouts/DefaultLayout';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

import { resolver, theme } from '@/src/styles/theme';
import { fontClass } from '../styles/font';

export const metadata: Metadata = {
  title: 'Jannat & Sadaf',
  description: 'Jannat & Sadaf',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={fontClass}>
        <MantineProvider theme={theme} cssVariablesResolver={resolver}>
          <DefaultLayout>{children}</DefaultLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
