'use client'

import { isAuthenticated } from '@/src/actions/auth'
import { AuthAction } from '@/src/actions/auth/enum'
import { getUserData } from '@/src/actions/profile'
import { ProfileAction } from '@/src/actions/profile/enum'
import { subtitle, title } from '@/src/components/primitives'
import { Button, Card, CardBody, Spinner, Tab, Tabs } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function Profile() {
    const { data: auth, isSuccess: isAuthSuccess } = useQuery({
        queryKey: [AuthAction.auth],
        queryFn: isAuthenticated,
    })

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: [ProfileAction.getUser],
        queryFn: () => getUserData(auth?.user?.email),
        enabled: isAuthSuccess && !!auth,
    })

    console.log(userData)

    return (
        <>
            <Card className="p-unit-lg m-unit-xl">
                <h1 className={title()}>Your Account</h1>
                <p className={subtitle()}>
                    View all your orders and manage your account information.
                </p>

                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options" defaultSelectedKey={'profile'}>
                        <Tab key="orders" title="Orders">
                            <Card>
                                <CardBody>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>
                                            You haven&apos;t placed any orders
                                            yet.
                                        </p>
                                        <Button
                                            className="w-48 mt-5"
                                            as={Link}
                                            href="/"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="profile" title="Profile">
                            <Card>
                                <CardBody className="min-h-[400px]">
                                    {isUserLoading ? (
                                        <Spinner color="secondary" />
                                    ) : (
                                        <p>hello</p>
                                    )}
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </Card>
        </>
    )
}
