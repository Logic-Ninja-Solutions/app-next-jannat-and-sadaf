import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import DefaultLayout from '@components/layouts/DefaultLayout'
import { font } from '@styles/font'
import clsx from 'clsx'
import type { Metadata } from 'next'
import ClientProvider from '../providers/Client'

import AuthProvider from '../providers/Auth/AuthProvider'
import { NextUIKitProvider } from '../providers/Ui'
import { ToastContainer } from 'react-toastify'

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
                        <AuthProvider>
                            <DefaultLayout>
                                {children}
                                <ToastContainer />
                            </DefaultLayout>
                        </AuthProvider>
                    </ClientProvider>
                </NextUIKitProvider>
            </body>
        </html>
    )
}
