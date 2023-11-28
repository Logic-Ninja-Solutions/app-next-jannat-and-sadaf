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

import './styles.css'

type Props = Omit<
    ModalProps,
    'className' | 'fullScreen' | 'closeButton' | 'animated' | 'blur'
>

const Drawer: React.FC<Props> = ({ children, ...props }) => {
    const { isOpen } = props

    return (
        <Modal
            {...props}
            classNames={{
                wrapper: 'w-full',
            }}
            className={`drawer drawer-animated ${
                isOpen
                    ? 'drawer-animated-slide-in'
                    : 'drawer-animated-slide-out'
            }`}
            placement="top"
            hideCloseButton
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
