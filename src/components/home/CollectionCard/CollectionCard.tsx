import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, Image, Link } from '@nextui-org/react'
import { Collection } from '../../../actions/collections'
import Title from '../../core/Title/Title'

type CategoryCardProps = {
    collection: Collection
}

function CollectionCard({ collection }: CategoryCardProps) {
    const { title, image } = collection
    return (
        <div className="container">
            <Card className="shadow-none ">
                <CardBody className="overflow-visible p-0">
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="w-full object-cover "
                        src={image || ''}
                    />
                </CardBody>
                <CardFooter className="bg-content1 container">
                    <div className="mx-auto">
                        <Title className="mb-1 sm:my-8">{title}</Title>
                        <div className="mx-auto mb-0 sm:mb-8 flex justify-center ">
                            <Button
                                as={Link}
                                href={`collection/${collection.slug}`}
                            >
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CollectionCard
