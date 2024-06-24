import React from "react";
import Button from "./Button";
import Link from "next/link";
import { FlightType } from "@/type";
import { duration } from "@mui/material";

const Card: React.FC<{ flight: FlightType }> = ({ flight }) => {
  const statusColor = (status: any) => {
    switch (status) {
      case "Đã hủy chuyến":
        return ` font-medium text-red-400 `;
      case "Đang bay":
        return ` font-medium text-green-400`;
      case "Chưa khởi hành":
        return ` font-medium text-yellow-400`;
      default:
        return ` font-medium text-blue-400`;
    }
  };
  return (
    <div
      key={flight.flightId}
      className="rounded-3xl flex flex-col  justify-around min-h-[250px] bg-white hover:drop-shadow-lg p-5"
    >
      <div className="flex items-center">
        <img
          src={flight.logo}
          alt={flight.brand}
          className=" h-8 object-cover mr-4"
        />
        <div className="flex  w-full  justify-between">
          <h2 className="text-xl  font-medium">{flight?.brand}</h2>
          <h2 className="text-2xl  font-semibold">{flight.flightId}</h2>
        </div>
      </div>
      <div className="flex justify-end -mt-4">
        <p className="text-sm text-gray-600">{flight.time + ","}</p>
        <p className="text-sm text-gray-600">{flight.date}</p>
      </div>

      <div className="grid grid-cols-3 grid-cen items-center ">
        <a className="text-blue-500 font-medium text-lg flex justify-center">
          {flight.departure}
        </a>
        <div className="flex flex-col items-center">
          <div>{flight.duration}h </div>
          <svg
            className="w-20 h-2"
            viewBox="0 0 100 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="4" x2="90" y2="4" stroke="black" />
            <circle cx="5" cy="4" r="4" fill="#D9D9D9" stroke="black" />
            <circle cx="90" cy="4" r="4" fill="#D9D9D9" stroke="black" />
          </svg>
        </div>
        <a className="text-blue-500 font-medium text-lg flex justify-center">
          {flight.arrival}
        </a>
      </div>

      <div className="-mb-3 ">
        {flight.seatsAvailable > 0 ? (
          <div className="font-medium text-green-400">Seat Available</div>
        ) : (
          <div className="font-medium text-rose-400">Sold Out</div>
        )}
      </div>

      <div className="flex justify-between items-center ">
        <div className="text-2xl  font-semibold">
          {typeof flight.price === "number"
            ? `${flight.price} VND/NG`
            : flight.price}
        </div>
        <Link
          href={{
            pathname: "/DetailPage",
            query: {
              flightId: flight.flightId,
              logo: flight.logo,
              brand: flight.brand,
              date: flight.date,
              time: flight.time,
              departure: flight.departure,
              destination: flight.arrival,
              airportStart: flight.airportStart,
              airportEnd: flight.airportEnd,
              price: flight.price,
              duration: flight.duration,
            },
          }}
          className="w-20 h-8 p-3 font-semibold bg-opacity-80 hover:bg-opacity-100 active:btn-active flex items-center justify-center bg-primary rounded-xl text-white"
        >
          Chọn
        </Link>
      </div>
    </div>
  );
};

export default Card;
