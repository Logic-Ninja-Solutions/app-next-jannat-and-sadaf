import Types from '@/src/types/prisma'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'

type ProductVariant = Types.ProductVariant

interface SizesListProps {
    variants: ProductVariant[]
    selectedVariant: ProductVariant | undefined
    setSelectedVariant: (size: ProductVariant) => void
}

export default function SizesList({
    variants,
    selectedVariant,
    setSelectedVariant,
}: SizesListProps) {
    return (
        <>
            <div className="flex gap-4">
                {variants.map((variant, index) => (
                    <Button
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
