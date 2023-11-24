'use client'

import { Image } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function Logo() {
    const [mounted, setMounted] = React.useState(false)

    const { theme } = useTheme()
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return (
        <Image
            isBlurred
            width={140}
            src={
                theme === 'light'
                    ? 'logo-cropped-no-bg.png'
                    : 'logo-cropped-white-no-bg.png'
            }
            alt="NextUI Album Cover"
        />
    )
}
