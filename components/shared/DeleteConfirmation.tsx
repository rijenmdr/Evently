'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteEvent } from "@/lib/actions/event.actions"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTransition } from "react"

type Props = {
    eventId: string
}

const DeleteConfirmation = ({ eventId }: Props) => {
    const pathname = usePathname();
    const [isPending, startTransaction] = useTransition();

    return (
        <AlertDialog>
            <AlertDialogTrigger className="cursor-pointer" asChild>
                <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="p-regular-16 text-grey-600">
                        This will permanently delete this event
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        startTransaction(async () => {
                            await deleteEvent({ eventId, path: pathname })
                        })
                    }}>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteConfirmation