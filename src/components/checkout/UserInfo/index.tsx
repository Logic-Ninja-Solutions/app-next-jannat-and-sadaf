import Types, { UserWithAddresses } from '@/src/types/prisma'
import { Button } from '@nextui-org/button'
import {
    useDisclosure,
    Card,
    CardBody,
    Accordion,
    AccordionItem,
    RadioGroup,
    Radio,
} from '@nextui-org/react'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import AddressForm from '../../profile/AddressForm'

interface AddressCardProps {
    address: Types.Address
}

function AddressCard({ address }: AddressCardProps) {
    return (
        <Card shadow="sm" className="w-64 sm:w-96">
            <CardBody>
                <p>{address.addressLine1}</p>
                <p>{address.addressLine2}</p>
                <p>
                    {address.city}, {address.zipCode}
                </p>
            </CardBody>
        </Card>
    )
}

interface UserInfoProps {
    userData?: UserWithAddresses | null
}

export default function UserInfo({ userData }: UserInfoProps) {
    const [selectedAddress, setSelectedAddress] = useState<Types.Address>()

    function handleAddressEdit(address: Types.Address) {
        setSelectedAddress(address)
        openAddressModal()
    }

    const {
        isOpen: isAddressModalOpened,
        onOpen: openAddressModal,
        onOpenChange: onAddressModalOpenChange,
        onClose: closeAddressModal,
    } = useDisclosure()

    return (
        <>
            <AddressForm
                userData={userData}
                selectedAddress={selectedAddress}
                isOpen={isAddressModalOpened}
                onOpenChange={onAddressModalOpenChange}
                onClose={() => {
                    setSelectedAddress(undefined)
                    closeAddressModal()
                }}
            />
            <Card>
                <CardBody className="p-unit-md">
                    <Accordion defaultSelectedKeys={['1', '2']}>
                        <AccordionItem
                            key="1"
                            aria-label="Account"
                            title="Account"
                        >
                            <div className="flex justify-between align-middle items-center ">
                                <p>
                                    Email: <span>{userData?.email}</span>
                                </p>
                                <Button>Logout</Button>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="2"
                            aria-label="Address"
                            title="Address"
                        >
                            <RadioGroup
                                color="secondary"
                                label="Select your address"
                                className="w-ful"
                            >
                                {userData?.addresses.map((address, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-5"
                                        >
                                            <Radio
                                                value={address.id}
                                                className="mb-5"
                                            >
                                                <AddressCard
                                                    address={address}
                                                />
                                            </Radio>
                                            <Button
                                                isIconOnly
                                                onClick={() => {
                                                    handleAddressEdit(address)
                                                }}
                                            >
                                                <FaEdit />
                                            </Button>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        </AccordionItem>

                        <AccordionItem
                            key="3"
                            aria-label="Payment"
                            title="Payment"
                        ></AccordionItem>
                    </Accordion>
                </CardBody>
            </Card>
        </>
    )
}
