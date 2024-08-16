import React, { Suspense } from 'react'
import SignupContainer from '../../components/auth/SignupContainer/SignupContainer'

function Page() {
    return (
        <>
            <Suspense>
                <SignupContainer />
            </Suspense>
        </>
    )
}

export default Page
