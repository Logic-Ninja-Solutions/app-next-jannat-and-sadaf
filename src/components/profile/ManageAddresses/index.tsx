import { UseDeleteAddressMutation } from '@/src/api/address/mutations'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Address } from '../../../types/address'
import { User } from '../../../types/user'
import AddressDetails from '../AddressDetail'
import AddressForm from '../AddressForm'


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

    const [selectedAddress, setSelectedAddress] = useState<Address>()

    function handleAddressEdit(address: Address) {
        setSelectedAddress(address)
        openAddressModal()
    }

    const deleteAddressMutation = UseDeleteAddressMutation({
        userData,
        onSuccessfulMutation: () => {
            closeAddressModal()
        },
    })

    function handleAddressDelete(address: Address) {
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
