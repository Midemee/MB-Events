// import React, { useState, useEffect } from 'react'
// import EventsCard from '../Component/EventsCard'
// import events from '../../data'
// import AppLayout from '../Layouts/AppLayout'
// import Loader from '../Component/Loader'
// import Pagination from '../Component/Pagination'

// export default function YourEvents() {
//     const [pageLoading, setPageLoading] = useState(true);
  
//       useEffect(() => {
//       const timer = setTimeout(() => setPageLoading(false), 1000);
//       return () => clearTimeout(timer);
//     }, []);
//      if (pageLoading) return <Loader/>;

//   return (
//     <AppLayout>
//         <div className='flex items-center py-5 px-5 lg:px-20'>
//         <div className='container mx-auto'>
//         <div className=''>
//         <h1 className='text-lg font-semibold py-3'>Your Events</h1>
//         <div className='hidden lg:flex justify-between gap-2'>
//         <button className='bg-black text-white w-[294px] h-[60px] px-6 py-2 rounded-sm'>Hosting</button>
//         <button className='bg-black text-white  w-[294px] h-[60px] px-6 py-2 rounded-sm'>Attending</button>
//         <button className='bg-black text-white  w-[294px] h-[60px] px-6 py-2 rounded-sm'>Previous</button>
//         <button className='bg-black text-white  w-[294px] h-[60px] px-6 py-2 rounded-sm'>Saved</button>
//       </div>
//         </div>

//         <div className=' flex flex-col lg:flex-row items-center justify-center gap-6 w-full'>
//         {events.slice(0,3).map((event)=>{
//         return <EventsCard key= {event.id} {...event} />
//         })}
//         </div>
//         <Pagination/>
//         </div>   
//     </div>
//     </AppLayout>
//   )
// }


import React, { useState, useEffect, useContext } from "react";
import AppLayout from '../Layouts/AppLayout';
import {EventContext} from "../Context/EventContext";
import EventsCard from '../Component/EventsCard'

export default function YourEventsPage() {
  const { fetchUsersEvents, userEvents, loadingUserEvents, error,user,token } = useContext(EventContext);
  const [activeBtn, setActiveBtn] = useState(1);

  const btns = [
    { id: 1, content: "Hosting", type: "hosting" },
    { id: 2, content: "Attending", type: "attending" },
    { id: 3, content: "Previous", type: "previous" },
  ];

  const activeType = btns.find((b) => b.id === activeBtn).type;
  const currentEvents = userEvents[activeType] || [];
  console.log(currentEvents);
  
  useEffect(() => {
  if (user && token) {
    fetchUsersEvents(activeType, user._id);
  }
}, [activeType, user, token]);



  return (
    <AppLayout>
      <div className="flex-row items-center py-5 px-5 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-start text-2xl font-bold pb-5">Your Events</h1>

          <div className="flex gap-4 rounded-md my-3 mx-auto">
            {btns.map((btn) => {
              const isActive = btn.id === activeBtn;
              const btnClass = isActive
                ? "h-[40px] lg:h-[60px] lg:w-1/3 bg-black text-white text-lg font-semibold px-4 py-2 rounded-md flex items-center"
                : "h-[40px] lg:h-[60px] lg:w-1/3 text-black text-lg font-semibold border-2 border-black px-4 py-2 rounded-md flex items-center";
              return (
                <button
                  onClick={() => setActiveBtn(btn.id)}
                  className={btnClass}
                  key={btn.id}
                >
                  {btn.content}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {loadingUserEvents ? (
  <p>Loading...</p>
) : error ? (
  <p className="text-red-500">{error}</p>
) : currentEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEvents.map((event) => (
                  <EventsCard key={event._id} {...event} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events found</p>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
