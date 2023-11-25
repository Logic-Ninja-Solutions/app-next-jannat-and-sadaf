import '@styles/globals.css'
import DefaultLayout from '@components/layouts/DefaultLayout'
import type { Metadata } from 'next'
import { font } from '@styles/font'
import { Providers } from '../providers'
import clsx from 'clsx'

export const metadata: Metadata = {
    title: 'Jannat & Sadaf',
    description: 'Jannat & Sadaf',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={clsx(
                    'min-h-screen bg-background antialiased',
                    font.className
                )}
            >
                <Providers
                    themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
                >
                    <DefaultLayout>{children}</DefaultLayout>
                </Providers>
            </body>
        </html>
    )
}
