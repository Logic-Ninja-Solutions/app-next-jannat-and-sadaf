import { Link } from '@nextui-org/link'
import {
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Navbar as NextUINavbar,
} from '@nextui-org/navbar'

import { unauthenticate } from '@/src/actions/auth'
import { AuthAction } from '@/src/actions/auth/enum'
import { Logo } from '@components/core/Logo'
import { ThemeSwitch } from '@components/core/ThemeSwitch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { FaShoppingBag, FaUser } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { useUserContext } from '../../../providers/Auth/UserProvider'
import { CartDrawerContext } from '../../layouts/DefaultLayout'

export function Navbar() {
    const { user: authenticatedUser } = useUserContext()
    const isSuccess = !!authenticatedUser

    const queryClient = useQueryClient()
    const router = useRouter()

    const logoutMutation = useMutation({
        mutationKey: [AuthAction.logout],
        mutationFn: unauthenticate,
        onSuccess: () => {
            queryClient.invalidateQueries()
            queryClient.clear()
            router.refresh()
        },
    })

    const { openCart } = useContext(CartDrawerContext)

    return (
        <NextUINavbar className="h-20" maxWidth="xl" position="sticky">
            <NavbarContent justify="center">
                <NavbarBrand>
                    <Logo />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="flex" justify="end">
                <NavbarItem className="flex gap-5">
                    <Link href="/profile">
                        <FaUser className="text-default-500" />
                    </Link>

                    <Link href="#" onClick={openCart}>
                        <FaShoppingBag className="text-default-500" />
                    </Link>

                    {isSuccess && (
                        <Link
                            href="#"
                            onClick={async () => {
                                await logoutMutation.mutateAsync()
                            }}
                        >
                            <IoLogOut size={20} className="text-default-500" />
                        </Link>
                    )}
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    )
}
