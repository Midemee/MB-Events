import React, { useContext, useEffect} from 'react'
import AppLayout from '../Layouts/AppLayout'
import EventsCard from './EventsCard'
import InputSearch from './InputSearch'
import { EventContext } from "../Context/EventContext"
import Loader from './Loader'

export default function AllEvents() {
const { allEvents, loading, fetchAllEvents } = useContext(EventContext);
  console.log(allEvents);
   useEffect(() => {
    fetchAllEvents();
  }, []);
if (loading) return <Loader/>;

  return (
    <AppLayout>
      <InputSearch/>
        <div className='flex items-center py-5 px-5 lg:px-20'>
          <div className='container mx-auto'>
          <p className="text-lg font-semibold py-4 lg:py-0">
           {allEvents.length  ? "All Events" : "No events found"}
            </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event)=>{
            return <EventsCard key= {event.id || event._id} {...event}  />
            })}
        </div>
        </div>
        </div>
    </AppLayout>
  )
}
