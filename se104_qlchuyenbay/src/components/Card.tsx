import React from "react";
import Button from "./Button";
import Link from "next/link";
import { FlightType } from "@/type";

const Card: React.FC<FlightType> = ({
  flightId,
  logo,
  brand,
  date,
  time,
  duration,
  departure,
  arrival,
  status,
  price,
}) => {
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
    <div className="rounded-3xl flex flex-col  justify-around min-h-[250px] bg-white drop-shadow-md p-5">
      <div className="flex items-center">
        <img src={logo} alt={brand} className=" h-8 object-cover mr-4" />
        <div className="flex  w-full  justify-between">
          <h2 className="text-xl  font-medium">{brand}</h2>
          <h2 className="text-2xl  font-semibold">{flightId}</h2>
        </div>
      </div>
      <div className="flex justify-end -mt-4">
        <p className="text-sm text-gray-600">{time + ","}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>

      <div className="grid grid-cols-3 grid-cen items-center ">
        <a className="text-blue-500 font-medium text-lg flex justify-center">
          {departure}
        </a>
        <div className="flex flex-col items-center">
          <div>{duration}h </div>
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
          {arrival}
        </a>
      </div>

      <div className="-mb-3 ">
        <div className={statusColor(status)}>{status}</div>
      </div>

      <div className="flex justify-between items-center ">
        <div className="text-2xl  font-semibold">
          {typeof price === "number" ? `${price} VND/NG` : price}
        </div>
        <Link
          href={{
            pathname: "/DetailPage",
            query: {
              flightId: flightId,
              logo: logo,
              brand: brand,
              date: date,
              time: time,
              departure: departure,
              destination: arrival,
              status: status,
              price: price,
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
