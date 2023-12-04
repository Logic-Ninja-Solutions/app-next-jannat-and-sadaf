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
import {
    UseDeleteAddressMutation,
    UseUpdateAddressMutation,
} from '@/src/api/address/mutations'
import AddressForm from '../AddressForm'

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

    const deleteAddressMutation = UseDeleteAddressMutation({
        userData,
        closeAddressModal,
    })

    function handleAddressDelete(address: Types.Address) {
        const data = confirm('Are you sure you want to delete this address?')
        if (data) deleteAddressMutation.mutate(address)
    }

    return (
        <>
            <AddressForm
                selectedAddress={selectedAddress}
                isOpen={isAddressModalOpened}
                onClose={closeAddressModal}
                onOpenChange={onOpenChange}
                userData={userData}
            />

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
