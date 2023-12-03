import * as Types from '@prisma/client'
import { Prisma } from '@prisma/client'

export type UserWithAddresses = Prisma.UserGetPayload<{
    include: {
        addresses: true
    }
}>

export type CartItem = Types.CartItem

export default Types
