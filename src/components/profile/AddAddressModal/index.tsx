import {
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react'
import { Control, Controller } from 'react-hook-form'
import { Address } from '../../../types/address'

interface AddressModalProps {
    isOpen: boolean
    isLoading: boolean
    onOpenChange: (open: boolean) => void
    control: Control<Address>
    buttonText?: string
}

export default function AddressModal({
    isOpen,
    onOpenChange,
    control,
    isLoading,
    buttonText,
}: AddressModalProps) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <form>
                            <ModalHeader className="flex flex-col gap-1">
                                Add Address
                            </ModalHeader>
                            <ModalBody>
                                <Controller
                                    name={'addressLine1'}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Input
                                            fullWidth
                                            {...field}
                                            label={'Address Line 1'}
                                            placeholder="1234 Main St"
                                            isRequired
                                        />
                                    )}
                                />

                                <Controller
                                    name="addressLine2"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            autoFocus
                                            fullWidth
                                            label={'Address Line 2'}
                                            placeholder="Apartment, studio, or floor"
                                        />
                                    )}
                                />

                                <Controller
                                    name="contactNumber"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            autoFocus
                                            fullWidth
                                            label={'Contact Number'}
                                            placeholder="Contact Number"
                                            isRequired
                                        />
                                    )}
                                />

                                <div className="flex gap-5">
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                autoFocus
                                                fullWidth
                                                label={'First Name'}
                                                placeholder="First Name"
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                autoFocus
                                                fullWidth
                                                label={'Last Name'}
                                                placeholder="Last Name"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="flex gap-5">
                                    <Controller
                                        name="city"
                                        rules={{ required: true }}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                autoFocus
                                                fullWidth
                                                label={'City'}
                                                placeholder="Karachi"
                                                isRequired
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="zipCode"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                autoFocus
                                                fullWidth
                                                label={'Zip Code'}
                                                placeholder="1234"
                                            />
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="isDefault"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            onChange={field.onChange}
                                            isSelected={field.value ?? false}
                                            checked={field.value ?? false}
                                            onValueChange={field.onChange}
                                            classNames={{
                                                label: 'text-small',
                                            }}
                                            color="secondary"
                                        >
                                            Mark as default
                                        </Checkbox>
                                    )}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    isLoading={isLoading}
                                    variant="solid"
                                    color="secondary"
                                    type="submit"
                                >
                                    {buttonText}
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
