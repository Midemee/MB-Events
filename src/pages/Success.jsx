// import React from 'react'
// import image from "../assets/Images/check-check.png"

// export default function Success() {
//   return (
//     <div className='p-6 space-y-4  w-[606px] h-[560px] container mx-auto rounded-sm'>
//       <div className='flex flex-col items-center justify-center'>
//         <img src={image} />
//         <h1 className='text-3xl font-semibold mb-2'>Awesome!!!</h1>
//         <p className='font-medium text-sm'>Your event has been created</p>
//       </div>
//       <div className='bg-black h-[172px] flex flex-col items-center justify-center '> 
//         <button className='bg-purple-600 hover:bg-purple-700 w-[276px] h-[50px] text-white px-6 py-2 rounded-sm'>Back to Home</button>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { Link } from "react-router";
import image from "../assets/Images/check-check.png"

export default function Success({showModal, setShowModal}) {
      if (!showModal) return null;

  return (
    <>
       <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md text-center p-6 relative animate-fadeIn">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <img src={image} alt="Success" className="mx-auto w-16 h-16" />
        <h2 className="text-2xl font-bold mt-4">Awesome</h2>
        <p className="text-gray-600 mt-2">Your event has been created</p>
        <div className="mt-6">
          <Link to="/" onClick={() => setShowModal(false)}>
         <button className='bg-purple-600 hover:bg-purple-700 w-[276px] h-[50px] text-white px-6 py-2 rounded-sm'>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
</>
  )
}
