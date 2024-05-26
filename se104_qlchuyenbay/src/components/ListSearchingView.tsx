import React, { useState } from "react";
import FlightTable from "./staff-components/FlightTable";
import Link from "next/link";
type RowType = {
  flightId: string;
  logo: string;
  brand: string;
  date: string;
  time: string;
  duration?: string;
  departure: string;
  airportStart?: string;
  airportEnd?: string;
  arrival: string;
  seat: string;
  placed?: string;
  status: string;
  price: string | number;
  available: string;
};
const MAX_LENGTH_COL = 9;

const ListSearchingView: React.FC<{ allFlight: RowType[] }> = ({
  allFlight,
}) => {
  const [page, setPage] = useState<number>(1);
  const statusColor = (status: any) => {
    switch (status) {
      case "Đã hủy chuyến":
        return `text-red-400`;
      case "Đang bay":
        return `text-green-400`;
      case "Chưa khởi hành":
        return `text-yellow-400`;
      default:
        return `text-blue-400`;
    }
  };
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <div className="">
          {allFlight.map((cardData, index) => {
            if (
              index >= MAX_LENGTH_COL * (page - 1) &&
              index < MAX_LENGTH_COL * page
            ) {
              return (
                <div
                  key={index}
                  className={cardData.status === "sold" ? "bg-red-50" : ""}
                >
                  <div className="grid grid-cols-8 bg-white rounded-lg p-5 m-2 items-center">
                    <div className="col-span-1">
                      <div className="flex items-center gap-3">
                        <div className="">
                          <div className="w-8">
                            <img
                              className="w-full"
                              src={cardData.logo}
                              alt="Logo"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{cardData.flightId}</div>
                          <div className="text-sm opacity-50">
                            {cardData.brand}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <span className="font-semibold">
                        {cardData.departure}
                      </span>
                      <br />
                      <span className="text-sm">{cardData.airportStart}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="font-semibold">{cardData.arrival}</span>
                      <br />
                      <span className="text-sm">{cardData.airportEnd}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="font-semibold">{cardData.date}</span>
                      <p className="text-sm">
                        {cardData.time}, {cardData.duration} hours
                      </p>
                    </div>
                    <div className="col-span-1">
                      <div className="tooltip" data-tip="Detail seats ">
                        <button className="btn btn-ghost text-rose-400 btn-xs font-medium">
                          {/* {cardData.placed}/{cardData.seat} */}
                          30/48
                        </button>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <span className="font-semibold ">{cardData.price}</span>
                    </div>
                    <div className="col-span-1">
                      <div className="tooltip" data-tip="Change status">
                        <button
                          className={`btn btn-ghost btn-xs font-medium ${statusColor(
                            cardData.status
                          )}`}
                        >
                          {cardData.status}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link
                        href={{
                          pathname: "/DetailPage",
                          query: {
                            flightId: cardData.flightId,
                            logo: cardData.logo,
                            brand: cardData.brand,
                            date: cardData.date,
                            time: cardData.time,
                            departure: cardData.departure,
                            destination: cardData.arrival,
                            status: cardData.status,
                            price: cardData.price,
                          },
                        }}
                        className="w-20 h-8 p-3 font-semibold bg-opacity-80 hover:bg-opacity-100 active:btn-active flex items-center justify-center 
                        bg-indigo-500 rounded-xl text-white"
                      >
                        Chọn
                      </Link>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="flex justify-between p-3">
        <p className="font-medium">Total flight: {allFlight.length} </p>
        <div className="join">
          {[...Array(Math.ceil(allFlight.length / MAX_LENGTH_COL)).keys()].map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className="join-item btn btn-xs"
                onClick={() => setPage(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ListSearchingView;
