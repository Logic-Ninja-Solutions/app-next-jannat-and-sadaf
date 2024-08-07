import React, { PropsWithChildren } from 'react'
import { subtitle } from '../../primitives'
import clsx from 'clsx'

function Title({
    children,
    className,
}: PropsWithChildren & { className?: string }) {
    return (
        <h1
            className={clsx(
                subtitle,
                'text-center text-medium sm:text-1xl lg:text-2xl uppercase',
                className
            )}
        >
            {children}
        </h1>
    )
}

export default Title
