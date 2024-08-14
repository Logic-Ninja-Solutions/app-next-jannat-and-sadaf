'use client'

import { useState } from 'react'
import { Button, Card, CardBody, Checkbox, Input } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { authenticate } from '../../../actions/auth/actions'
import PasswordField from '../PasswordField'

export default function LoginContainer() {
    const [formState, setFormState] = useState<{ message: string } | null>(null)
    const router = useRouter()
    const client = useQueryClient()

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const response = await authenticate(email, password)
        if (response === null) {
            client.invalidateQueries()
            if (callbackUrl) {
                router.replace(callbackUrl)
                return
            }
            router.replace('/')
        } else {
            setFormState(response)
        }

        setIsLoading(false)
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit}>
                <Card className="p-6 sm:min-w-[400px]">
                    <CardBody className="gap-3">
                        <Input
                            autoFocus
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                        />
                        <PasswordField
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                        />
                        <div className="flex flex-col py-2 px-1 sm:flex-row sm:justify-between">
                            <Checkbox
                                defaultSelected
                                classNames={{ label: 'text-small' }}
                            >
                                Remember me
                            </Checkbox>
                            <Link
                                color="primary"
                                href="/forgot-password"
                                className="mt-2 sm:mt-0"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {formState?.message && (
                            <p className="text-danger">{formState.message}</p>
                        )}

                        <Button
                            isLoading={isLoading}
                            type="submit"
                            fullWidth
                            color="secondary"
                        >
                            Sign In
                        </Button>

                        <p className="text-center">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup">Sign Up</Link>
                        </p>
                    </CardBody>
                </Card>
            </form>
        </div>
    )
}
