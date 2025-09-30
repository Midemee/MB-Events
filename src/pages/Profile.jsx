import React from "react";
import profileImg from "../assets/profile image.jpg";
import {IoPencil } from "react-icons/io5";
import AppLayout from "../Layouts/AppLayout";

export default function Profile() {
  return (
    <div className="">
        <AppLayout>
        <div className="flex flex-col page-container my-3">
          <section className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <div className="relative w-12 h-12">
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover"/>
                <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-[#9747FF]">
                    <IoPencil size={10} />
                </button>
             </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-lg">Your Name</h1>
                </div>
                <p className="text-gray-600 text-sm">yourname@gmail.com</p>
              </div>
            </div>
          </section>
          <hr className="border-gray-300 mb-6" />
          <section className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Name</span>
              <span className="font-medium">Your Name</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between">
              <span className="text-gray-700">Email account</span>
              <span className="font-medium">yourname@gmail.com</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Password</span>
              <button className="text-[#9747FF] hover:font-bold cursor-pointer">Change password
              </button>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between">
              <span className="text-gray-700">Events hosted</span>
              <span className="font-medium">3</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between">
              <span className="text-gray-700">Events attended</span>
              <span className="font-medium">4</span>
            </div>
          </section>
          <button className="bg-[#9747FF] w-[11%] rounded-xs py-3 px-2 text-white mt-6">Save changes</button>
        </div>
        </AppLayout>
    </div>
  );
}