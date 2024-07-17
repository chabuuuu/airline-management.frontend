import Card from "@/components/Card";
import { FlightType } from "@/type";
import React, { useState } from "react";

const MAX_LENGTH_COL = 9;
const MAX_PAGE_BUTTONS = 3;

const GridSearchingView: React.FC<{ allFlight: FlightType[] }> = ({
  allFlight,
}) => {
  //Page pavagation
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(allFlight.length / MAX_LENGTH_COL);
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  return (
    <div data-testid="grid">
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {allFlight?.map((flight, index) => {
          if (
            index >= MAX_LENGTH_COL * (page - 1) &&
            index < MAX_LENGTH_COL * page
          ) {
            return <Card key={index} flight={flight} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="flex justify-between p-3 mt-5">
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

export default GridSearchingView;
