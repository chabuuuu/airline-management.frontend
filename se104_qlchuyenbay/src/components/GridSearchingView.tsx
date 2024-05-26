import Card from "@/components/Card";
import React, { useState } from "react";
type RowType = {
  flightId: string;
  logo: string;
  brand: string;
  date: string;
  time: string;
  duration?: string;
  departure: string;
  airportStart?: string;
  airportEnd?: string;
  arrival: string;
  seat: string;
  placed?: string;
  status: string;
  price: string | number;
  available: string;
};
const MAX_LENGTH_COL = 9;

const GridSearchingView: React.FC<{ allFlight: RowType[] }> = ({
  allFlight,
}) => {
  const [page, setPage] = useState<number>(1);
  return (
    <div>
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {allFlight?.map((carddata, index) => {
          if (
            index >= MAX_LENGTH_COL * (page - 1) &&
            index < MAX_LENGTH_COL * page
          ) {
            return <Card key={index} {...carddata} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="flex justify-between p-3 mt-5">
        <p className="font-medium">Total flight: {allFlight.length} </p>
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

export default GridSearchingView;
