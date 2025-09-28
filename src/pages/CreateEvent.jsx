import React, { useEffect, useState } from 'react'
import AppLayout from '../Layouts/AppLayout'
import CreateEventForm from '../Component/CreateEventForm'
import Success from "../pages/Success"
import Loader from '../Component/Loader';

export default function CreateEvent() {
    const [showModal, setShowModal] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(()=> {
        const timer = setTimeout(()=> setPageLoading(false),1000);
        return () => clearTimeout(timer);
    },[]);

    if(pageLoading) return <Loader/>;

  return (
    <div>
      <AppLayout>
        <div className= "flex items-center px-5 py-2 lg:px-20">
            <div className='container mx-auto'>
                <h1 className='text-start text-2xl font-bold pb-5'>Create Event</h1>
                <CreateEventForm/>
            </div>
        </div>
      </AppLayout>
    </div>
  )
}
