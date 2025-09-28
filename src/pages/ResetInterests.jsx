import {React, useState} from 'react'
import AuthLayout from '../Layouts/AuthLayout'
import image from "../assets/Images/Frame 1171276802 (1).png"
import { Link, useNavigate } from 'react-router-dom';

export default function ResetInterests() {
    const interests = ["Professional", "Sports", "Party", "Concerts", "Education", "Religion", "Games", "Dance", "Cultural Activities", "Professional", "Career", "Picknic", "Excursions", "Food & Drinks", "Expositions", "Beach", "Night", "Costume", "Anime" ]

    
  const [selected, setSelected] = useState([]);

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
        <div className=' min-h-screen flex items-center justify-center px-5 lg:px-20 '>
        <div className='p-5 max-w-[560px] w-full'>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Interests</h1>
            <p className="">To enhance your feed and tailor it to your preferences, select at least <span className="text-purple-600 font-semibold">5</span> areas of interest that resonate with you.
            </p>
               
        <div className='flex flex-wrap gap-3 '>

            {interests.map((interest, index)=>{
                    return <div key= {index}>
                    <button onClick={()=> toggleInterest(interest)}
                    className={`px-3 py-2 rounded-md border font-semibold transition-colors duration-200 ${
                selected.includes(interest)
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
           >
                {interest}</button>
                    </div>
                })}
        </div>
        <Link to="/resetpassword">
        <button  class="mt-10 bg-purple-600 text-white py-1 px-12 rounded-sm font-semibold text-lg">Continue</button>
        </Link>
       </div>
        </div>
  )
}
