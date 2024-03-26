import React from "react";

interface TicketCardProps {
  airline: string;
  date: string;
  time: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  airline,
  date,
  time,
  departure,
  arrival,
  duration,
  price,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg text-gray-900 font-semibold">{airline}</div>
        <div className="text-sm text-gray-500">
          {date} {time}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-gray-900 font-semibold">
          {departure} - {arrival}
        </div>
        <div className="text-sm text-gray-500">Duration: {duration}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg text-gray-900 font-semibold">{price}</div>
        <div>
          <button
            className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Thanh toán
          </button>
          <button
            className="bg-gray-300 text-gray-900 active:bg-gray-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Hủy vé
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
