const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
})

export const formatPrice = (price: number) => {
    return formatter.format(price)
}
