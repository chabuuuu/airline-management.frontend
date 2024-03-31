import React from "react";
import Button from "./Button";
import Link from "next/link";

type inputType = {
  logo: string;
  brand: string;
  date: string;
  time: string;
  spot: [string, string];
  status: string;
  price: string | number;
};

const Card: React.FC<inputType> = ({
  logo,
  brand,
  date,
  time,
  spot,
  status,
  price,
}) => {
  return (
    <div className="rounded-2xl flex flex-col justify-around min-h-[260px] bg-white drop-shadow-md p-5">
      <div className="flex items-center mb-4">
        <img src={logo} alt={brand} className="w-12 object-cover mr-4" />
        <h2 className="text-lg font-semibold">{brand}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {time}, {date}
      </p>

      <div className="grid grid-cols-3 grid-cen items-center mb-2">
        <a className="text-blue-500 font-medium text-lg">{spot[0]}</a>
        <div className="flex flex-col items-center">
          <div>1h30</div>
          <svg
            className="w-20 h-2"
            viewBox="0 0 100 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="3" x2="90" y2="3" stroke="black" />
            <circle cx="4" cy="3" r="3" fill="#D9D9D9" stroke="black" />
            <circle cx="90" cy="3" r="3" fill="#D9D9D9" stroke="black" />
          </svg>
        </div>
        <a className="text-blue-500 font-medium text-lg">{spot[1]}</a>
      </div>

      {status === "available" ? (
        <div className="text-green-600 font-semibold mt-4">Available</div>
      ) : (
        <div className="text-red-600 font-semibold mt-4">Sold Out</div>
      )}

      <div className="flex justify-between items-center ">
        <div className="text-xl font-bold">
          {typeof price === "number" ? `${price} VND/NG` : price}
        </div>
        <div className="card-actions ">
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
            className="btn btn-primary rounded-full text-white"
          >
            Chọn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
