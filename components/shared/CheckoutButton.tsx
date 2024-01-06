import { EventType } from '@/types/event'
import { SignedIn, SignedOut, auth } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

type Props = {
    event: EventType
}

const CheckoutButton = ({ event }: Props) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const hasEventFinished = new Date(event?.endDateTime) < new Date();
    return (
        <div className='flex items-center gap-3'>
            {
                hasEventFinished ?
                    <p className='p-2 text-red-400'>
                        Sorry, tickets are no longer available.
                    </p> :
                    <>
                        <SignedOut>
                            <Button asChild className='button rounded-full' size="lg">
                                <Link href="/login">
                                    Get Ticket
                                </Link>
                            </Button>
                        </SignedOut>

                        <SignedIn>
                            <Checkout event={event} userId={userId} />
                        </SignedIn>
                    </>
            }
        </div>
    )
}

export default CheckoutButton