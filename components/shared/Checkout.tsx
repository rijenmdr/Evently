'use client'
import { loadStripe } from '@stripe/stripe-js'

import { EventType } from '@/types/event'
import { Button } from '../ui/button'
import { useEffect } from 'react'
import { checkoutOrder } from '@/lib/actions/order.actions'

type Props = {
    event: EventType,
    userId: string
}

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: Props) => {

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        const order = {
            eventId: event?._id,
            eventTitle: event?.title,
            price: event?.price,
            isFree: event?.isFree,
            buyerId: userId
        }

        await checkoutOrder(order)
    }

    return (
        <form action={onCheckout} method='post'>
            <Button className="button sm:w-fit" type='submit' role='link' size="lg">
                {event?.isFree ? 'Get Ticket' : 'Buy Ticket'}
            </Button>
        </form>
    )
}

export default Checkout