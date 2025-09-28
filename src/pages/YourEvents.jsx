import React, { useState, useEffect } from 'react'
import EventsCard from '../Component/EventsCard'
import events from '../../data'
import AppLayout from '../Layouts/AppLayout'
import Loader from '../Component/Loader'
import Pagination from '../Component/Pagination'

export default function YourEvents() {
    const [pageLoading, setPageLoading] = useState(true);
  
      useEffect(() => {
      const timer = setTimeout(() => setPageLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);
     if (pageLoading) return <Loader/>;

  return (
    <AppLayout>
        <div className='flex items-center py-5 px-5 lg:px-20'>
        <div className='container mx-auto'>
        <div className=''>
        <h1 className='text-lg font-semibold py-3'>Your Events</h1>
        <div className='hidden lg:flex justify-between gap-2'>
        <button className='bg-black text-white w-[294px] h-[60px] px-6 py-2 rounded-sm'>Hosting</button>
        <button className='bg-black text-white  w-[294px] h-[60px] px-6 py-2 rounded-sm'>Attending</button>
        <button className='bg-black text-white  w-[294px] h-[60px] px-6 py-2 rounded-sm'>Previous</button>
        <button className='bg-black text-white  w-[294px] h-[60px] px-6 py-2 rounded-sm'>Saved</button>
      </div>
        </div>

        <div className=' flex flex-col lg:flex-row items-center justify-center gap-6 w-full'>
        {events.slice(0,3).map((event)=>{
        return <EventsCard key= {event.id} {...event} />
        })}
        </div>
        <Pagination/>
        </div>   
    </div>
    </AppLayout>
  )
}
