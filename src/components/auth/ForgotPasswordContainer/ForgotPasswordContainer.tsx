'use client'

import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import serverInstance from '../../../actions/api'

function useForgetPasswordMutation() {
    return useMutation({
        mutationFn: async (email: string) => {
            await serverInstance.post('/auth/forgot-password', {
                email,
            })
        },
    })
}

function ForgotPasswordContainer() {
    const { mutateAsync: forgetRequest, isPending } =
        useForgetPasswordMutation()

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<{
        email: string
    }>()

    const router = useRouter()

    async function onSubmit(data: { email: string }) {
        try {
            const { email } = data
            await forgetRequest(email)
            setErrorMessage(null)
            setSuccessMessage('Check your email for the reset link')
        } catch (e) {
            setSuccessMessage(null)
            if (e instanceof AxiosError) {
                if (e?.response?.data.message)
                    setErrorMessage(e?.response?.data.message)
            }
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardBody>
                <h1 className="text-3xl font-semibold mb-4">Forgot Password</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4 flex flex-col gap-5">
                        <Input
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            radius={'md'}
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                        />
                        <Button
                            fullWidth
                            type="submit"
                            isLoading={isPending}
                            color="secondary"
                        >
                            Verify
                        </Button>

                        {successMessage && (
                            <p className="text-green-500">{successMessage}</p>
                        )}

                        {errorMessage && (
                            <p className="text-red-500">{errorMessage}</p>
                        )}
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default ForgotPasswordContainer
