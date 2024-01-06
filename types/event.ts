import { ICategory } from "@/lib/database/models/category.model";
import { IUser } from "@/lib/database/models/user.model";

export type EventType = {
    _id: string
    title: string
    description: string
    location: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    category: ICategory
    price: string
    isFree: boolean
    url: string
    organizer: IUser
}

type CreateEventType = Omit<EventType, "category" | "organizer" | "_id"> & { categoryId: string }

export type CreateEventParams = {
    userId: string,
    event: CreateEventType,
    path: string
}

type UpdateEventType = Omit<EventType, "category" | "organizer"> & { categoryId: string }

export type UpdateEventParams = {
    userId: string,
    event: UpdateEventType,
    path: string
}

export type GetAllEventParams = {
    query?: string, 
    limit?: number,
    page: number | string, 
    category?: string,
    userId?: string
}


export type GetEventsByCategoryParams = {
    categoryId: string, 
    limit?: number,
    page: string, 
    eventId: string
}

export type DeleteEventParams = {
    eventId: string,
    path: string
}

export type UpdateEventProps = {
    params: {
        id: string;
    }
}