'use client'

import { Navbar } from '../../core/Navbar'

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            {children}
        </div>
    )
}
