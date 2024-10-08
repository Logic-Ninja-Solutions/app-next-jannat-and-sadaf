'use client'

import { CreateUserInput } from '@/src/types/common'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signUp } from '../../../actions/auth/actions'
import PasswordField from '../PasswordField'

export default function SignupContainer() {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<CreateUserInput>()
    const [error, setError] = useState<boolean | null>(null)
    const signUpMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: signUp,
        onError: () => {
            setError(true)
        },
    })

    async function onSubmit(data: CreateUserInput) {
        setError(null)
        await signUpMutation.mutateAsync({
            ...data,
            confirmPassword: undefined,
        })
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="p-6 sm:min-w-[400px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className="gap-3">
                        <Input
                            {...register('firstName', {
                                required: 'First name is required',
                            })}
                            radius={'md'}
                            type="text"
                            label="First Name"
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                            <p className="text-danger text-sm">
                                {errors.firstName.message as string}
                            </p>
                        )}
                        <Input
                            {...register('lastName', {
                                required: 'Last name is required',
                            })}
                            radius={'md'}
                            type="text"
                            label="Last Name"
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                            <p className="text-danger text-sm">
                                {errors.lastName.message as string}
                            </p>
                        )}

                        <Input
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            radius={'md'}
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-danger text-sm">
                                {errors.email.message as string}
                            </p>
                        )}

                        <Input
                            {...register('phone', {
                                required: 'Phone number is required',
                            })}
                            radius={'md'}
                            type="phone"
                            label="Phone Number"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                            <p className="text-danger text-sm">
                                {errors.phone.message as string}
                            </p>
                        )}

                        <PasswordField
                            label="Password"
                            placeholder="Enter your password"
                            otherProps={{
                                ...register('password', {
                                    required: 'Password is required',
                                }),
                            }}
                        />
                        {errors.password && (
                            <p className="text-danger text-sm">
                                {errors.password.message as string}
                            </p>
                        )}

                        <PasswordField
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            otherProps={{
                                ...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value) =>
                                        value === watch('password') ||
                                        'The passwords do not match',
                                }),
                            }}
                        />
                        {errors.confirmPassword && (
                            <p className="text-danger text-sm">
                                {errors.confirmPassword.message as string}
                            </p>
                        )}

                        <Button
                            type="submit"
                            isLoading={signUpMutation.isPending}
                            color="secondary"
                        >
                            Create an account
                        </Button>

                        {error && (
                            <p className="text-danger">User already exists</p>
                        )}

                        <p className="text-center">
                            Already have an account?{' '}
                            <Link href="/login">Login</Link>
                        </p>
                    </CardBody>
                </form>
            </Card>
        </div>
    )
}
