import { useState, InputHTMLAttributes } from 'react'
import { Input } from '@nextui-org/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface PasswordFieldProps {
    name?: string
    label: string
    placeholder: string
    otherProps?: any
}

export default function PasswordField({
    name,
    label,
    placeholder,
    otherProps = {},
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

    return (
        <div className="relative">
            <Input
                name={name}
                label={label}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                {...otherProps}
            />
            <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
        </div>
    )
}
