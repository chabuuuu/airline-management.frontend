"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TicketCardProps {
  flightId: string;
  bookedAt: string;
  paymentStatus: boolean;
  seatId: string;
  seatClass: string;
  price: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  flightId,
  bookedAt,
  paymentStatus,
  seatId,
  seatClass,
  price,
}) => {
  const { data: session } = useSession();

  const [flightInfo, setFlightInfo] = useState<{
    departureTime: string;
    airlines: string;
    departureAirport: {
      airportName: string;
      city: string;
    };
    arrivalAirport: {
      airportName: string;
      city: string;
    };
  }>({
    departureTime: "",
    airlines: "",
    departureAirport: {
      airportName: "",
      city: "",
    },
    arrivalAirport: {
      airportName: "",
      city: "",
    },
  });

  useEffect(() => {
    const getFlightInfo = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/flight/${flightId}`,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        setFlightInfo({
          departureTime: responseData.departureTime,
          airlines: responseData.airlines,
          departureAirport: {
            airportName: responseData.departureAirport.airportName,
            city: responseData.departureAirport.city,
          },
          arrivalAirport: {
            airportName: responseData.arrivalAirport.airportName,
            city: responseData.arrivalAirport.city,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };
    getFlightInfo();
  }, [flightId, session]);

  return (
    <div className="bg-white shadow rounded-lg p-4 drop-shadow-md m-2 min-w-[500px] max-w-[700px]">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg text-gray-900 font-semibold">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <div
                className="bg-cover h-8 w-8"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/PxvbyDxx/image-362-2.png')",
                }}
              ></div>
            </div>
            <span className="font-semibold ml-2 text-xl">
              {flightInfo?.airlines}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="font-semibold text-xl">{seatId}</div>
          <div className=" text-sm text-gray-500">Class {seatClass}</div>
        </div>
      </div>
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <div className="text-gray-900 font-semibold text-xl">
              {flightInfo.departureAirport.airportName} -{" "}
              {flightInfo.arrivalAirport.airportName}
            </div>
            <div className="text-sm text-gray-500">
              {flightInfo.departureAirport.city} -{" "}
              {flightInfo.arrivalAirport.city}
            </div>
          </div>

          <div>
            <div className="text-lg text-gray-900 font-semibold">
              {price} VND
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {paymentStatus ? (
            <div className="text-sm  text-green-500">Paid</div>
          ) : (
            <div className="text-sm  text-red-400">Unpaid</div>
          )}

          <div className="text-sm  text-gray-500">Book at: {bookedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
