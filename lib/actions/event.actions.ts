"use server"

import { CreateEventParams, DeleteEventParams, GetAllEventParams, GetEventsByCategoryParams, UpdateEventParams } from "@/types/event";
import { connectToDatabase } from "../database";
import Event, { IEvent } from "../database/models/event.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Category from "../database/models/category.model";

export const getAllEvents = async ({ query, limit = 6, page, category, userId }: GetAllEventParams) => {
    try {
        await connectToDatabase();
        let condition = {}

        if (query) condition = { title: { $regex: query, $options: 'i' } }
        if (category) condition = { ...condition, category }
        if (userId) condition = {...condition, organizer: userId}

        const skip = (Number(page) - 1) * limit

        const events = await Event.find(condition)
            .sort({ createdAt: 'desc' })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "organizer", model: User, select: "_id firstName lastName"
            })
            .populate({
                path: "category", model: Category, select: "_id name"
            });

        const eventsCount = await Event.countDocuments(condition);

        return {
            data: JSON.parse(JSON.stringify(events)),
            eventsCount,
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
}

export const getRelatedEventsByCategory = async ({ categoryId, eventId, limit = 3, page }: GetEventsByCategoryParams) => {
    try {
        await connectToDatabase();

        const skip = (Number(page) - 1) * limit
        const condition = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

        const events = await Event.find(condition)
            .sort({ createdAt: 'desc' })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "organizer", model: User, select: "_id firstName lastName"
            })
            .populate({
                path: "category", model: Category, select: "_id name"
            });

        const eventsCount = await Event.countDocuments(condition);

        return {
            data: JSON.parse(JSON.stringify(events)),
            eventsCount,
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
}

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await Event.findById({ _id: eventId })
            .populate({
                path: "organizer", model: User, select: "_id firstName lastName"
            })
            .populate({
                path: "category", model: Category, select: "_id name"
            });
        if (!event) throw new Error('Event not found')

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
}

export const createEvent = async ({ userId, event, path }: CreateEventParams) => {
    try {
        await connectToDatabase();

        const organizer = await User.findById(userId);
        if (!organizer) throw new Error('Organizer not found')

        const newEvent = await Event.create({ ...event, category: event?.categoryId, organizer: userId });
        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error);
    }
}

export const updateEvent = async ({ userId, event, path }: UpdateEventParams) => {
    try {
        await connectToDatabase();

        const eventToUpdate = await Event.findById(event?._id);
        if (!eventToUpdate || eventToUpdate?.organizer?.toHexString() !== userId) {
            throw new Error("Unauthorized or event not found")
        }

        const updateEvent = await Event.findByIdAndUpdate(
            event?._id,
            { ...event, category: event?.categoryId },
            { new: true }
        );
        revalidatePath(path)

        return JSON.parse(JSON.stringify(updateEvent));
    } catch (error) {
        // console.log(error)
        handleError(error);
    }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
    try {
        await connectToDatabase();

        const deleteEvent = await Event.findByIdAndDelete({ _id: eventId });

        if (deleteEvent) revalidatePath(path)
    } catch (error) {
        handleError(error)
    }
}