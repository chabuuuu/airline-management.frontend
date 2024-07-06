import axios from "axios";
import React, { useState } from "react";
import HandleSeatModal from "./HandleSeatModal";
import { FlightType } from "@/type";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 5;

const FlightTable: React.FC<{ allFlight: FlightType[] }> = ({ allFlight }) => {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(allFlight.length / MAX_LENGTH_COL);
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [showSeatModal, setShowSeatModal] = useState<boolean>(false);

  const [status, setStatus] = useState<string | null>(null);
  const [selectedFlightId, setSelectedFlightId] = useState<string>("");
  const [handleSave, setHandleSave] = useState<boolean | null>(false);

  const { data: session } = useSession();

  const changStatus = async () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/flight/${status}/${selectedFlightId}`,
      headers: {
        Authorization: session?.user.token,
      },
    };
    try {
      const response = await axios.request(config);
      console.log(response);
      toast.success("Changed succesful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.refresh();
    } catch (e: any) {
      console.log(e);
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

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const deleteFlightById = async (id: string) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/flight/${id}`,
      headers: {
        Authorization: session?.user.token,
      },
    };
    try {
      const response = await axios.request(config);
      console.log(response);
      toast.success("Delete successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setInterval(() => {
      //   window.location.reload();
      // }, 3000);
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

  const [updateFlightModal, setUpdateFlightModal] = useState<boolean>(false);
  const [flightIdModal, setFlightIdModal] = useState<string>("");
  const [descriptionChange, setDescriptionChange] = useState<string>("");

  const updateFlight = async () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/flight/${flightIdModal}`,
      headers: {
        Authorization: session?.user.token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        description: descriptionChange,
      }),
    };
    try {
      const response = await axios.request(config);

      toast.success("Update successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDescriptionChange("");
      router.refresh();
    } catch (e: any) {
      console.log(e);
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

  const [intermediateModal, setIntermediateModal] = useState<boolean>(false);
  const flightIntermediate = allFlight.find(
    (flight) => flight.flightId === selectedFlightId
  );

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Flight</th>
              <th>Departure</th>
              <th></th>
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
                            <picture>
                              <img src={cardData.logo} alt="Avatar" />
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
                    </td>
                    <td>
                      <span className="font-semibold">
                        {cardData.departure}
                      </span>
                      <br />
                      <span className="text-sm">{cardData.airportStart}</span>
                    </td>
                    <td>
                      <span
                        className="btn btn-xs btn-ghost"
                        onClick={() => {
                          setIntermediateModal(!intermediateModal);
                          setSelectedFlightId(cardData.flightId);
                        }}
                      >
                        -
                      </span>
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
                          className={`btn btn-ghost btn-xs font-medium ${
                            cardData.seatsAvailable > 0
                              ? "text-green-400"
                              : "text-rose-400"
                          }`}
                        >
                          {cardData.seatsAvailable}/{cardData.seatsTotal}
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
                      <td>
                        <Dropdown key={cardData.flightId}>
                          <DropdownTrigger>
                            <Button variant="bordered">
                              <svg
                                className="w-4 h-4 hover:opacity-50 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 50"
                                fill="none"
                              >
                                <circle cx="25" cy="25" r="25" fill="#2F2F2F" />
                                <circle
                                  cx="100"
                                  cy="25"
                                  r="25"
                                  fill="#2F2F2F"
                                />
                                <circle
                                  cx="175"
                                  cy="25"
                                  r="25"
                                  fill="#2F2F2F"
                                />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            className="bg-white rounded-xl drop-shadow-lg p-3"
                          >
                            <DropdownItem
                              textValue="dropdown"
                              key={`update-${cardData.flightId}`}
                              className="btn btn-sm btn-ghost "
                              value={cardData.flightId}
                              onClick={() => {
                                setFlightIdModal(cardData.flightId);
                                setUpdateFlightModal(!updateFlightModal);
                                if (cardData?.description)
                                  setDescriptionChange(cardData?.description);
                              }}
                            >
                              <div className="flex justify-between">
                                <p>Update Flight</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="w-4 h-4"
                                >
                                  <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                </svg>
                              </div>
                            </DropdownItem>
                            <DropdownItem textValue="dropdown" className="h-2">
                              <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
                            </DropdownItem>

                            <DropdownItem
                              textValue="dropdown"
                              key={`delete-${cardData.flightId}`}
                              className="btn btn-sm btn-ghost text-red-600"
                              value={cardData.flightId}
                              onClick={() =>
                                deleteFlightById(cardData.flightId)
                              }
                            >
                              <div className="flex justify-between">
                                <p>Delete Flight</p>
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
      {intermediateModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-black p-10 rounded-2xl">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Intermediate flight</h2>
                <p
                  onClick={() => {
                    setIntermediateModal(!intermediateModal);
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
              <div className="">
                <table className="table flex justify-center ">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Airport</th>
                      <th>Duration</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flightIntermediate?.intermediate &&
                      flightIntermediate?.intermediate.map((it, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>
                            <div>{it.airportId}</div>
                          </td>
                          <td>
                            <div> {it.duration}</div>
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
        </div>
      )}
      {updateFlightModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-black p-10 rounded-2xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">
                Change flight description
              </h2>
              <p
                onClick={() => {
                  setUpdateFlightModal(!updateFlightModal);
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
            <table className="table flex justify-center ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        value={descriptionChange}
                        className="textarea textarea-bordered textarea-sm"
                        onChange={(e) => setDescriptionChange(e.target.value)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setUpdateFlightModal(!updateFlightModal)}
              >
                Close
              </button>
              <button
                onClick={updateFlight}
                className="btn bg-green-500 btn-sm text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showStatusModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-black p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Flight Status</h3>

            <div>
              <select
                value={status ?? "set-finish"}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="select select-bordered select-sm w-full mt-5"
              >
                <option value="set-finish">Success</option>
                <option value="set-in-progress">In Progress</option>
                <option value="set-cancel">Cancel</option>
                <option value="set-not-started">Not Started</option>
              </select>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setShowStatusModal(false)}
              >
                Close
              </button>
              <button
                className="btn bg-green-500 btn-sm text-white"
                onClick={changStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showSeatModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Seat Flight </h3>

            <div className="flex flex-col justify-between">
              <HandleSeatModal flightId={selectedFlightId} />
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setShowSeatModal(false)}
              >
                Close
              </button>
              <button
                className="btn bg-green-500 btn-sm text-white"
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
