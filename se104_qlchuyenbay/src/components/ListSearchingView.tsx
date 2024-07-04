"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FlightType, IntermediateAirport } from "@/type";
import axios from "axios";

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
  const [intermediateModalId, setIntermediateModalId] = useState<string | null>(
    null
  );
  const [intermediateData, setIntermediateData] = useState<any>([]);

  const flightIntermediate = allFlight.find(
    (flight) => flight.flightId === intermediateModalId
  );

  const getAirportByID = async (id: any) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/airport/${id}`,
      headers: {},
    };
    try {
      const response = await axios.request(config);
      console.log(response);
      return {
        airportCode: response.data.airportCode,
        airportName: response.data.airportName,
        city: response.data.city,
        country: response.data.country,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewIntermediate = useCallback(async () => {
    if (flightIntermediate?.intermediate) {
      const data = await Promise.all(
        flightIntermediate.intermediate.map((flight) =>
          getAirportByID(flight.airportId)
        )
      );
      setIntermediateData(data);
    }
  }, [flightIntermediate]);

  useEffect(() => {
    const handle = () => {
      if (intermediateModalId !== null) {
        handleViewIntermediate();
      }
    };
    handle();
  }, [intermediateModalId, handleViewIntermediate]);

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
                  <div className="grid grid-cols-8 hover:drop-shadow-lg bg-white rounded-lg  p-5 m-2 items-center">
                    <div className="col-span-1">
                      <div className="flex items-center gap-3">
                        <div className="">
                          <div className="w-8">
                            <picture>
                              <img
                                className="w-full"
                                src={cardData.logo}
                                alt="Logo"
                              />
                            </picture>
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
                    <div className="col-span-2 flex justify-between px-10 items-center">
                      <div>
                        <span className="font-semibold">
                          {cardData.departure}
                        </span>
                        <br />
                        <span className="text-sm">{cardData.airportStart}</span>
                      </div>
                      {/* </div>
                    {cardData.intermediate && <div>-</div>}
                    
                    <div className="col-span-1"> */}
                      {cardData.intermediate &&
                        cardData.intermediate.length > 0 && (
                          <div
                            onClick={() => {
                              setIntermediateModalId(cardData.flightId);
                            }}
                            className="hover:bg-base-300 cursor-pointer items-center flex justify-center h-3 w-5 rounded-lg"
                          >
                            -
                          </div>
                        )}
                      <div>
                        <span className="font-semibold">
                          {cardData.arrival}
                        </span>
                        <br />
                        <span className="text-sm">{cardData.airportEnd}</span>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <span className="font-semibold">{cardData.date}</span>
                      <p className="text-sm">
                        {cardData.time}, {cardData.duration} hours
                      </p>
                    </div>
                    <div className="col-span-1">
                      <div className="tooltip" data-tip="Seat">
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
                      <span className="font-semibold ">
                        {cardData.price} VND
                      </span>
                    </div>
                    <div className="col-span-1">
                      <div className="tooltip" data-tip="Status">
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
      {intermediateModalId && (
        <div
          //onClick={() => setShowProfileModal(!showProfileModal)}
          className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white px-10 pb-10 pt-5 rounded-xl flex flex-col">
            <div
              onClick={() => setIntermediateModalId(null)}
              className="flex justify-between mb-4 items-center"
            >
              <p className="text-xl font-semibold">Intermediate Flights</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-5 h-5 hover:opacity-60"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <div className="">
              <table className="table flex justify-center ">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Airport</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Duration</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {flightIntermediate?.intermediate?.map((it, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>
                        <div>
                          {intermediateData[index]?.airportName},{" "}
                          {intermediateData[index]?.airportCode}
                        </div>
                      </td>
                      <td>
                        <div>{intermediateData[index]?.city}</div>
                      </td>
                      <td>
                        <div>{intermediateData[index]?.country}</div>
                      </td>
                      <td>
                        <div> {it.duration} m</div>
                      </td>
                      <td>
                        <div> {it.notes}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
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
