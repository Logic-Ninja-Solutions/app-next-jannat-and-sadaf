import React from 'react'
import ForgotPasswordContainer from '../../components/auth/ForgotPasswordContainer/ForgotPasswordContainer'
import ResetPasswordContainer from '../../components/auth/ResetPasswordContainer/ResetPasswordContainer'

interface PageProps {
    searchParams: {
        token: string
    }
}

function Page({ searchParams }: PageProps) {
    const token = searchParams.token

    return (
        <>
            {!!token ? (
                <ResetPasswordContainer token={token} />
            ) : (
                <ForgotPasswordContainer />
            )}
        </>
    )
}

export default Page
