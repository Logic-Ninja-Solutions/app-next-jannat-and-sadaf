import React from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
    useModal,
} from '@nextui-org/react'

import clsx from 'clsx'

type Props = Omit<
    ModalProps,
    'className' | 'fullScreen' | 'closeButton' | 'animated' | 'blur'
>

const Drawer: React.FC<Props> = ({ children, ...props }) => {
    const { isOpen } = props

    return (
        <Modal
            {...props}
            className={clsx(
                'fixed top-0 right-0 bottom-0',
                'w-96 h-full',
                'border-0 max-h-full',
                'transition-transform ease-in-out duration-300',
                isOpen ? 'animate-slide-in' : 'animate-slide-out'
            )}
            placement="top"
            size="full"
        >
            <ModalContent>{children}</ModalContent>
        </Modal>
    )
}

export const DrawerContent = ModalContent
export const DrawerHeader = ModalHeader
export const DrawerBody = ModalBody
export const DrawerFooter = ModalFooter

export const useDrawer = useModal

export default Drawer
