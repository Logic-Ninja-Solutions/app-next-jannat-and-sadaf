import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

type Props = {
    href: string
}

function ForeignLink({ children, href }: PropsWithChildren & Props) {
    return (
        <Link href={href} target="_blank" rel="noreferrer">
            {children}
        </Link>
    )
}

export default ForeignLink
