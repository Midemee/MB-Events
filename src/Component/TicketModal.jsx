import React, {usestate} from 'react'
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import {useState, useEffect} from "react"

export default function TicketModal({showModal, setShowModal, event}) {
  const {price = {}} = event || {};
  const {free = false, vip=0, regular=0 } = price;
  // const {freeTicketCount, setFreeTicketCount} = useState(0)

  const [vipCount, setVipCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);
  
  const totalPrice = vipCount * vip + regularCount * regular;

  const handleVipChange = (type) => {
    setVipCount((prev) => Math.max(0, type === 'increase' ? prev + 1 : prev - 1));
  };

  // const handleFreeTicketChange = (type) => {
  //   setFreeTicketCount((prev) => Math.max(0, type === 'increase' ? prev + 1 : prev - 1));
  // };

  const handleRegularChange = (type) => {
    setRegularCount((prev) => Math.max(0, type === 'increase' ? prev + 1 : prev - 1));
  };

  const handlePayment = () => {
    console.log('Proceeding to payment...');
    setShowModal(false);
  };

  if (!showModal || !event) return null;

  return (
    <div className='modal-container'>
      <div className='modal'>
      <h1 className='text-center font-semibold text-[25px] mb-4'>Select Ticket</h1>
      <button onClick={() => setShowModal(false)} className='absolute top-2 right-2 text-white 
      font-bold text-xl'>X</button>

      <div className='py-3'>
        {free ? <div className='flex justify-center gap-8'>
          <span className="w-[15%] text-lg">Tickets</span>
              <div className='flex items-center gap-3'>
              <button onClick={() => handleVipChange("decrease")} ><CiCircleMinus /></button>
              <span className='w-[20%] text-center'>{vipCount}</span>
              <button onClick={() => handleVipChange("increase")}><CiCirclePlus /></button>    
              </div>
              </div> : <div className='p-8'>
              <div className='flex justify-between'>
              <span className='w-[15%]'>VIP</span>
              <div className='flex items-center gap-4'>
              <button  onClick={() => handleVipChange("decrease")} ><CiCircleMinus /></button>
              <span className="w-[20%] text-center">{vipCount}</span>
              <button  onClick={() => handleVipChange("increase")}><CiCirclePlus /></button>    
              </div>
              <p>NGN{vip * vipCount} </p>
            </div>

            <div className='flex justify-between'>
            <span className='w-[15%]'>Regular</span>
            <div className='flex items-center gap-4'>
            <button onClick={() => handleRegularChange("decrease")}><CiCircleMinus /></button>
            <span className="w-[20%] text-center">{regularCount}</span>
            <button onClick={() => handleRegularChange("increase")}><CiCirclePlus /></button>           
            </div>
            <p>NGN{regular * regularCount}</p>
            </div>
                <div className="border-t border-gray-600 my-4" />

                <div className="flex justify-between items-center mb-4">
                  <span>Total</span>
                  <span className="font-bold">NGN {totalPrice}</span>
                </div>
        </div>
        }
      </div>

          {free ? (
            <button
              width="100%"
              className={vipCount <= 0 ? "bg-gray-500 mt-5 mx-auto w-full" : "bg-purple-600 mt-5 w-full hover:bg-purple-700 mx-auto"}
              disable={vipCount <= 0}
              cursor={vipCount <= 0 ? "not-allowed" : "pointer"}
              onClick={handlePayment}> Get tickets
            </button>
          ) : (
            <button
              width="100%"
              className={totalPrice <= 0 ? "bg-gray-500 mt-5 mx-auto w-full" : "bg-purple-600 mt-5 w-full hover:bg-purple-700 mx-auto"}
              disable={totalPrice <= 0}
              cursor={totalPrice <= 0 ? "not-allowed" : "pointer"}
              onClick={handlePayment}> Proceed to payment
            </button>
          )}
      </div>
    </div>
  );
}
