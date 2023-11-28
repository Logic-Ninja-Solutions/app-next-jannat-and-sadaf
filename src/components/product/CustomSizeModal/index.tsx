import {
    Button,
    Card,
    CardBody,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
} from '@nextui-org/react'

import clsx from 'clsx'
import React, { useState } from 'react'
import { Key } from '@react-types/shared'

interface CustomSizeModalProps {
    opened: boolean
    close: () => void
    onOpenChange?: (opened: boolean) => void
}

const frontImage = 'size_chart_front.png'
const backImage = 'size_chart_back.png'

const frontSizes = [
    'Neck Path',
    'Sleeve Length',
    'Shirt Length',
    'Bust Circumference',
    'Waist',
    'Hip Circumference',
    'Thigh Circumference',
    'Knee Circumference',
    'Calf Circumference',
    'Ankle',
]

const backSizes = [
    'Back Next Depth',
    'Cross Shoulder',
    'Trouser Length',
    'Armhole',
    'Bicep',
]

function FrontSizes() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
                <Image
                    className="bg-gray-200  "
                    radius="lg"
                    src={frontImage}
                    alt="front"
                />
            </div>
            <div
                className={clsx(
                    'flex flex-col gap-5  col-span-2 sm:col-span-1 '
                )}
            >
                {frontSizes.map((size, index) => (
                    <Input
                        fullWidth
                        key={index}
                        label={size}
                        placeholder="Enter size"
                    />
                ))}
            </div>
        </div>
    )
}

function BackSizes() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
                <Image
                    className="bg-gray-200  "
                    radius="lg"
                    src={backImage}
                    alt="front"
                />
            </div>
            <div
                className={clsx(
                    'flex flex-col gap-5  col-span-2 sm:col-span-1 '
                )}
            >
                {backSizes.map((size, index) => (
                    <Input
                        fullWidth
                        key={index}
                        label={size}
                        placeholder="Enter size"
                    />
                ))}
            </div>
        </div>
    )
}

export default function CustomSizeModal({
    opened,
    close,
    onOpenChange,
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
                                    <FrontSizes />
                                </Card>
                            </Tab>
                            <Tab title={'Back'}>
                                <Card className="p-5">
                                    <BackSizes />
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="solid"
                        onClick={() => {
                            if (selected === '$.0') {
                                close()
                            } else {
                                setSelected('$.0')
                            }
                        }}
                    >
                        {selected === '$.0' ? 'Close' : 'Back'}
                    </Button>
                    <Button
                        variant="solid"
                        color="secondary"
                        onPress={() => {
                            if (selected === '$.0') {
                                setSelected('$.1')
                            } else {
                                close()
                            }
                        }}
                    >
                        {selected === '$.0' ? 'Next' : 'Save'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
