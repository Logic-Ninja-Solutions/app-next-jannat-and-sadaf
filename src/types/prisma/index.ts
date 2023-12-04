import * as Types from '@prisma/client'
import { Prisma } from '@prisma/client'

export type UserWithAddresses = Prisma.UserGetPayload<{
    include: {
        addresses: true
    }
}>

export type UserUpdateInput = any
export type CreateUserInput = any
export type CartItem = Types.CartItem
export type Address = Types.Address

export default Types
