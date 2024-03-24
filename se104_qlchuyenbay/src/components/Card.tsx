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
    <div className="card w-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-row">
          <img src={logo} alt={brand} className="w-8 h-8 object-cover mr-3" />
          <h2 className="text-xl font-semibold">{brand}</h2>
        </div>
        <p className="flex justify-end mb-2 text-sm">{date}</p>

        <div className="flex justify-around mb-2 items-center">
          <a className="text-blue-500 mr-2">{spot[0]}</a>
          <div className="flex flex-col items-center ">
            <div className="mr-5">1h30</div>
            <svg
              width="160" // Adjusted width to match x2 attribute of the line
              height="6"
              viewBox="0 0 200 6" // Kept viewBox as is
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="3.5" x2="157" y2="3.5" stroke="black" /> // Adjusted x2
              to 157 for proper alignment
              <circle cx="3" cy="3" r="2.5" fill="#D9D9D9" stroke="black" />
              <circle
                cx="157"
                cy="3"
                r="2.5"
                fill="#D9D9D9"
                stroke="black"
              />{" "}
              // Adjusted cx to 157 for proper alignment
            </svg>
          </div>
          <a className="text-blue-500">{spot[1]}</a>
        </div>

        {status === "available" ? (
          <div className="text-green-600">Available</div>
        ) : (
          <div className="text-red-600">Sold Out</div>
        )}
        <div className=" flex justify-between items-center ">
          <div className="text-xl font-bold">
            {typeof price === "number" ? `${price} VND/NG` : price}
          </div>
          <div className="card-actions">
            <Link
              className="btn btn-ghost bg-indigo-600 text-white"
              href="/DetailPage"
            >
              Chọn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
