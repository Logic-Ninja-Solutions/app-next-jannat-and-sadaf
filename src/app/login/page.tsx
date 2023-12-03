'use client'

import { authenticate } from '@/src/actions/auth'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useFormState, useFormStatus } from 'react-dom'

interface LoginFormValues {
    email: string
    password: string
}

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
                            radius={'md'}
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                        />

                        <Input
                            radius={'md'}
                            name="password"
                            type="password"
                            label="password"
                            placeholder="Enter your password"
                        />

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
