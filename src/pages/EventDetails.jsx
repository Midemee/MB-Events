import React from 'react'
import AppLayout from '../Layouts/AppLayout'
import EventProperties from '../Component/SingleEvents/EventProperties'
import events from "../../data"
import EventsCard from '../Component/EventsCard'
import { useParams } from 'react-router'


export default function EventDetails() {
    const {eventId} = useParams()
    const event = events.find((e) => e.id === Number(eventId))
    

  return (
    <div>
      <AppLayout>
        {event ? <EventProperties {...event} /> : <p>Event Not Found</p>}
        <div className='p-6 space-y-4 container mx-auto'>
          <div className='flex justify-between '>
            <p className=' font-semibold text-xl'>Other Events you might like</p>
            <p className='text-md'>See All</p>
          </div>
                  <div className=' flex flex-col lg:flex-row items-center justify-center gap-6 w-full'>
                      {events.slice(0,3).map((event)=>{
                          return <EventsCard key= {event.id} {...event}  />
                      })}
                  </div>

        </div>

      </AppLayout>
    </div>
  )
}
