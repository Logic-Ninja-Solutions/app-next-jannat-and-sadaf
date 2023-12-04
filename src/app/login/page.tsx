'use client'

import { authenticate } from '@/src/actions/auth'
import { Button, Card, CardBody, Checkbox, Input } from '@nextui-org/react'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button isLoading={pending} type="submit" fullWidth color="secondary">
            Signin
        </Button>
    )
}

export default function Login() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (
        <div className="flex items-center justify-center h-screen">
            <form action={dispatch}>
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
                        <div className="flex py-2 px-1 justify-between">
                            <Checkbox
                                classNames={{
                                    label: 'text-small',
                                }}
                            >
                                Remember me
                            </Checkbox>
                            <Link color="primary" href="#">
                                Forgot password?
                            </Link>
                        </div>

                        {errorMessage && (
                            <p className="text-danger">{errorMessage}</p>
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
