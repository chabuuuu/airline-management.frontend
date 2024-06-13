import React, { useState } from "react";
import InformationCard from "../InformationCard";
import { BookingType } from "@/type";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 5;

const BookingTable: React.FC<{ allBooking: BookingType[] }> = ({
  allBooking,
}) => {
  const [page, setPage] = useState<number>(1);

  const statusColor = (status: any) => {
    switch (status) {
      case "BOOKED":
        return `btn btn-ghost text-green-400 btn-xs`;
      case "NotBooked":
        return `btn btn-ghost text-yellow-400 btn-xs`;
      case "Cancelled":
        return `btn btn-ghost text-red-400 btn-xs`;
      default:
        return `btn btn-ghost text-blue-400 btn-xs`;
    }
  };

  const totalPages = Math.ceil(allBooking.length / MAX_LENGTH_COL);
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>BookingId</th>
              <th>Passenger</th>
              <th>Price</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allBooking.map((cardData, index) => {
              if (
                index >= MAX_LENGTH_COL * (page - 1) &&
                index < MAX_LENGTH_COL * page
              ) {
                return (
                  <tr key={index}>
                    <th>
                      <label>
                        <span>{index}</span>
                      </label>
                    </th>
                    <td>
                      <span className="font-semibold">
                        {cardData.bookingId}
                      </span>
                    </td>
                    <td>
                      <InformationCard passengerId={cardData.passengerId} />
                    </td>
                    <td>
                      <span className="font-semibold">{cardData.price}</span>
                    </td>
                    <td>
                      BookedAt:{" "}
                      <span className="font-semibold">{cardData.bookedAt}</span>
                      <br />
                      UpdateAt:{" "}
                      <span className="text-sm">{cardData.updateAt}</span>
                    </td>
                    <td>
                      <div className="tooltip" data-tip="Detail seats ">
                        <button className="btn btn-ghost text-rose-400 btn-xs font-medium">
                          {cardData.paymentStatus.toString()}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="tooltip" data-tip="Detail seats ">
                        <button className={statusColor(cardData.bookingStatus)}>
                          {cardData.bookingStatus}
                        </button>
                      </div>
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
        <p className="font-medium">Total flight: {allBooking.length} </p>
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

export default BookingTable;
