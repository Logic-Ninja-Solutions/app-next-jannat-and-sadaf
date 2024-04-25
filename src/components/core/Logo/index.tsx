'use client'

import { Image } from '@nextui-org/react'
import Link from 'next/link'
import * as React from 'react'

const logoWhite = '/logo-cropped-white-no-bg.png'
const logoBlack = '/logo-cropped-no-bg.png'

export function Logo({ w = false }: { w?: boolean }) {
    return (
        <Link href={'/'}>
            <Image
                className="hidden dark:block"
                isBlurred
                width={100}
                src={logoWhite}
                alt="Jannat & Sadaf"
            />
            <Image
                className={'dark:hidden'}
                isBlurred
                width={100}
                src={w ? logoWhite : logoBlack}
                alt="Jannat & Sadaf"
            />
        </Link>
    )
}
