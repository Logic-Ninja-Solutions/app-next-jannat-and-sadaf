import Types, { UserWithAddresses } from '@/src/types/prisma'
import { Button } from '@nextui-org/button'
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Chip,
    Radio,
    RadioGroup,
    useDisclosure,
} from '@nextui-org/react'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import AddressForm from '../../profile/AddressForm'

interface AddressCardProps {
    address: Types.Address
}

function AddressCard({ address }: AddressCardProps) {
    return (
        <Card shadow="sm" className="w-64 sm:w-96 relative">
            <CardBody>
                {address.isDefault && (
                    <Chip className="absolute top-0 right-0 m-unit-xs">
                        default
                    </Chip>
                )}
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
    const [selectedEditAddress, setSelectedEditAddress] =
        useState<Types.Address>()

    const defaultAddress = userData?.addresses.find(
        (address) => address.isDefault
    )

    const [selectedAddress, setSelectedAddress] = useState<
        Types.Address | undefined
    >(defaultAddress)

    function handleAddressEdit(address: Types.Address) {
        setSelectedEditAddress(address)
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
                selectedAddress={selectedEditAddress}
                isOpen={isAddressModalOpened}
                onOpenChange={onAddressModalOpenChange}
                onClose={() => {
                    closeAddressModal()
                }}
            />
            <Card>
                <CardBody className="p-unit-md">
                    <Accordion defaultSelectedKeys={['2', '3', '4']}>
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
                                defaultValue={defaultAddress?.id}
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
                            aria-label="Shipping Info"
                            title="Shipping Info"
                        >
                            <RadioGroup
                                defaultValue={'standard'}
                                color="secondary"
                                label="Shipping Method"
                                className="w-ful"
                            >
                                <Radio value={'standard'}>
                                    Standard Shipping - Free
                                </Radio>
                            </RadioGroup>
                        </AccordionItem>

                        <AccordionItem
                            key="4"
                            aria-label="Payment"
                            title="Payment"
                        >
                            <RadioGroup
                                defaultValue={'cod'}
                                color="secondary"
                                label="Payment Method"
                                className="w-ful"
                            >
                                <Radio value={'cod'}>Cash on Delivery</Radio>
                            </RadioGroup>
                        </AccordionItem>
                    </Accordion>

                    <Button className="mt-unit-md">Complete Order</Button>
                </CardBody>
            </Card>
        </>
    )
}
