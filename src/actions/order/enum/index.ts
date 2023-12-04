export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export enum OrderActionType {
    createOrder = 'createOrder',
    listOrders = 'listOrders',
}
