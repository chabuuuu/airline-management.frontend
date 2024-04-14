"use client";

import React, { useState } from "react";
import SearchForm from "./SearchForm";
import TicketCard from "./TIcketCard";

const SearchModal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

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
