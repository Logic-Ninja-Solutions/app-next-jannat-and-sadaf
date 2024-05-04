'use client'

import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import serverInstance from '../../../actions/api'
import { useRouter } from 'next/navigation'

function useResetPasswordMutation() {
    return useMutation({
        mutationFn: async ({
            password,
            token,
        }: {
            password: string
            token: string
        }) => {
            await serverInstance.post('/auth/reset-password', {
                password,
                token,
            })
        },
    })
}

function ResetPasswordContainer({ token }: { token: string }) {
    const { mutateAsync: resetRequest, isPending } = useResetPasswordMutation()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<{
        password: string
        confirmPassword: string
    }>()

    const router = useRouter()

    async function onSubmit(data: { password: string }) {
        try {
            const { password } = data
            await resetRequest({
                password,
                token,
            })
            setErrorMessage(null)
            setSuccessMessage('Password reset successfully')
            setTimeout(() => {
                router.push('/login')
            }, 4000)
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
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            radius={'md'}
                            type="password"
                            label="password"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-danger text-sm">
                                {errors.password.message as string}
                            </p>
                        )}

                        <Input
                            {...register('confirmPassword', {
                                required: 'Confirm password is required',
                                validate: (value) =>
                                    value === watch('password') ||
                                    'The passwords do not match',
                            })}
                            radius={'md'}
                            type="password"
                            label="Confirm password"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-danger text-sm">
                                {errors.confirmPassword.message as string}
                            </p>
                        )}

                        <Button
                            fullWidth
                            type="submit"
                            isLoading={isPending}
                            color="secondary"
                        >
                            Reset
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

export default ResetPasswordContainer
