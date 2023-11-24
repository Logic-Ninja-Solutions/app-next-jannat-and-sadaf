'use client'

import { Navbar } from '../../core/Navbar'

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
