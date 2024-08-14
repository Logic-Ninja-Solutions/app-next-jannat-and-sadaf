import { Input } from '@nextui-org/react'
import { Control, Controller } from 'react-hook-form'
import { GuestAddress } from '../../../types/address'

interface Props {
    control: Control<GuestAddress>
}

export default function GuestAddressForm({ control }: Props) {
    return (
        <>
            <div className="flex flex-col gap-4">
                <Controller
                    name="addressLine1"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input
                            fullWidth
                            {...field}
                            label="Address Line 1"
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
                            fullWidth
                            {...field}
                            label="Address Line 2"
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
                            fullWidth
                            {...field}
                            label="Contact Number"
                            placeholder="Contact Number"
                            isRequired
                        />
                    )}
                />

                <div className="flex gap-5">
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                fullWidth
                                {...field}
                                label="First Name"
                                placeholder="First Name"
                                isRequired
                            />
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                fullWidth
                                {...field}
                                label="Last Name"
                                placeholder="Last Name"
                                isRequired
                            />
                        )}
                    />
                </div>

                <div className="flex gap-5">
                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                fullWidth
                                {...field}
                                label="City"
                                placeholder="Karachi"
                                isRequired
                            />
                        )}
                    />

                    <Controller
                        name="zipCode"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                fullWidth
                                {...field}
                                label="Zip Code"
                                placeholder="1234"
                                isRequired
                            />
                        )}
                    />
                </div>
            </div>
        </>
    )
}
