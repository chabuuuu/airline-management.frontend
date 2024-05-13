import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

type AirportType = {
  airportId?: string;
  airportCode?: string;
  time?: string;
  airportName?: string;
  city: string;
  country: string;
  description: string;
  status: string;
  available?: string;
};

const AirportTable: React.FC<{ allFlight: AirportType[] }> = ({
  allFlight,
}) => {
  const MAX_LENGTH_COL = 7;
  const [page, setPage] = useState<number>(1);

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Airport Code</th>
              <th>Airport Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Description</th>
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
                        <div>
                          <div className="font-bold">
                            {cardData.airportCode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">{cardData.airportName}</span>
                    </td>
                    <td>
                      <span className="text-sm">{cardData.city}</span>
                    </td>
                    <td>
                      <span className="font-semibold">{cardData.country}</span>
                    </td>
                    <td>
                      <span className="font-medium">
                        {cardData.description}
                      </span>
                    </td>
                    <td>
                      <button
                        className={
                          cardData.status === "Đang hoạt động"
                            ? "btn btn-ghost text-green-400 btn-xs"
                            : "btn btn-ghost  text-red-400 btn-xs"
                        }
                      >
                        {cardData.status}
                      </button>
                    </td>
                    <td>
                      <Dropdown key={cardData.airportId}>
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
                          aria-label="Static Actions"
                          className="bg-white rounded-xl drop-shadow-lg p-3"
                        >
                          <DropdownItem
                            //onClick={() => setCustomerActivityModal(true)}
                            textValue="dropdown"
                            key={`detail-${cardData.airportId}`}
                            className="btn btn-sm btn-ghost"
                          >
                            <div className="flex justify-between">
                              <p> Details Activity</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 192 512"
                                className="w-4 h-4"
                              >
                                <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                              </svg>
                            </div>
                          </DropdownItem>

                          <DropdownItem
                            //onClick={() => setCustomerChangeRoleModal(true)}
                            textValue="dropdown"
                            key={`upload-${cardData.airportId}`}
                            className="btn btn-sm btn-ghost"
                          >
                            <div className="flex justify-between">
                              <p>Upload picture</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 512 512"
                              >
                                <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                              </svg>
                            </div>
                          </DropdownItem>
                          <DropdownItem textValue="dropdown" className="h-2">
                            <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
                          </DropdownItem>

                          <DropdownItem
                            textValue="dropdown"
                            key={`delete-${cardData.airportId}`}
                            className="btn btn-sm btn-ghost text-red-600"
                          >
                            <div className="flex justify-between">
                              <p> Delete airport</p>
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

      <div className="flex justify-between p-3">
        <p className="font-medium">Total airport: {allFlight.length} </p>
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

export default AirportTable;
