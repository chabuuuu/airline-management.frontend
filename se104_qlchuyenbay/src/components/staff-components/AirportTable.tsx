import React, { useState } from "react";

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
