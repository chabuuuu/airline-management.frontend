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
    <div className="bg-white shadow rounded-lg p-4  mb-5 min-w-[450px]">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg text-gray-900 font-semibold">
          <div className="flex items-center">
            <div className=" h-8 w-8 rounded-full overflow-hidden">
              <div
                className=" bg-cover h-8 w-8"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/PxvbyDxx/image-362-2.png')",
                }}
              ></div>
            </div>
            <span className="font-semibold ml-2 text-xl">{airline}</span>
          </div>
        </div>
        <div className="text-base text-gray-500">
          {date} {time}
        </div>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <div className="text-gray-900 font-semibold text-xl">
            {departure} - {arrival}
          </div>
          <div className="text-sm text-gray-500">Duration: {duration}</div>
        </div>

        <div>
          <div className="text-lg text-gray-900 font-semibold">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
