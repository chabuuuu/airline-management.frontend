import { PlanesData } from "@/planes";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import HandleSeatModal from "./HandleSeatModal";
import { FlightType } from "@/type";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 5;

const FlightTable: React.FC<{ allFlight: FlightType[] }> = ({ allFlight }) => {
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(allFlight.length / MAX_LENGTH_COL);
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [showSeatModal, setShowSeatModal] = useState<boolean>(false);

  const [value, setStatus] = useState<string | null>(null);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [handleSave, setHandleSave] = useState<boolean | null>(false);

  const handleChangeStatus = () => {
    setHandleSave(true);
  };

  useEffect(() => {
    const changStatus = async () => {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/flight/${value}/${selectedFlightId}`,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NzIxOTQwLTNlMWYtNDUxYy1hNTQ1LWQxMjU1MWQyMzNjOSIsInVzZXJuYW1lIjoibmd1eWVudmFuYV9zdGFmZmx2MiIsInBhc3N3b3JkIjoiQDFUaGluaEhhIiwicm9sZSI6IlN0YWZmX0xWMiIsImlhdCI6MTcxNDkyMzE3MiwiZXhwIjoxNzE1MjQ3MTcyfQ.ZbSTaXL4nD1VkI60teruKC1Xp5TidgycSmn9KLJZRiU",
        },
      };
      try {
        const response = await axios.request(config);
        console.log(response);
        // if (response.status === 200) alert("Succes change seat class");
      } catch (e) {
        console.log(e);
      }
    };
    if (handleSave) changStatus();
  });
  const statusColor = (status: any) => {
    switch (status) {
      case "Đã hủy chuyến":
        return `btn btn-ghost text-red-400 btn-xs`;
      case "Đang bay":
        return `btn btn-ghost text-green-400 btn-xs`;
      case "Chưa khởi hành":
        return `btn btn-ghost text-yellow-400 btn-xs`;
      default:
        return `btn btn-ghost text-blue-400 btn-xs`;
    }
  };

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Flight</th>
              <th>Departure</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Seat</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allFlight.map((cardData, index) => {
              if (
                index >= MAX_LENGTH_COL * (page - 1) &&
                index < MAX_LENGTH_COL * page
              ) {
                return (
                  <tr
                    key={index}
                    className={cardData.status === "sold" ? " bg-red-50" : ""}
                  >
                    <th>
                      <label>
                        <span>{index}</span>
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="">
                          <div className="w-8 object-cover">
                            <img src={cardData.logo} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{cardData.flightId}</div>
                          <div className="text-sm opacity-50">
                            {cardData.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold">
                        {cardData.departure}
                      </span>
                      <br />
                      <span className="text-sm">{cardData.airportStart}</span>
                    </td>
                    <td>
                      <span className="font-semibold">{cardData.arrival}</span>
                      <br />
                      <span className="text-sm">{cardData.airportEnd}</span>
                    </td>
                    <td>
                      <span className="font-semibold">{cardData.date}</span>
                      <p className="text-sm">
                        {cardData.time}, {cardData.duration} hours
                      </p>
                    </td>
                    <td>
                      <div className="tooltip" data-tip="Detail seats ">
                        <button
                          onClick={() => {
                            setShowSeatModal(true);
                            setSelectedFlightId(cardData.flightId);
                          }}
                          className="btn btn-ghost text-rose-400 btn-xs font-medium"
                        >
                          {cardData.placed}/{cardData.seat}
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold ">{cardData.price}</span>
                    </td>
                    <td>
                      <div className="tooltip" data-tip="Change status">
                        <button
                          onClick={() => {
                            setShowStatusModal(true);
                            setSelectedFlightId(cardData.flightId);
                          }}
                          className={statusColor(cardData.status)}
                        >
                          {cardData.status}
                        </button>
                      </div>
                    </td>
                    <td>
                      <button>
                        <svg
                          className="w-4 h-4 hover:opacity-50 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 50"
                          fill="none"
                        >
                          <circle cx="25" cy="25" r="25" fill="#2F2F2F" />
                          <circle cx="100" cy="25" r="25" fill="#2F2F2F" />
                          <circle cx="175" cy="25" r="25" fill="#2F2F2F" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between p-3">
        <p className="font-medium">Total flight: {allFlight.length} </p>
        <div className="join bg-slate-50">
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
                className={`join-item btn-ghost btn-xs ${
                  pageNumber === page ? " btn-active" : ""
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
      {showStatusModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-black p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Flight Status</h3>

            <div>
              <label>Status</label>
              <select
                value={value ?? "set-finish"}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="select select-bordered select-sm w-full"
              >
                <option value="set-finish">Success</option>
                <option value="set-in-progress">In Progress</option>
                <option value="set-cancel">Cancel</option>
                <option value="set-not-started">Not Started</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowStatusModal(false)}>
                Close
              </button>
              <button className="btn btn-warning" onClick={handleChangeStatus}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showSeatModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Seat Flight </h3>

            <div className="flex flex-col justify-between">
              <HandleSeatModal flightId={selectedFlightId} />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowSeatModal(false)}>
                Close
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setShowSeatModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightTable;
