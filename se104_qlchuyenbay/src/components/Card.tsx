import React from "react";
import Button from "./Button";
import Link from "next/link";

type inputType = {
  logo: string;
  brand: string;
  date: string;
  spot: [string, string];
  status: string;
  price: string | number;
};

const Card: React.FC<inputType> = ({
  logo,
  brand,
  date,
  spot,
  status,
  price,
}) => {
  return (
    <div className="rounded-2xl bg-white drop-shadow-md p-5">
      <div className="flex items-center mb-4">
        <img
          src={logo}
          alt={brand}
          className="w-12 h-12 object-cover mr-4 rounded-full"
        />
        <h2 className="text-lg font-semibold">{brand}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-2">{date}</p>

      <div className="flex justify-between items-center mb-2">
        <a className="text-blue-500 font-medium text-xl">{spot[0]}</a>
        <div className="flex flex-col items-center ">
          <div>1h30</div>
          <svg
            width="160"
            height="6"
            viewBox="0 0 160 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="3" x2="150" y2="3" stroke="black" />
            <circle cx="0" cy="3" r="3" fill="#D9D9D9" stroke="black" />
            <circle cx="150" cy="3" r="3" fill="#D9D9D9" stroke="black" />
          </svg>
        </div>
        <a className="text-blue-500 font-medium text-xl">{spot[1]}</a>
      </div>

      {status === "available" ? (
        <div className="text-green-600 font-semibold">Available</div>
      ) : (
        <div className="text-red-600 font-semibold">Sold Out</div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="text-xl font-bold">
          {typeof price === "number" ? `${price} VND/NG` : price}
        </div>
        <div className="card-actions ">
          <Link href="/DetailPage">
            <div className="btn btn-primary rounded-full text-white">Chọn</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
