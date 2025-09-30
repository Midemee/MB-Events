// import React from 'react'
// import { FaLocationDot } from "react-icons/fa6";
// import { SlCalender } from "react-icons/sl";
// import { HiTicket } from "react-icons/hi2";



// export default function EventsCard(
//     {id, image, eventName,host,category,location,date,pricing}

// ) {
//   return (
//     <div className='flex flex-col gap-[8px]' >
//         <img src={image} alt="" className="rounded-lg " /> 
//         <p className='font-semibold text-md'>{eventName}</p>
//         <p className='text-xs'>Host: {host}</p>
//         <p className='text-xs'>Category: {category}</p>
//         <div className='flex gap-2 text-xs '><span><FaLocationDot /></span>{location}</div>
//         <div className='flex gap-2 text-xs'><span><SlCalender /></span>{date}</div>
//         <div className='flex gap-2 text-xs '><span><HiTicket /></span>{pricing}</div>
//     </div>
//   )
// }


import React from 'react'
import { FaLocationDot } from "react-icons/fa6"
import { FaCalendarAlt } from "react-icons/fa"
import { HiTicket } from "react-icons/hi2"
import { Link } from "react-router-dom"
import moment from "moment"
// import events from '../../data'


export default function EventsCard({
  _id,
  photo,
  host,
  title,
  category,
  location,
  date,
  free,
  regular,
  vip
}) {
  const id = _id;
  const image = photo;

  const displayedCategory = category;

  const vipCount = Number(vip) || 0;
  const regularCount = Number(regular) || 0;

  return (
    <Link
      to={`/events/${id}`}
      className="text-gray-900 mx-auto lg:mx-0 my-4 w-full"
    >
      <div className="mx-auto w-full">
        <img
          src={image}
          alt={title}
          className="rounded-md w-full"
          loading="lazy"
        />
        <div className="mt-2 capitalize">
          <h3 className="text-lg my-auto font-semibold">
            {title}
          </h3>
          <p className="text-lg">
            <span className="font-semibold">Host: {host}</span>
          </p>
          <p className="mb-0">
            <span className="font-semibold text-lg mt-3 capitalize">
              Category:
            </span>
            {displayedCategory}
          </p>
          <div className="flex items-center text-lg gap-2">
            <FaLocationDot /> <span>{location}</span>
          </div>
          <div className="flex items-center text-lg gap-2">
           <FaCalendarAlt /> <span>{moment(date).format("MMM Do YYYY")}</span>
          </div>
          {free ? (
            <div className="text-lg flex items-center gap-2">
              <HiTicket /><span>Free</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center text-lg font-semibold">
              <HiTicket />
              <span>
                {vipCount > 0 && "VIP"}
                {vipCount > 0 && regularCount > 0 && ","}
                {regularCount > 0 && "Regular"}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

