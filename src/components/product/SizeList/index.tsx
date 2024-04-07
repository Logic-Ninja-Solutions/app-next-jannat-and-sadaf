import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { ProductVariant } from '../../../types/product'


interface SizesListProps {
    variants: ProductVariant[]
    selectedVariant: ProductVariant | undefined
    setSelectedVariant: (size: ProductVariant) => void
    disabled?: boolean
}

export default function SizesList({
    variants,
    selectedVariant,
    setSelectedVariant,
    disabled = false,
}: SizesListProps) {
    return (
        <>
            <div className="flex gap-4">
                {variants.map((variant, index) => (
                    <Button
                        disabled={disabled}
                        onClick={() => setSelectedVariant(variant)}
                        isIconOnly={variant.size != 'Custom'}
                        key={index}
                        className={clsx(
                            selectedVariant?.size === variant.size &&
                                'bg-secondary text-foreground-50',
                            (variant.quantity === 0 || !variant.isAvailable) &&
                                'line-through'
                        )}
                    >
                        {variant.size}
                    </Button>
                ))}
            </div>
        </>
    )
}
