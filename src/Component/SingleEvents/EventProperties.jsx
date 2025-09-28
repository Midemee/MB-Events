import React from 'react'
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { FaCalendarAlt } from "react-icons/fa"
import PaymentCard from './PaymentCard'

export default function EventProperties({id, image, title, location, date, tags, price, description, startTime }) {
  return (
    <div className='container mx-auto px-5 '>
      <img className='w-full object-fit rounded-xs h-[345px]' src={image} alt='' /> 
      <div className='flex flex-col lg:flex-row mt-5 mb-3 justify-between'>
        <div>
            <div className='flex text-2xl lg:text-5xl py-2 lg:py-5 gap-2 items-center'><FaCalendarAlt />{date} {startTime}</div>
            <div className='flex py-2 lg:py-5 text-2xl lg:text-5xl gap-2 items-center'><FaLocationDot />{location}</div>

            <div className='flex py-3 gap-2 items-center'>
            {tags.map((tag, index)=>{
                return (
                    <p className='text-gray-600 border-1 py-1 px-2 rounded-md' key={index}>{tag}</p>
                )
            })}
             </div>
             <h1 className='font-semibold text-xl lg:text-7xl'>{title}</h1>
             <p>{description}</p>
        </div>

        <div>
            <PaymentCard event = {{id, image, title, location, date, tags, price, description, startTime}}/>
        </div>
      </div>
    </div>
  )
}
