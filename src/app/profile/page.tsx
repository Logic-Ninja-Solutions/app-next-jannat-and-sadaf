'use client'

import { isAuthenticated } from '@/src/actions/auth'
import { AuthAction } from '@/src/actions/auth/enum'
import {
    addAddress,
    deleteAddress,
    getUserData,
    updateAddress,
} from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { subtitle, title } from '@/src/components/primitives'
import AddressModal from '@/src/components/profile/AddAddressModal'
import Types, { UserWithAddresses } from '@/src/types/prisma'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Spacer,
    Spinner,
    Switch,
    Tab,
    Tabs,
    useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaLock, FaPlus, FaUnlock } from 'react-icons/fa'

interface AddressProps {
    address: Types.Address
    onEdit?: () => void
    onDelete?: () => void
}

type User = UserWithAddresses

function AddressDetails({ address, onEdit, onDelete }: AddressProps) {
    return (
        <Card shadow="sm">
            <CardBody className="pl-unit-xl">
                <p>{address.firstName + ' ' + address.lastName}</p>
                <p>{address.addressLine1}</p>
                <p>{address.addressLine2}</p>
                <p>{address.city}</p>
            </CardBody>
            <CardFooter className="pl-unit-xl">
                <div className="flex gap-20">
                    <p onClick={onEdit} className="underline cursor-pointer">
                        Edit
                    </p>
                    <p
                        onClick={onDelete}
                        className="text-danger underline cursor-pointer"
                    >
                        Delete
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}

interface ManageAddressesProps {
    userData?: User | null
}

function ManageAddresses({ userData }: ManageAddressesProps) {
    const {
        isOpen: isAddressModalOpened,
        onOpen: openAddressModal,
        onClose: closeAddressModal,
        onOpenChange,
    } = useDisclosure()

    const [selectedAddress, setSelectedAddress] = useState<Types.Address>()

    function handleAddressEdit(address: Types.Address) {
        setSelectedAddress(address)
        openAddressModal()
    }

    const deleteAddressMutation = useMutation({
        mutationKey: [ProfileAction.addAddress],
        mutationFn: async (data: Types.Address) => {
            return deleteAddress(userData!, data)
        },
        onSuccess: ({ deletedAddress, newDefaultAddress }) => {
            queryClient.setQueryData(
                [ProfileAction.getUser],
                (oldData: User) => {
                    const updatedAddresses = oldData.addresses?.filter(
                        (address) => {
                            return address.id !== deletedAddress.id
                        }
                    )
                    if (newDefaultAddress) {
                        updatedAddresses?.forEach((address) => {
                            if (address.id === newDefaultAddress.id) {
                                address.isDefault = true
                            }
                        })
                    }
                    return {
                        ...oldData,
                        addresses: updatedAddresses,
                    }
                }
            )
            closeAddressModal()
        },
    })

    function handleAddressDelete(address: Types.Address) {
        const data = confirm('Are you sure you want to delete this address?')
        if (data) deleteAddressMutation.mutate(address)
    }

    const { control, setValue, handleSubmit, reset } = useForm<Types.Address>({
        defaultValues: {
            addressLine1: selectedAddress?.addressLine1 ?? '',
            addressLine2: selectedAddress?.addressLine2 ?? '',
            city: selectedAddress?.city ?? '',
            contactNumber: selectedAddress?.contactNumber ?? '',
            firstName: selectedAddress?.firstName ?? '',
            lastName: selectedAddress?.lastName ?? '',
            zipCode: selectedAddress?.zipCode ?? '',
            isDefault: selectedAddress?.isDefault ?? false,
        },
    })

    const queryClient = useQueryClient()

    const addAddressMutation = useMutation({
        mutationKey: [ProfileAction.addAddress],
        mutationFn: async (data: Types.Address) => {
            return addAddress(userData!, data)
        },
        onSuccess: (data: User) => {
            queryClient.setQueryData([ProfileAction.getUser], () => {
                return data
            })
            closeAddressModal()
        },
    })

    const updateAddressMutation = useMutation({
        mutationKey: [ProfileAction.updateAddress],
        mutationFn: async (data: Types.Address) => {
            return updateAddress(userData!, data)
        },
        onSuccess: (updatedAddress: Types.Address) => {
            queryClient.setQueryData([ProfileAction.getUser], (user: User) => {
                const updatedAddresses = user.addresses?.map((address) => {
                    if (address.id === updatedAddress.id) {
                        return updatedAddress
                    }
                    if (address.isDefault && updatedAddress.isDefault) {
                        return {
                            ...address,
                            isDefault: false,
                        }
                    }
                    return address
                })

                return {
                    ...user,
                    addresses: updatedAddresses,
                }
            })
            closeAddressModal()
        },
    })

    async function onSubmit(data: Types.Address) {
        if (selectedAddress) {
            await updateAddressMutation.mutateAsync({
                ...data,
                id: selectedAddress.id,
            })
        } else {
            await addAddressMutation.mutateAsync(data)
        }
    }

    useEffect(() => {
        if (selectedAddress) {
            setValue('addressLine1', selectedAddress.addressLine1)
            setValue('addressLine2', selectedAddress.addressLine2)
            setValue('city', selectedAddress.city)
            setValue('contactNumber', selectedAddress.contactNumber)
            setValue('firstName', selectedAddress.firstName)
            setValue('lastName', selectedAddress.lastName)
            setValue('zipCode', selectedAddress.zipCode)
            setValue('isDefault', selectedAddress.isDefault)
        } else {
            reset()
        }
    }, [selectedAddress, setValue, reset])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AddressModal
                    isLoading={
                        addAddressMutation.isPending ||
                        updateAddressMutation.isPending
                    }
                    buttonText={selectedAddress ? 'Update' : 'Add'}
                    isOpen={isAddressModalOpened}
                    onOpenChange={onOpenChange}
                    control={control}
                />
            </form>

            <Card className="mt-5">
                <CardBody>
                    <CardHeader className="flex justify-between">
                        <p>Addresses</p>
                        <Button
                            onClick={() => {
                                setSelectedAddress(undefined)
                                openAddressModal()
                            }}
                            startContent={<FaPlus />}
                        >
                            Add address
                        </Button>
                    </CardHeader>

                    <div className="container mx-auto px-8 sm:px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {userData?.addresses?.map((address, index) => (
                                <AddressDetails
                                    key={index}
                                    address={address}
                                    onEdit={() => handleAddressEdit(address)}
                                    onDelete={() =>
                                        handleAddressDelete(address)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

interface UserInfoProps {
    userData?: User | null
}

function ManageUserInfo({ userData }: UserInfoProps) {
    const [isProfileFormEnabled, setIsProfileFormEnabled] = useState(false)

    return (
        <Card shadow="sm">
            <CardBody>
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
                <div className="flex gap-5 mt-3">
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="First Name"
                        defaultValue={userData?.firstName}
                    />
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="Last Name"
                        defaultValue={userData?.lastName}
                    />
                </div>

                <Spacer y={5} />

                <div className="flex gap-5">
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="Email Address"
                        defaultValue={userData?.email}
                    />
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="Phone Number"
                        defaultValue={userData?.phone}
                    />
                </div>

                <div className="mt-5 flex items-center justify-center">
                    <Button variant="solid" className="w-80" color="secondary">
                        Update
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default function Profile() {
    const { data: auth, isSuccess: isAuthSuccess } = useQuery({
        queryKey: [AuthAction.auth],
        queryFn: isAuthenticated,
    })

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: [ProfileAction.getUser],
        queryFn: () => getUserData(auth?.user?.email),
        enabled: isAuthSuccess && !!auth,
    })

    return (
        <div className="mb-unit-xl">
            <Card className="p-unit-lg m-unit-xl">
                <h1 className={title()}>Your Account</h1>
                <p className={subtitle()}>
                    View all your orders and manage your account information.
                </p>

                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options" defaultSelectedKey={'profile'}>
                        <Tab key="orders" title="Orders">
                            <Card>
                                <CardBody>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>
                                            You haven&apos;t placed any orders
                                            yet.
                                        </p>
                                        <Button
                                            className="w-48 mt-5"
                                            as={Link}
                                            href="/"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="profile" title="Profile">
                            <Card>
                                <CardBody className="min-h-[400px]">
                                    {isUserLoading ? (
                                        <Spinner color="secondary" />
                                    ) : (
                                        <div className="p-unit-lg">
                                            <ManageUserInfo
                                                userData={userData}
                                            />
                                            <Spacer y={2} />
                                            <ManageAddresses
                                                userData={userData}
                                            />
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </Card>
        </div>
    )
}
