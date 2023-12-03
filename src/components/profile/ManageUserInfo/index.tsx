import { UserWithAddresses } from '@/src/types/prisma'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Card, CardBody, Spacer } from '@nextui-org/react'
import { Switch } from '@nextui-org/switch'
import { useState } from 'react'
import { FaUnlock, FaLock } from 'react-icons/fa'

type User = UserWithAddresses

interface UserInfoProps {
    userData?: User | null
}

export default function ManageUserInfo({ userData }: UserInfoProps) {
    const [isProfileFormEnabled, setIsProfileFormEnabled] = useState(false)

    return (
        <Card shadow="sm">
            <CardBody>
                <div className="flex gap-unit-md">
                    <p>Your Info</p>
                    <Switch
                        isSelected={isProfileFormEnabled}
                        onValueChange={setIsProfileFormEnabled as any}
                        size="sm"
                        color="success"
                        startContent={<FaUnlock />}
                        endContent={<FaLock />}
                    ></Switch>{' '}
                </div>
                <div className="flex gap-5 mt-3">
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="First Name"
                        defaultValue={userData?.firstName}
                    />
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="Last Name"
                        defaultValue={userData?.lastName}
                    />
                </div>

                <Spacer y={5} />

                <div className="flex gap-5">
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="Email Address"
                        defaultValue={userData?.email}
                    />
                    <Input
                        disabled={!isProfileFormEnabled}
                        label="Phone Number"
                        defaultValue={userData?.phone}
                    />
                </div>

                <div className="mt-5 flex items-center justify-center">
                    <Button variant="solid" className="w-80" color="secondary">
                        Update
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
