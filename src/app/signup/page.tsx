import { Button, Card, CardBody, Input } from '@nextui-org/react'
import Link from 'next/link'

export default function Signup() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="p-6 sm:min-w-[400px]">
                <CardBody className="gap-3">
                    <Input
                        radius={'md'}
                        type="text"
                        label="First Name"
                        placeholder="Enter your first name"
                    />
                    <Input
                        radius={'md'}
                        type="text"
                        label="Last Name"
                        placeholder="Enter your last name"
                    />
                    <Input
                        radius={'md'}
                        type="password"
                        label="password"
                        placeholder="Enter your password"
                    />
                    <Input
                        radius={'md'}
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm your password"
                    />

                    <Button color="secondary">Create an account</Button>
                    <p className="text-center">
                        Already have an account?{' '}
                        <Link href="/login">Login</Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    )
}
