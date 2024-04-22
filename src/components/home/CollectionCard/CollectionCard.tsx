import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Title from '../../core/Title/Title'

type CategoryCardProps = {
    title: string
}

function CollectionCard({ title }: CategoryCardProps) {
    return (
        <div className="container">
                <Card className="shadow-none ">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            removeWrapper
                            alt="Card example background"
                            className="w-full object-cover "
                            src={
                                'https://www.mishalakhani.com/cdn/shop/files/4-A_536b64c8-a984-42f0-80d3-3d109563f18d.jpg?v=1701156656&width=1400'
                            }
                        />
                    </CardBody>
                    <CardFooter className="bg-[#ebeef0] container">
                        <div className="mx-auto">
                            <Title className="mb-1 sm:my-8">{title}</Title>
                            <Button className="block mx-auto mb-0 sm:mb-8 ">
                                Shop Now
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
    )
}

export default CollectionCard
