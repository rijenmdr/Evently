import { createOrder } from '@/lib/actions/order.actions';
import { NextResponse } from 'next/server';
import stripe from 'stripe'

export async function POST(req: Request) {
    const body = await req.text();

    const sig = req.headers.get('stripe-signature') as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        return NextResponse.json({ message: 'Webhook error', error: err })
    }

    const eventType = event?.type;

    if (eventType === "checkout.session.completed") {
        const { id, amount_total, metadata } = event?.data?.object;

        const order = {
            stripeId: id,
            totalAmount:  amount_total ? (amount_total / 100).toString() : '0',
            event: metadata?.eventId || '',
            buyer: metadata?.buyerId || '',
        }

        const newOrder = await createOrder(order);
        return NextResponse.json({ message: 'OK', order: newOrder })
    }
    return new Response('', { status: 200 })
}