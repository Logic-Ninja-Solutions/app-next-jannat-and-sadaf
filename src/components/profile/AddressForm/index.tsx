import Types, { UserWithAddresses } from '@/src/types/prisma'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AddressModal from '../AddAddressModal'
import { UseUpdateAddressMutation } from '@/src/api/address/mutations'
import { useDisclosure } from '@nextui-org/react'

interface AddressFormProps {
    userData?: UserWithAddresses | null
    selectedAddress?: Types.Address
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onClose: () => void
}

export default function AddressForm({
    selectedAddress,
    userData,
    isOpen,
    onClose,
    onOpenChange,
}: AddressFormProps) {
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

    const updateAddressMutation = UseUpdateAddressMutation({
        userData,
        closeAddressModal: onClose,
    })

    const addAddressMutation = UseUpdateAddressMutation({
        userData,
        closeAddressModal: onClose,
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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AddressModal
                    isLoading={updateAddressMutation.isPending}
                    buttonText={selectedAddress ? 'Update' : 'Add'}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    control={control}
                />
            </form>
        </>
    )
}
