import Types from '@/src/types/prisma'
import { Card, CardBody, CardFooter } from '@nextui-org/react'

interface AddressProps {
    address: Types.Address
    onEdit?: () => void
    onDelete?: () => void
}

export default function AddressDetails({
    address,
    onEdit,
    onDelete,
}: AddressProps) {
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
