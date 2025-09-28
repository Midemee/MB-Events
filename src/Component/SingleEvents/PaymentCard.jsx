import React, {useState} from 'react'
import TicketModal from "../TicketModal"


export default function PaymentCard({event}) {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const {price = {}} = event;
  const {free, vip, regular } = price;

  return (
    <div className='bg-black flex flex-col items-center w-[200px] rounded-md p-3 text-white'>
        <h1 className='text-center my-1'>Pricing</h1>

        {!free && (
        <div className='mt-4'>
            <div className='flex justify-between py-3'>
                <span>VIP </span>
                <span className='font-bold'>NGN {vip}</span>
            </div>
            <div className='flex justify-between pb-3'>
                <span>Regular</span>
                <span className='font-bold'>NGN {regular}</span>
            </div>
            </div>
        )}
        
            <button onClick={handleOpenModal} className='text-white bg-purple-600 my-2 w-full'>proceed to payment          
            </button>

            <TicketModal
            showModal={showModal}
            setShowModal={setShowModal}
            event={event}
            />
    </div>
  );
}
