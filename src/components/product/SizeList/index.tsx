import Size from '@/src/models/product.size'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'

export default function SizesList({
    sizes,
    selectedSize,
    setSelectedSize,
}: {
    sizes: Size[]
    selectedSize: Size | undefined
    setSelectedSize: (size: Size) => void
}) {
    return (
        <>
            <div className="flex gap-4">
                {sizes.map((size, index) => (
                    <Button
                        onClick={() => setSelectedSize(size)}
                        isIconOnly={size.name != 'Custom'}
                        key={index}
                        className={clsx(
                            selectedSize?.name === size.name &&
                                'bg-secondary text-foreground-50',
                            size.quantity === 0 && 'line-through'
                        )}
                    >
                        {size.name}
                    </Button>
                ))}
            </div>
        </>
    )
}
