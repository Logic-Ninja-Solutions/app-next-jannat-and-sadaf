import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import ForeignLink from '../ForeignLink/ForeignLink'
import { Logo } from '../Logo'

function Footer() {
    const phone = '+923008663210'
    return (
        <footer className="text-secondary p-4 inset-x-0 bottom-0 border-t-1 bg-primary">
            <div className="flex justify-between items-center">
                <Logo />
                <div className="flex space-x-4">
                    <ForeignLink href={'https://www.facebook.com/jannatarshad'} >
                        <FaFacebook size={24} />
                    </ForeignLink>
                    <ForeignLink href="https://www.instagram.com/jannatandsadaf/" >
                        <FaInstagram size={24} />
                    </ForeignLink>
                    <ForeignLink href={`https://wa.me/${phone}`} >
                        <FaWhatsapp size={24} />
                    </ForeignLink>
                </div>
                <p className="text-sm">© 2024 - Jannat and Sadaf</p>
            </div>
        </footer>
    )
}

export default Footer
