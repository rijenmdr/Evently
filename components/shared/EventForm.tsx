"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import DatePicker from 'react-datepicker'

import { eventFormSchema } from "@/lib/validators"
import { eventDefaultValues } from "@/constant"
import Dropdown from './Dropdown'
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader"

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"

type Props = {
    userId: string,
    type: "Create" | "Update",
    event?: IEvent,
    eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: Props) => {
    const [files, setFiles] = useState<File[]>([]);

    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: type === "Update" && event ? 
        {
            ...event,
            categoryId: event?.category?._id,
            startDateTime: new Date(event.startDateTime), 
            endDateTime: new Date(event.endDateTime) 
        } : 
        eventDefaultValues,
    });

    const handleCheckboxChange = () => {
        form.setValue("price", "")
    }

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files?.length) {
            const uploadedImages = await startUpload(files);

            if (!uploadedImages) return;

            uploadedImageUrl = uploadedImages[0].url;
        }

        if (type === "Create") {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: "/profile"
                });

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent?._id}`)
                }
            } catch (error) {
                toast(typeof error === "string" ? error : "Error while creating event")
            }
        }

        if(type === "Update") {
            try {
                const updatedEvent = await updateEvent({
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId! },
                    userId,
                    path: `/events/${eventId}`
                });

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent?._id}`)
                }
            } catch (error) {
                toast(typeof error === "string" ? error : "Error while creating event")
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="input-field" placeholder="Event Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown value={field?.value} onChangeHandler={field?.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea className="textarea rounded-2xl" placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        imageUrl={field?.value}
                                        onFieldChange={field.onChange}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center px-4 py-4 bg-grey-50 rounded-full h-[54px] w-full overflow-hidden">
                                        <Image
                                            src="/assets/icons/location-grey.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                        />

                                        <Input className="input-field" placeholder="Event location or Online" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center px-4 py-4 bg-grey-50 rounded-full h-[54px] w-full overflow-hidden">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="price"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center px-4 py-4 bg-grey-50 rounded-full h-[54px] w-full overflow-hidden">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="price"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center px-4 py-4 bg-grey-50 rounded-full h-[54px] w-full overflow-hidden">
                                        <Image
                                            src="/assets/icons/dollar.svg"
                                            alt="price"
                                            width={24}
                                            height={24}
                                        />

                                        <Input
                                            type="number"
                                            min={0}
                                            className="input-field"
                                            placeholder="Price" {...field}
                                            disabled={form.getValues("isFree")}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                                            <Checkbox
                                                                onCheckedChange={(e) => {
                                                                    field.onChange(e);
                                                                    handleCheckboxChange()
                                                                }}
                                                                checked={field.value}
                                                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center px-4 py-4 bg-grey-50 rounded-full h-[54px] w-full overflow-hidden">
                                        <Image
                                            src="/assets/icons/link.svg"
                                            alt="link"
                                            width={24}
                                            height={24}
                                        />

                                        <Input className="input-field" placeholder="URL" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    type="submit"
                >
                    {
                        form.formState.isSubmitting ?
                            'Submitting...' :
                            `${type} Event`
                    }
                </Button>
            </form>
        </Form>
    )
}

export default EventForm