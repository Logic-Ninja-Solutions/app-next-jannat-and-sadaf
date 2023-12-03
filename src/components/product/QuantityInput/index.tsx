import { Button } from '@nextui-org/button'
import { FaPlus, FaMinus } from 'react-icons/fa'

type QuantityInputProps = {
    isDisabled?: boolean
    quantity: number
    handleQuantity: (quantity: number) => void
    min: number
    max: number
    isSmall?: boolean
}

export default function QuantityInput({
    isDisabled = false,
    quantity,
    handleQuantity,
    min: minQuantity,
    max: maxQuantity,
    isSmall = false,
}: QuantityInputProps) {
    function handleIncrement() {
        if (quantity < maxQuantity) {
            handleQuantity(1)
        }
    }
    function handleDecrement() {
        if (quantity > minQuantity) {
            handleQuantity(-1)
        }
    }

    return (
        <div className="flex gap-3">
            <Button
                size={isSmall ? 'sm' : 'md'}
                disabled={isDisabled}
                onClick={handleDecrement}
                className="self-center"
                isIconOnly
                color="secondary"
                aria-label="minus"
            >
                <FaMinus />
            </Button>

            <span className="my-auto">{quantity}</span>

            <Button
                size={isSmall ? 'sm' : 'md'}
                disabled={isDisabled}
                className="self-center"
                isIconOnly
                color="secondary"
                aria-label="add"
                onClick={handleIncrement}
            >
                <FaPlus />
            </Button>
        </div>
    )
}
