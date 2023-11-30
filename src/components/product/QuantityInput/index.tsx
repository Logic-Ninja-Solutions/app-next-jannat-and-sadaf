import { Button } from '@nextui-org/button'
import { FaPlus, FaMinus } from 'react-icons/fa'

type QuantityInputProps = {
    isDisabled?: boolean
    quantity: number
    setQuantity: (quantity: number) => void
    min: number
    max: number
}

export default function QuantityInput({
    isDisabled = false,
    quantity,
    setQuantity,
    min: minQuantity,
    max: maxQuantity,
}: QuantityInputProps) {
    function handleIncrement() {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1)
        }
    }
    function handleDecrement() {
        if (quantity > minQuantity) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className="flex gap-3">
            <Button
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
