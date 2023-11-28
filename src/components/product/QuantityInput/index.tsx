import { Button } from '@nextui-org/button'
import { FaPlus, FaMinus } from 'react-icons/fa'

type QuantityInputProps = {
    quantity: number
    setQuantity: (quantity: number) => void
}

const minQuantity = 1
const maxQuantity = 10

export default function QuantityInput({
    quantity,
    setQuantity,
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
