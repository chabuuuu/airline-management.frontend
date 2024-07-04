"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import { BookingType, TicketType, chart } from "@/type";
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import PieChart from "../PieChart";
import TicketTable from "./TicketTable";
import { string } from "zod";

const TicketManage = () => {
  const { data: session } = useSession();

  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    const getAllTicketListOfStaff = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/ticket/list`;

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);

        const responseData = response.data.data.map((ticket: any) => {
          return {
            ticketId: ticket.ticketId,
            flightId: ticket.flightId,
            passenger: {
              passengerId: ticket.passengerId,
              fullName: ticket.fullName,
              cccd: ticket.cccd,
              email: ticket.email,
              phoneNumber: ticket.phoneNumber,
            },
            price: ticket.price,
            seat: {
              seatId: ticket.seatFlight.seatId,
              class: ticket.seatFlight.class,
            },
            status: ticket.status,
            sellAt: ticket.sellAt,
            updateAt: ticket.updateAt,
          };
        });
        setTickets(responseData);
      } catch (e) {
        console.log(e);
      }
    };

    getAllTicketListOfStaff();
  }, [session?.user.token]);

  const [availableFlight, setAvailableFlight] = useState<boolean>(false);

  const handleFilterAvailableFlight = () => {
    setAvailableFlight((prev) => !prev);
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterBookings, setFilterBookings] = useState<BookingType[]>([]);

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <div></div>
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Ticket DashBoard
        </div>
        <div className="collapse-content">
          <div className="flex gap-5 h-full"></div>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Ticket Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <div className="flex justify-between">
            <div>
              <button className="btn btn-ghost transition duration-300">
                Create Ticket
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
            </div>

            <div className="flex gap-4">
              <label className="input input-bordered flex items-center gap-2 mx-3">
                <p className=" ">Booking Id</p>
                <input
                  type="text"
                  id="bookingId"
                  className="grow font-medium"
                  placeholder=""
                  onChange={(e: any) => {
                    setSearchQuery(e?.target.value);
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <div className="flex rounded-md p-1 items-center justify-around h-12 bg-base-300">
                <div
                  className={`${
                    availableFlight
                      ? "flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                      : "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                  }`}
                  onClick={() => setAvailableFlight(!availableFlight)}
                >
                  All
                </div>

                <div
                  className={`${
                    availableFlight
                      ? "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                      : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                  }`}
                  onClick={() => setAvailableFlight(!availableFlight)}
                >
                  Pays
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-white rounded-2xl p-5 my-3">
            <div className="overflow-x-auto">
              <TicketTable tickets={tickets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketManage;
