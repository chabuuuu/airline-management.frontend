import React, { useState } from "react";
import Link from "next/link";
import { FlightType } from "@/type";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 3;

const ListSearchingView: React.FC<{ allFlight: FlightType[] }> = ({
  allFlight,
}) => {
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(allFlight.length / MAX_LENGTH_COL);
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

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
                        {cardData.seatsAvailable > 0 ? (
                          <button className="font-medium text-green-400">
                            {cardData.seatsAvailable +
                              "/" +
                              cardData.seatsTotal}
                          </button>
                        ) : (
                          <button className="font-medium text-rose-400">
                            Sold Out
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <span className="font-semibold ">{cardData.price}</span>
                    </div>
                    <div className="col-span-1">
                      <div className="tooltip" data-tip="Change status">
                        <button
                          className={` btn-xs font-medium ${statusColor(
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
                            airportStart: cardData.airportStart,
                            airportEnd: cardData.airportEnd,
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
          <button
            className="join-item btn btn-xs btn-ghost"
            onClick={() => setPage(1)}
          >
            «
          </button>
          {[...Array(endPage - adjustedStartPage + 1).keys()].map((index) => {
            const pageNumber = adjustedStartPage + index;
            return (
              <button
                key={pageNumber}
                className={`join-item btn btn-xs ${
                  pageNumber === page ? "btn-active" : ""
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            className="join-item btn btn-xs btn-ghost"
            onClick={() => setPage(totalPages)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListSearchingView;
