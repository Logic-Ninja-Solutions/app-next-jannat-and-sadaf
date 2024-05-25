'use client'

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react'
import { ProductVariant } from '../../../types/product'

type ChartCell = { label: string; value: string }

function SizeChart({ sizeMetadata }: { sizeMetadata?: ChartCell[] }) {
    if (!sizeMetadata) return <></>
    const rows = sizeMetadata?.map((cell, index) => (
        <TableRow key={index}>
            <TableCell>{cell.label}</TableCell>
            <TableCell>{cell.value}</TableCell>
        </TableRow>
    ))

    return (
        <>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Label</TableColumn>
                    <TableColumn>Size (Inches)</TableColumn>
                </TableHeader>
                <TableBody>{rows}</TableBody>
            </Table>
        </>
    )
}

interface Props {
    variant?: ProductVariant
    opened: boolean
    close: () => void
    onOpenChange?: (opened: boolean) => void
}

export default function VariantSizeChartModal({
    variant,
    opened,
    close,
    onOpenChange,
}: Props) {
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
                    <div className="w-full">
                        <SizeChart sizeMetadata={variant?.sizeMetadata} />
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
