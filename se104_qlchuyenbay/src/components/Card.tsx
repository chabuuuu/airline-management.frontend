import React from "react";
import Button from "./Button";
import Link from "next/link";

type inputType = {
  logo: string;
  brand: string;
  date: string;
  time?: string;
  duration?: string;
  spot: [string, string];
  status: string;
  price: string | number;
};

const Card: React.FC<inputType> = ({
  logo,
  brand,
  date,
  time,
  duration,
  spot,
  status,
  price,
}) => {
  return (
    <div className="rounded-3xl flex flex-col  justify-around min-h-[250px] bg-white drop-shadow-md p-5">
      <div className="flex items-center">
        <img src={logo} alt={brand} className=" h-8 object-cover mr-4" />
        <h2 className="text-2xl  font-semibold">{brand}</h2>
      </div>
      <div className="flex justify-end -mt-4">
        <p className="text-sm text-gray-600">{time + ","}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>

      <div className="grid grid-cols-3 grid-cen items-center ">
        <a className="text-blue-500 font-medium text-lg flex justify-center">
          {spot[0]}
        </a>
        <div className="flex flex-col items-center">
          <div>{duration} </div>
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
          {spot[1]}
        </a>
      </div>

      <div className="-mb-3 ">
        {status === "available" ? (
          <div className="text-green-600 font-semibold ">Available</div>
        ) : (
          <div className="text-red-600 font-semibold ">Sold Out</div>
        )}
      </div>

      <div className="flex justify-between items-center ">
        <div className="text-2xl  font-semibold">
          {typeof price === "number" ? `${price} VND/NG` : price}
        </div>
        <Link
          href={{
            pathname: "/DetailPage",
            query: {
              logo: logo,
              brand: brand,
              date: date,
              time: time,
              departure: spot[0],
              destination: spot[1],
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
