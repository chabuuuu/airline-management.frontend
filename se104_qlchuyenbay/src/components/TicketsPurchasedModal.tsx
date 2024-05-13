"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import TicketCard from "./TIcketCard";
import axios from "axios";

// "bookingId": "a073d6bd-287d-40f0-a33a-7876fb657786",
// "paymentStatus": false,
// "bookingStatus": "BOOKED",
// "passengerId": "1342a007-d259-4969-b3db-c455384f6d79",
// "price": "156250.00",
// "bookedAt": "04-05-2024 10:10:09",
// "updateAt": "04-05-2024 10:10:09"

const SearchModal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    const getBookingTicket = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/booking/me`,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMyNDI0YzFhLWJmZjAtNDY3Yy1hNDM2LTM2OTc1MDM4NTUxOSIsImVtYWlsIjoiaGFwaHV0aGluaDMzNjRAZ21haWwuY29tIiwicGFzc3dvcmQiOiJAMVRoaW5oSGEiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE3MTIwMjI1MjMsImV4cCI6MTcxMjM0NjUyM30.lQmtGwfLJFtGfFQWJgZqF61Pfb7KGb1vwtWcRlIpKt0`,
        },
      };
      try {
        const response = await axios.request(config);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    getBookingTicket();
  });
  return (
    <div className="w-full">
      <div className="w-full">
        <button
          onClick={() => setShowModal(true)}
          className="btn w-full bg-blue-600 text-white px-4 py-2 rounded-lg btn-ghost transition duration-300"
        >
          See all tickets purchased
        </button>

        {showModal && (
          <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 min-w-[600px] min-h-[600px] shadow-lg transform transition-all duration-300">
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4 mb-5">
                <h2 className="text-2xl font-semibold">
                  Your purchased ticket
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <TicketCard
                airline="VietNamAirlines"
                date="2024-04-15"
                time="08:30 AM"
                departure="HoChiMinh SGN"
                arrival="Vinh VII"
                duration="1 hours 30 minutes"
                price="$350.00"
              />

              <TicketCard
                airline="VietNamAirlines"
                date="2024-04-15"
                time="08:30 AM"
                departure="HoChiMinh SGN"
                arrival="Vinh VII"
                duration="1 hours 30 minutes"
                price="$350.00"
              />
              <TicketCard
                airline="VietNamAirlines"
                date="2024-04-15"
                time="08:30 AM"
                departure="HoChiMinh SGN"
                arrival="Vinh VII"
                duration="1 hours 30 minutes"
                price="$350.00"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
