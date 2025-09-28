import React from 'react'
import events from "../../data"
import EventsCard from "../Component/EventsCard"

export default function UpcomingEvents() {
  return (
    <div className="flex items-center py-5 px-5 lg:px-20">
      <div className="container mx-auto">
       <div className="flex justify-between">
         <p className="text-lg font-semibold my-4 lg:my-0 py-3">Upcoming Events</p>
         <button disabled className="text-lg">See All</button>
       </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 ">
            {events.slice(0,3).map((event)=>{
                return <EventsCard key={event.id} {...event } />
            })}
        </div>
      </div>
    </div>
  )
}
