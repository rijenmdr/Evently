import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs"
import Link from "next/link";

export default async function MyProfile() {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    const createdEvents = await getAllEvents({
        page: 1,
        userId
    })
    return (
        <>
            <section className="bg-dotted-pattern bg-cover bg-center bg-primary-50 py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>

                    <Button asChild size="lg" className="button hidden sm:flex">
                        <Link href={"/#explore"}>
                            Explore More Events
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <Collection
                    data={[]}
                    emptyTitle="No event tickets purchased yet."
                    emptySubTitle="No worries - there are plenty of exciting events to choose from."
                    totalData={0}
                    collectionType="My_Tickets"

                />
            </section>

            <section className="bg-dotted-pattern bg-cover bg-center bg-primary-50 py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>

                    <Button asChild size="lg" className="button hidden sm:flex">
                        <Link href={"/events/create"}>
                            Create New Event
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <Collection
                    data={createdEvents?.data}
                    emptyTitle="No events created yet."
                    emptySubTitle="Go ahead and create some events."
                    totalData={createdEvents?.eventsCount || 0}
                    collectionType="Events_Organized"
                />
            </section>
        </>
    )
}
