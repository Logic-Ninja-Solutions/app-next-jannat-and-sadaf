import '@styles/globals.css'

import DefaultLayout from '@components/layouts/DefaultLayout'
import type { Metadata } from 'next'
import { font } from '@styles/font'
import { NextUIKitProvider } from '../providers/Ui'
import clsx from 'clsx'
import ClientProvider from '../providers/Client'
import { SessionProvider } from 'next-auth/react'

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
                <NextUIKitProvider
                    themeProps={{
                        attribute: 'class',
                        defaultTheme: 'dark',
                    }}
                >
                    <ClientProvider>
                        <DefaultLayout>{children}</DefaultLayout>
                    </ClientProvider>
                </NextUIKitProvider>
            </body>
        </html>
    )
}
