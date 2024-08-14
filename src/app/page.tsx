import { listCollections } from '../actions/collections'
import HomePage from '../components/home'

async function Page() {
    const collections = await listCollections().catch(() => [])

    return (
        <>
            <HomePage collections={collections} />
        </>
    )
}

export default Page
