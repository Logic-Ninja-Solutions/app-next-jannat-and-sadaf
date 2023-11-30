import Size from './product.size'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
})

export const formatPrice = (price: number) => {
    return formatter.format(price)
}

export default interface Product {
    id: number
    title: string
    price: number
    description: string
    slug: string
    code: string
    isAvailable: boolean
    images: string[]
    sizes: Size[]
}

export const hardCodedProducts: Product[] = [
    {
        id: 1,
        title: 'NIMR KURTI W/ DUPATTA',
        price: 12000,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-1',
        code: 'BD-7833',
        isAvailable: true,
        images: [
            'https://www.mishalakhani.com/cdn/shop/files/10-B_21824d2f-46e5-48ee-934a-c9c261517e0f.jpg?v=1683652977&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-C_968594e3-31d9-4fdf-8e3f-1b2c77ae1755.jpg?v=1683647643&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-D_842b2a95-b8e1-4c86-a002-0e658b056a15.jpg?v=1683647644&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-E_b487621c-7956-4292-bf24-b1d4fe6a38ab.jpg?v=1683647644&width=1400',
        ],
        sizes: [
            {
                name: 'XS',
                quantity: 3,
            },
            {
                name: 'S',
                quantity: 1,
            },
            {
                name: 'M',
                quantity: 0,
            },
            {
                name: 'L',
                quantity: 4,
            },
            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
    {
        id: 2,
        title: 'Testing product 2',
        price: 18200,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-2',
        code: 'BD-7133',
        isAvailable: true,
        images: [
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4824_6d1e4621-958b-47b9-a5a2-b15f8b8b5eb0.jpg?v=1696848913',
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4818_f3cb4c58-5ea8-4c60-9765-a6d4e689263c_1024x1024.jpg?v=1696848913',
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4838_078d407f-dfee-416d-bcf5-1be70ee7c772.jpg?v=1696848913',
        ],
        sizes: [
            {
                name: 'XS',
                quantity: 3,
            },
            {
                name: 'S',
                quantity: 1,
            },

            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
    {
        id: 3,
        title: 'Testing product 3',
        price: 7000,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-3',
        code: 'BD-7123',
        isAvailable: true,
        images: [
            'https://www.mishalakhani.com/cdn/shop/files/4-A_536b64c8-a984-42f0-80d3-3d109563f18d.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-B_e27cae96-b802-4c64-902e-d220ec2a66d8.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-C_5ad7e83a-e805-4260-a2d0-9001079894b4.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-D_b55fe397-446a-4f5c-94f2-e24b9084570f.jpg?v=1701156656&width=1400',
        ],
        sizes: [
            {
                name: 'M',
                quantity: 0,
            },
            {
                name: 'L',
                quantity: 4,
            },
        ],
    },
    // ----------

    {
        id: 4,
        title: 'NIMR KURTI W/ DUPATTA',
        price: 12000,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-4',
        code: 'BD-7833',
        isAvailable: true,
        images: [
            'https://www.mishalakhani.com/cdn/shop/files/10-B_21824d2f-46e5-48ee-934a-c9c261517e0f.jpg?v=1683652977&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-C_968594e3-31d9-4fdf-8e3f-1b2c77ae1755.jpg?v=1683647643&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-D_842b2a95-b8e1-4c86-a002-0e658b056a15.jpg?v=1683647644&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-E_b487621c-7956-4292-bf24-b1d4fe6a38ab.jpg?v=1683647644&width=1400',
        ],
        sizes: [
            {
                name: 'XS',
                quantity: 3,
            },
            {
                name: 'S',
                quantity: 1,
            },
            {
                name: 'M',
                quantity: 0,
            },
            {
                name: 'L',
                quantity: 4,
            },
            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
    {
        id: 5,
        title: 'Testing product 2',
        price: 18200,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-5',
        code: 'BD-7133',
        isAvailable: true,
        images: [
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4824_6d1e4621-958b-47b9-a5a2-b15f8b8b5eb0.jpg?v=1696848913',
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4818_f3cb4c58-5ea8-4c60-9765-a6d4e689263c_1024x1024.jpg?v=1696848913',
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4838_078d407f-dfee-416d-bcf5-1be70ee7c772.jpg?v=1696848913',
        ],
        sizes: [
            {
                name: 'XS',
                quantity: 3,
            },
            {
                name: 'S',
                quantity: 1,
            },
            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
    {
        id: 6,
        title: 'Testing product 3',
        price: 7000,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-6',
        code: 'BD-7123',
        isAvailable: true,
        images: [
            'https://www.mishalakhani.com/cdn/shop/files/4-A_536b64c8-a984-42f0-80d3-3d109563f18d.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-B_e27cae96-b802-4c64-902e-d220ec2a66d8.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-C_5ad7e83a-e805-4260-a2d0-9001079894b4.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-D_b55fe397-446a-4f5c-94f2-e24b9084570f.jpg?v=1701156656&width=1400',
        ],
        sizes: [
            {
                name: 'M',
                quantity: 0,
            },
            {
                name: 'L',
                quantity: 4,
            },
            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
    // ----------
    {
        id: 7,
        title: 'NIMR KURTI W/ DUPATTA',
        price: 12000,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-7',
        code: 'BD-7833',
        isAvailable: true,
        images: [
            'https://www.mishalakhani.com/cdn/shop/files/10-B_21824d2f-46e5-48ee-934a-c9c261517e0f.jpg?v=1683652977&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-C_968594e3-31d9-4fdf-8e3f-1b2c77ae1755.jpg?v=1683647643&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-D_842b2a95-b8e1-4c86-a002-0e658b056a15.jpg?v=1683647644&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/10-E_b487621c-7956-4292-bf24-b1d4fe6a38ab.jpg?v=1683647644&width=1400',
        ],
        sizes: [
            {
                name: 'XS',
                quantity: 3,
            },
            {
                name: 'S',
                quantity: 1,
            },
            {
                name: 'M',
                quantity: 0,
            },
            {
                name: 'L',
                quantity: 4,
            },
            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
    {
        id: 8,
        title: 'Testing product 2',
        price: 18200,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-8',
        code: 'BD-7133',
        isAvailable: true,
        images: [
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4824_6d1e4621-958b-47b9-a5a2-b15f8b8b5eb0.jpg?v=1696848913',
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4818_f3cb4c58-5ea8-4c60-9765-a6d4e689263c_1024x1024.jpg?v=1696848913',
            'https://pk.saniamaskatiya.com/cdn/shop/files/051A4838_078d407f-dfee-416d-bcf5-1be70ee7c772.jpg?v=1696848913',
        ],
        sizes: [
            {
                name: 'XS',
                quantity: 3,
            },
            {
                name: 'S',
                quantity: 1,
            },
            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
    {
        id: 9,
        title: 'Testing product 3',
        price: 7000,
        description:
            '<p>This Nimr is crafted from jamawar and embroidered using age-old craftsmanship, combining resham, and zardozi work. Paired with a crafted izaar, and a contrasting gossamer organza dupatta, as shown here: </br></br> </p><ul><li>Crimson jamawar</li><li>Rose bud organza</li><li>Dry clean only</li></ul></br> <p>Lead time: 10 to 12 weeks from the time of purchase. A measurement form will be sent upon order.</p>',
        slug: 'cloth-9',
        code: 'BD-7123',
        isAvailable: true,
        images: [
            'https://www.mishalakhani.com/cdn/shop/files/4-A_536b64c8-a984-42f0-80d3-3d109563f18d.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-B_e27cae96-b802-4c64-902e-d220ec2a66d8.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-C_5ad7e83a-e805-4260-a2d0-9001079894b4.jpg?v=1701156656&width=1400',
            'https://www.mishalakhani.com/cdn/shop/files/4-D_b55fe397-446a-4f5c-94f2-e24b9084570f.jpg?v=1701156656&width=1400',
        ],
        sizes: [
            {
                name: 'M',
                quantity: 0,
            },
            {
                name: 'L',
                quantity: 4,
            },
            {
                name: 'Custom',
                quantity: 5,
            },
        ],
    },
]
