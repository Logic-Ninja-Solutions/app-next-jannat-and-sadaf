import { Button, Card, CardBody, Input } from '@nextui-org/react'
import Link from 'next/link'
export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="p-6 sm:min-w-[400px]">
                <CardBody className="gap-3">
                    <Input
                        radius={'md'}
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <Input
                        radius={'md'}
                        type="password"
                        label="password"
                        placeholder="Enter your password"
                    />
                    <Button as={Link} href="/" color="secondary">
                        Signin
                    </Button>

                    <p className="text-center">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup">Signup</Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    )
}
