import { auth } from "@clerk/nextjs"
import EventForm from "@/components/shared/EventForm";
import { UpdateEventProps } from "@/types/event";
import { getEventById } from "@/lib/actions/event.actions";

export default async function UpdateEvent({ params: { id } }: UpdateEventProps) {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;
    const event = await getEventById(id);

    return (
        <>
            <section className="bg-dotted-pattern bg-cover bg-center bg-primary-50 py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
            </section>

            <section className="wrapper my-8">
                <EventForm
                    userId={userId}
                    type="Update"
                    event={event}
                    eventId={id}
                />
            </section>
        </>
    )
}
