// @ts-nocheck

import { updateProfile } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { UserUpdateInput } from '@/src/types/common'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Card, CardBody, Spacer } from '@nextui-org/react'
import { Switch } from '@nextui-org/switch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaLock, FaUnlock } from 'react-icons/fa'
import { User } from '../../../types/user'

interface UserInfoProps {
    userData?: User | null
}

export default function ManageUserInfo({ userData }: UserInfoProps) {
    const [isProfileFormEnabled, setIsProfileFormEnabled] = useState(false)

    const queryClient = useQueryClient()

    const updateProfileMutation = useMutation({
        mutationKey: [ProfileAction.updateProfile],
        mutationFn: (data: UserUpdateInput) => {
            return updateProfile(userData?.id as string, data)
        },
        onSuccess: (data: { user: User }) => {
            queryClient.setQueryData([ProfileAction.getUser], (oldData: {user: User})=> {
                return {
                    user: {
                        ...oldData.user,
                        ...data.user
                    }
                }

            })
            setIsProfileFormEnabled(false)
        },
    })

    const { control, handleSubmit, setValue } = useForm<UserUpdateInput>()

    useEffect(() => {
        if (userData) {
            setValue('firstName', userData.firstName)
            setValue('lastName', userData.lastName)
            setValue('email', userData.email)
            setValue('phone', userData.phone)
        }
    }, [userData, setValue])

    async function onSubmit(values: UserUpdateInput) {
        await updateProfileMutation.mutateAsync({
            ...values,
            email: undefined,
        })
    }

    return (
        <Card shadow="sm" className="">
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-unit-md">
                        <p>Your Info</p>
                        <Switch
                            isSelected={isProfileFormEnabled}
                            onValueChange={setIsProfileFormEnabled as any}
                            size="sm"
                            color="success"
                            startContent={<FaUnlock />}
                            endContent={<FaLock />}
                        ></Switch>{' '}
                    </div>
                    <div className="flex-col flex sm:flex-row gap-5 mt-3">
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue={userData?.firstName}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={!isProfileFormEnabled}
                                    label="First Name"
                                />
                            )}
                        />

                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue={userData?.firstName}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={!isProfileFormEnabled}
                                    label="Last Name"
                                />
                            )}
                        />
                    </div>

                    <Spacer y={3} />

                    <div className="flex-col flex sm:flex-row gap-5 mt-3">
                        <Controller
                            name="email"
                            control={control}
                            disabled
                            defaultValue={userData?.email}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled
                                    label="Email Address"
                                />
                            )}
                        />

                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={userData?.phone}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={!isProfileFormEnabled}
                                    label="Phone Number"
                                />
                            )}
                        />
                    </div>

                    <div className="mt-5 flex items-center justify-center">
                        <Button
                            disabled={!isProfileFormEnabled}
                            isLoading={updateProfileMutation.isPending}
                            type="submit"
                            variant="solid"
                            className="w-80"
                            color="secondary"
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
