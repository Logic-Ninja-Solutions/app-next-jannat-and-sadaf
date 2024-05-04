'use client'

import { authenticate } from '@/src/actions/auth'
import { Button, Card, CardBody, Checkbox, Input } from '@nextui-org/react'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button isLoading={pending} type="submit" fullWidth color="secondary">
            Signin
        </Button>
    )
}

interface LoginFormState {
    message: string
}

export default function LoginContainer() {
    const initialState: LoginFormState | null = {
        message: '',
    }

    const [formState, formAction] = useFormState(authenticate, initialState)
    const router = useRouter()
    const client = useQueryClient()

    useEffect(() => {
        if (formState == null) {
            client.invalidateQueries()
            router.replace('/')
        }
    }, [client, formState, router])

    return (
        <div className="flex items-center justify-center h-screen">
            <form action={formAction}>
                <Card className="p-6 sm:min-w-[400px]">
                    <CardBody className="gap-3">
                        <Input
                            autoFocus
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                        />
                        <Input
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            variant="bordered"
                        />
                        <div className="flex flex-col py-2 px-1 sm:flex-row sm:justify-between">
                            <Checkbox
                                classNames={{
                                    label: 'text-small',
                                }}
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
                            <p className="text-danger">{formState?.message}</p>
                        )}

                        <LoginButton />

                        <p className="text-center">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup">Signup</Link>
                        </p>
                    </CardBody>
                </Card>
            </form>
        </div>
    )
}
