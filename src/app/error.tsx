'use client'

import { useEffect } from 'react'
import { Button, Card } from '@nextui-org/react'
import { useTheme } from 'next-themes'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <Card className="shadow-lg rounded-lg p-8 max-w-sm text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Oops! Something went wrong
                </h2>
                <p className="mb-6">
                    An unexpected error has occurred. Please try again.
                </p>
                <Button onPress={reset} color="secondary">
                    Try Again
                </Button>
            </Card>
        </div>
    )
}
