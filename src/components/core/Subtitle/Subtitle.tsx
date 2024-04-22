import React, { PropsWithChildren } from 'react'
import { subtitle } from '../../primitives'
import clsx from 'clsx'

function Subtitle({
    children,
    className,
}: PropsWithChildren & { className?: string }) {
    return (
        <h1
            className={clsx(
                subtitle,
                'text-center text-medium sm:text-lg lg:text-xl  uppercase',
                className
            )}
        >
            {children}
        </h1>
    )
}

export default Subtitle
