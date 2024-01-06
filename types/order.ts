export type CheckoutOrderParams = {
    eventId: string,
    eventTitle: string,
    isFree: boolean,
    price: string,
    buyerId: string
}

export type CreateOrderParams = {
    stripeId: string,
    totalAmount: string,
    event: string,
    buyer: string,
}