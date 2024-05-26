import { PlanesData } from "@/planes";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import HandleSeatModal from "./HandleSeatModal";

type RowType = {
  bookingId: string;
  paymentStatus: boolean;
  bookingStatus: string;
  passengerId: string;
  price: string;
  bookedAt: string;
  updateAt: string;
};

const BookingTable: React.FC<{ allBooking: RowType[] }> = ({ allBooking }) => {
  const MAX_LENGTH_COL = 2;

  const [page, setPage] = useState<number>(1);

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
              <th>BookingId</th>
              <th>PassengerId</th>
              <th>Price</th>
              <th>Date</th>
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
                      <span className="font-semibold">
                        {cardData.passengerId}
                      </span>
                    </td>
                    <td>
                      <span className="font-semibold">{cardData.price}</span>
                    </td>
                    <td>
                      <span className="font-semibold">{cardData.bookedAt}</span>
                      <br />
                      <span className="text-sm">{cardData.updateAt}</span>
                    </td>
                    <td>
                      <div className="tooltip" data-tip="Detail seats ">
                        <button className="btn btn-ghost text-rose-400 btn-xs font-medium">
                          {cardData.bookingStatus}
                        </button>
                      </div>
                      <br />
                      <div className="tooltip" data-tip="Detail seats ">
                        <button className="btn btn-ghost text-rose-400 btn-xs font-medium">
                          {cardData.paymentStatus}
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
          {[...Array(Math.ceil(allBooking.length / MAX_LENGTH_COL)).keys()].map(
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

export default BookingTable;
