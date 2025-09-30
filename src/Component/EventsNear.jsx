// import React from 'react'
// import events from '../../data'
// import EventsCard from "../Component/EventsCard"

// export default function EventsNear() {
//     const getRandomEvents = (arr, count) => {
//     const shuffled = [...arr].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   const randomEvents = getRandomEvents(events, 3);
//   return (
//     <div className="flex items-center py-5 px-5 lg:px-20">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center">
//           <p className="text-lg font-semibold py-3">Events Near You</p>
//           <button disabled className="text-lg">
//             See All
//           </button>
//         </div>
//         <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-5">
//             {randomEvents.map((event)=>{
//             return <EventsCard key= {event.id} {...event} />
//             })}
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useEffect, useState, useContext } from "react";
import { EventContext } from "../Context/EventContext.jsx";
import EventsCard from "../Component/EventsCard"

export default function EventsNear() {
  const { fetchNearbyEvents, nearbyEvents } = useContext(EventContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchNearbyEvents(latitude, longitude, 25);
        },
        () => setError("Permission denied. Cannot fetch nearby events.")
      );
    } else {
      setError("Geolocation not supported");
    }
  }, [fetchNearbyEvents]);

  return (
    <div className="flex items-center py-5 px-5 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold py-3">Events Near You</p>
          <button disabled className="text-lg">
            See All</button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-5">
          {nearbyEvents?.length > 0 ? (
            nearbyEvents.slice(0, 3).map((event) => (
              <EventsCard key={event._id} {...event} />
            ))
          ) : (
            <p className="text-gray-400">No events nearby</p>
          )}
        </div>

      </div>
    </div>
  )
}

// import React, { useEffect, useState, useContext } from "react";
// import EventsCard from "../EventsCard.jsx";
// import { EventContext } from "../../Context/EventContext";

// export default function EventsNearYou() {
//   const { fetchNearbyEvents, nearbyEvents } = useContext(EventContext);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           fetchNearbyEvents(latitude, longitude, 25);
//         },
//         () => setError("Permission denied. Cannot fetch nearby events.")
//       );
//     } else {
//       setError("Geolocation not supported");
//     }
//   }, [fetchNearbyEvents]);

//   return (
//     <div className="flex items-center py-5 px-5 lg:px-20">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center">
//           <p className="text-[30px] font-semibold">Events Near You</p>
//           <button className="text-lg text-blue-500">See All</button>
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-5">
//           {nearbyEvents?.length > 0 ? (
//             nearbyEvents.slice(0, 3).map((event) => (
//               <EventsCard key={event._id} {...event} />
//             ))
//           ) : (
//             <p className="text-gray-400">No events nearby</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

