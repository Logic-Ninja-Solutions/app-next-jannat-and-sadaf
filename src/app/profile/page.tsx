'use client'

import { getUserData } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { subtitle, title } from '@/src/components/primitives'
import ManageAddresses from '@/src/components/profile/ManageAddresses'
import ManageUserInfo from '@/src/components/profile/ManageUserInfo'
import ListOrders from '@/src/components/profile/OrderInfo'
import { Card, CardBody, Spacer, Spinner, Tab, Tabs } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../providers/Auth/UserProvider'

export default function Profile() {
    const { user: authenticatedUser } = useUserContext()
    const auth = { user: authenticatedUser }

    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: [ProfileAction.getUser],
        queryFn: () => getUserData(auth?.user?.email),
        enabled: !!auth,
    })

    const userData = user?.user

    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState('profile')

    useEffect(() => {
        if (searchParams.get('orders') !== null) {
            setActiveTab('orders')
        }
    }, [searchParams])

    if (isUserLoading || !userData) {
        return (
            <div className="flex items-center justify-center">
                <Spinner color="secondary" />
            </div>
        )
    }

    return (
        <div className="mb-unit-xl">
            <Card className="p-unit-lg m-unit-xl">
                <h1 className={title()}>Your Account</h1>
                <p className={subtitle()}>
                    View all your orders and manage your account information.
                </p>

                <div className="flex w-full flex-col">
                    <Tabs
                        selectedKey={activeTab}
                        onSelectionChange={setActiveTab as any}
                        aria-label="Profile Options"
                    >
                        <Tab key="orders" title="Orders">
                            <ListOrders userID={userData?.id} />
                        </Tab>
                        <Tab key="profile" title="Profile">
                            <Card>
                                <CardBody className="min-h-[800px]">
                                    {isUserLoading ? (
                                        <Spinner color="secondary" />
                                    ) : (
                                        <div className="p-0 sm:p-unit-lg">
                                            <ManageUserInfo
                                                userData={userData}
                                            />
                                            <Spacer y={2} />
                                            <ManageAddresses
                                                userData={userData}
                                            />
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </Card>
        </div>
    )
}
