import { paymentMethods, shippingMethods } from '@/src/actions/order/constants'
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
import { FaEdit, FaPlus } from 'react-icons/fa'
import { Address } from '../../../types/address'
import { User } from '../../../types/user'
import AddressForm from '../../profile/AddressForm'

interface AddressCardProps {
    address: Address
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
    userData?: User | null
    selectedAddressID: string | undefined
    setSelectedAddressID: (id: string | undefined) => void

    selectedShippingMethod?: string
    setSelectedShippingMethod?: (method: string) => void

    selectedPaymentMethod?: string
    setSelectedPaymentMethod?: (method: string) => void

    isLoading?: boolean
    onCreateOrder?: () => void
}

export default function UserInfo({
    userData,
    selectedAddressID,
    setSelectedAddressID,

    selectedShippingMethod,
    setSelectedShippingMethod,

    selectedPaymentMethod,
    setSelectedPaymentMethod,

    isLoading,
    onCreateOrder,
}: UserInfoProps) {
    const [selectedEditAddress, setSelectedEditAddress] =
        useState<Address>()

    function handleAddressEdit(address: Address) {
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
                                value={selectedAddressID}
                                onValueChange={setSelectedAddressID}
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
                            <Button
                                onClick={() => {
                                    openAddressModal()
                                    setSelectedAddressID(undefined)
                                }}
                            >
                                Add Address <FaPlus />
                            </Button>
                        </AccordionItem>

                        <AccordionItem
                            key="3"
                            aria-label="Shipping Info"
                            title="Shipping Info"
                        >
                            <RadioGroup
                                value={selectedShippingMethod}
                                onValueChange={setSelectedShippingMethod}
                                color="secondary"
                                label="Shipping Method"
                                className="w-ful"
                            >
                                {shippingMethods.map((method, index) => {
                                    return (
                                        <Radio
                                            key={index}
                                            value={method.label}
                                            className="mb-5"
                                        >
                                            {`${method.label} - ${method.price}`}
                                        </Radio>
                                    )
                                })}
                            </RadioGroup>
                        </AccordionItem>

                        <AccordionItem
                            key="4"
                            aria-label="Payment"
                            title="Payment"
                        >
                            <RadioGroup
                                value={selectedPaymentMethod}
                                onValueChange={setSelectedPaymentMethod}
                                color="secondary"
                                label="Payment Method"
                                className="w-ful"
                            >
                                {paymentMethods.map((method, index) => {
                                    return (
                                        <Radio
                                            key={index}
                                            value={method.label}
                                            className="mb-5"
                                        >
                                            {method.label}
                                        </Radio>
                                    )
                                })}
                            </RadioGroup>
                        </AccordionItem>
                    </Accordion>

                    <Button
                        isDisabled={
                            !selectedAddressID ||
                            !selectedShippingMethod ||
                            !selectedPaymentMethod
                        }
                        isLoading={isLoading}
                        onClick={onCreateOrder}
                        className="mt-unit-md"
                    >
                        Complete Order
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}
