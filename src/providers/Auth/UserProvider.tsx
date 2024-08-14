'use client'

import React, { PropsWithChildren } from 'react'
import AuthUser from '../../actions/auth/models/auth.user'

export const UserContext = React.createContext<{ user?: AuthUser }>({
    user: undefined,
})

export const useUserContext = () => React.useContext(UserContext)

type Props = {
    user?: AuthUser
} & PropsWithChildren

function UserProvider({ children, user }: Props) {
    return (
        <React.Fragment>
            <UserContext.Provider
                value={{
                    user,
                }}
            >
                {children}
            </UserContext.Provider>
        </React.Fragment>
    )
}

export default UserProvider
