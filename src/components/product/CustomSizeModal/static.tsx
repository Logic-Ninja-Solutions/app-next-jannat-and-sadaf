import { CustomSizes } from '@/src/models/custom.sizes'
import {
    Button,
    Card,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
} from '@nextui-org/react'

import { Key } from '@react-types/shared'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import backImage from './back_chart.png'
import { backSizes, frontSizes } from './constants'
import frontImage from './front_chart.png'

interface CustomSizeFormProps {
    sizes: CustomSizes
}

interface CustomSizeModalProps extends CustomSizeFormProps {
    opened: boolean
    close: () => void
    onOpenChange?: (opened: boolean) => void
}

function FrontSizesForm({ sizes = {} }: { sizes?: CustomSizes }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
                <Image className="bg-gray-200" src={frontImage} alt="front" />
            </div>
            <div
                className={clsx('flex flex-col gap-5 col-span-2 sm:col-span-1')}
            >
                {frontSizes.map((size, index) => (
                    <Input
                        key={index}
                        fullWidth
                        label={size}
                        value={sizes[size] || ''}
                        disabled
                    />
                ))}
            </div>
        </div>
    )
}

function BackSizesForm({ sizes = {} }: { sizes?: CustomSizes }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
                <Image className="bg-gray-200" src={backImage} alt="back" />
            </div>
            <div
                className={clsx('flex flex-col gap-5 col-span-2 sm:col-span-1')}
            >
                {backSizes.map((size, index) => (
                    <Input
                        key={index}
                        fullWidth
                        label={size}
                        value={sizes[size] || ''}
                        disabled
                    />
                ))}
            </div>
        </div>
    )
}

export default function CustomSizeModalStatic({
    opened,
    close,
    onOpenChange,
    sizes,
}: CustomSizeModalProps) {
    const [selected, setSelected] = useState<Key | null>('Front')

    return (
        <Modal
            size="3xl"
            placement="top"
            isOpen={opened}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Enter Size
                </ModalHeader>
                <ModalBody>
                    <div className="flex w-full flex-col">
                        <Tabs
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                            aria-label="CustomSizes"
                        >
                            <Tab title={'Front'}>
                                <Card className="p-5">
                                    <FrontSizesForm sizes={sizes} />
                                </Card>
                            </Tab>
                            <Tab title={'Back'}>
                                <Card className="p-5">
                                    <BackSizesForm sizes={sizes} />
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="solid" onClick={close}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
