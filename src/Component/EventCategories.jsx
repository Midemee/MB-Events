import React from 'react';
import image1 from '../assets/Images/Frame 1171276721.png';
import image2 from '../assets/Images/Frame 1171276722.png';
import image3 from '../assets/Images/Frame 1171276723.png';
import { Link } from "react-router";

// export default function EventCategories() {
//   return (
//     <div className="flex items-center py-5 px-5 lg:px-20 ">
//       <div className="container mx-auto">
//        <div className="flex justify-between items-center">
//          <p className="text-lg font-semibold py-3">Events Categories</p>
//          <button disabled className="text-lg">See All</button>
//        </div>
//         <div className="flex relative justify-between flex-wrap gap-5 lg:flex-nowrap my-4">
//         <img className='w-[355px] h-auto object-cover rounded-md ' src={image1} alt='image'/>
//         <img className='w-[355px] h-auto object-cover rounded-md' src={image2} alt='image'/>
//         <img className='w-[355px] h-auto object-cover rounded-md' src={image3} alt='image'/>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function EventCategories() {
  const categories = [
    { id: 1, img: image1},
    { id: 2, img: image2},
    { id: 3, img: image3},
  ];

  return (
    <div className="flex items-center px-5 lg:px-20">
      <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold py-3">Events Categories</p>
        <button disabled className="text-lg">See All</button>
      </div>

      <div className="flex flex-wrap gap-5 lg:flex-nowrap my-4">
        {categories.map((one) => (
          <div className="relative w-full transition-shadow hover:shadow-lg" key={one.id}>
            <img
              src={one.img}
              alt='events'
              className="w-full h-auto object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-80 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

