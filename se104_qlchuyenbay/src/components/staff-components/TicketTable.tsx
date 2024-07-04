"use client";
import React, { useState } from "react";
import InformationCard from "../InformationCard";
import { BookingType, TicketType } from "@/type";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 5;

const TicketTable: React.FC<{ tickets: TicketType[] }> = ({ tickets }) => {
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

  const totalPages = Math.ceil(tickets.length / MAX_LENGTH_COL);
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  const printTicket = async (ticketId: string) => {
    console.log(ticketId);
    const url = `${process.env.NEXT_PUBLIC_SERVER}/ticket/print?ticketId=${ticketId}`;
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(url);
    try {
      const response = await axios.request(config);
      console.log(response);
      toast.success("Print succesful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e: any) {
      const messages = e.response.data.message;
      toast.error(messages || "An error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const [printModal, setPrintModal] = useState<boolean>(false);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>TicketId</th>
              <th>BookingId</th>
              <th>Passenger</th>
              <th>FlightId</th>
              <th>Seat</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => {
              if (
                index >= MAX_LENGTH_COL * (page - 1) &&
                index < MAX_LENGTH_COL * page
              ) {
                return (
                  <tr key={index}>
                    <th key={index}>
                      <label>
                        <span>{index}</span>
                      </label>
                    </th>
                    <td>
                      <div className="tooltip" data-tip={ticket.ticketId}>
                        <span className="font-semibold">
                          {ticket.ticketId?.slice(0, 8).concat("...")}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="tooltip" data-tip={ticket.bookingId}>
                        <span className="font-semibold">
                          {ticket.bookingId?.slice(0, 8).concat("...")}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div
                        className="tooltip"
                        data-tip={`${ticket.passenger.fullName} - ${ticket.passenger.phoneNumber} ${ticket.passenger.email} `}
                      >
                        <span
                          className="font-semibold"
                          onClick={(e: any) => {
                            console.log(e);
                            navigator.clipboard.writeText(
                              ticket.passenger.passengerId
                            );
                          }}
                        >
                          {ticket.passenger?.passengerId
                            .slice(0, 8)
                            .concat("...")}{" "}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="tooltip" data-tip={ticket.flightId}>
                        <span
                          className="font-semibold"
                          onClick={(e: any) => {
                            console.log(e);
                            navigator.clipboard.writeText(ticket.flightId);
                          }}
                        >
                          {ticket.flightId}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="tooltip" data-tip={ticket.seat.class}>
                        <span className="font-semibold text-base">
                          {ticket.seat.seatId}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="tooltip">{ticket.price}</div>
                    </td>
                    <td>
                      SellAt:{" "}
                      <span className="font-semibold">{ticket.sellAt}</span>
                      <br />
                      UpdateAt:{" "}
                      <span className="text-sm">{ticket.updateAt}</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost text-green-400 btn-xs font-medium">
                        {ticket.status}
                      </button>
                    </td>
                    <td className="flex flex-col mt-3 justify-center">
                      <Dropdown
                        key={ticket.ticketId}
                        className="flex justify-center"
                      >
                        <DropdownTrigger>
                          <Button variant="bordered">
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
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          key={ticket.ticketId}
                          aria-label="Static Actions"
                          className="bg-white rounded-xl drop-shadow-lg p-3"
                        >
                          <DropdownItem
                            textValue="dropdown"
                            key={`upload-${ticket.ticketId}`}
                            className="btn btn-sm btn-ghost"
                          >
                            <div
                              className="flex justify-between"
                              onClick={() => {
                                const url = `${process.env.NEXT_PUBLIC_SERVER}/ticket/print?ticketId=${ticket.ticketId}`;
                                window.open(url);
                              }}
                            >
                              <p>Print ticket</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4 h-4"
                              >
                                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                              </svg>
                            </div>
                          </DropdownItem>

                          <DropdownItem textValue="dropdown" className="h-2">
                            <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
                          </DropdownItem>

                          <DropdownItem
                            textValue="dropdown"
                            key={`delete-${ticket.ticketId}`}
                            className="btn btn-sm btn-ghost text-red-600"
                          >
                            <div className="flex justify-between">
                              <p> Delete ticket</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="#f24a4a"
                                  d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                                />
                              </svg>
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
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
      {printModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="flex flex-col p-10 w-[300px] rounded-2xl bg-white items-center justify-between gap-4">
            <div className="flex w-full justify-between">
              <h2 className="text-2xl font-semibold">Ticket</h2>
              <p
                onClick={() => {
                  setPrintModal(!printModal);
                }}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="w-5 h-5 hover:opacity-75 cursor-pointer"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </p>
            </div>
            <div className="bg-white shadow-black p-10 rounded-2xl">
              <div className="flex flex-col gap-3">
                <div className="btn btn-sm ">DUC - A1</div>
                <div className="btn btn-sm ">THINH - A2</div>
                <div className="btn btn-sm ">TAM - A3</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between p-3">
        <p className="font-medium">Total: {tickets.length} </p>
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

export default TicketTable;
