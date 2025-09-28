import React, { useState , useEffect} from 'react'
import AppLayout from '../Layouts/AppLayout'
import events from '../../data'
import EventsCard from './EventsCard'
import InputSearch from './InputSearch'
import Loader from './Loader'

export default function AllEvents() {
    const [pageLoading, setPageLoading] = useState(true);
      useEffect(() => {
      const timer = setTimeout(() => setPageLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []); 
  
     if (pageLoading) return <Loader/>;

  return (
    <AppLayout>
      <InputSearch/>
        <div className='flex items-center py-5 px-5 lg:px-20'>
          <div className='container mx-auto'>
          <p className="text-lg font-semibold py-4 lg:py-0">All Events</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event)=>{
            return <EventsCard key= {event.id} {...event}  />
            })}
        </div>
        </div>
        </div>
    </AppLayout>
  )
}
