import { Suspense } from 'react'
import LoginContainer from '../../components/auth/LoginContainer/LoginContainer'

function Page() {
    return (
        <>
            <Suspense>
                <LoginContainer />
            </Suspense>
        </>
    )
}

export default Page
