import { deleteAddress, addAddress, updateAddress } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import Types, { UserWithAddresses } from '@/src/types/prisma'
import { Button } from '@nextui-org/button'
import { useDisclosure, Card, CardBody, CardHeader } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import AddressModal from '../AddAddressModal'
import AddressDetails from '../AddressDetail'

type User = UserWithAddresses

interface ManageAddressesProps {
    userData?: User | null
}

export default function ManageAddresses({ userData }: ManageAddressesProps) {
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
                            isIconOnly
                            onClick={() => {
                                setSelectedAddress(undefined)
                                openAddressModal()
                            }}
                        >
                            <FaPlus />
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
