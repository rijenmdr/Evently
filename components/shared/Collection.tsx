import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'

type Props = {
    data: IEvent[],
    totalData: number,
    emptyTitle: string,
    emptySubTitle: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
    // page: number | string,
    // urlParamName?:string
}

const Collection = ({
    data,
    totalData,
    emptyTitle,
    emptySubTitle,
    collectionType,
    // page,
    // urlParamName
}: Props) => {
    return (
        <>
            {
                totalData > 0 ?
                    <div className='flex flex-col items-center gap-10'>
                        <ul className='grid grid-cols-1 gap-5 w-full lg:grid-cols-3'>
                            {
                                !!data?.length &&
                                data?.map(event => {
                                    const hasOrderLink = collectionType === "Events_Organized";
                                    const hidePrice = collectionType === "My_Tickets";
                                    return (
                                        <li key={event?._id} className='flex justify-center'>
                                            <Card
                                                event={event}
                                                hasOrderLink={hasOrderLink}
                                                hidePrice={hidePrice}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div> :
                    <div className='bg-grey-50 py-28 text-center w-full min-h-[200px] wrapper flex-center flex-col gap-3 rounded-[14px]'>
                        <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
                        <p className="p-regular-14">{emptySubTitle}</p>
                    </div>
            }
        </>
    )
}

export default Collection