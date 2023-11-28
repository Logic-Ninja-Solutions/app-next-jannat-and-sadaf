import { Link } from '@nextui-org/link'
import {
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Navbar as NextUINavbar,
} from '@nextui-org/navbar'

import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'
import { ThemeSwitch } from '@components/core/ThemeSwitch'
import { Logo } from '@components/core/Logo'

export const Navbar = () => (
    <NextUINavbar className="h-20" maxWidth="xl" position="sticky">
        <NavbarContent justify="center">
            <NavbarBrand>
                <Logo />
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="flex" justify="end">
            <NavbarItem className="flex gap-5">
                <Link href="/login">
                    <FaUser className="text-default-500" />
                </Link>
                <Link href="#">
                    <FaSearch className="text-default-500" />
                </Link>
                <Link href="#">
                    <FaShoppingBag className="text-default-500" />
                </Link>
                <ThemeSwitch />
            </NavbarItem>
        </NavbarContent>
    </NextUINavbar>
)
