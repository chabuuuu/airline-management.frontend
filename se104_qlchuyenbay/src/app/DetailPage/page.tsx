"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useState } from "react";

const DetailPage = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelection = (seat: any) => {
    setSelectedSeat(seat);
  };

  const renderSeatGrid = () => {
    const cols = ["A", "B", "C", "D", "E", "F", "G"];
    const rows = ["1", "2", "3", "4"];

    return rows.map((row) => (
      <div key={row} className="flex justify-center items-center">
        {cols.map((col) => (
          <div
            key={col}
            className={`seat w-10 h-6 flex justify-center items-center rounded-lg bg-gray-200 m-4 cursor-pointer ${
              selectedSeat === `${row}${col}`
                ? "bg-green-500 text-white"
                : "text-black"
            }`}
            onClick={() => handleSeatSelection(`${row}${col}`)}
          >
            {row}
            {col}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-row justify-between w-full ">
        <div className="mt-5 ml-5 h-full w-full">
          <div className="card bg-white h-80 w-full mb-5 p-5">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <div
                  className="bg-cover h-10 w-10"
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/564x/7a/ec/17/7aec17946661a88378269d0b642b61f3.jpg')",
                  }}
                ></div>
              </div>
              <span className="font-semibold ml-2 text-2xl">
                VietNamAirlines
              </span>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-bold text-gray-600">CHUYẾN BAY/FLIGHT</h3>
                <p className="text-xl font-bold">AIR2056</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">THỜI GIAN/TIME</h3>
                <p className="text-xl">16:20</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">NGÀY/DATE</h3>
                <p className="text-xl">21/4/2024</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-900 text-2xl font-semibold mb-3">
                HoChiMinh (HCM) - HaNoi (HN)
              </div>
              <div className="text-base text-gray-500">
                Duration: 2 hours 15 minutes
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-900 text-2xl font-bold">
                2.000.0000 VND
              </div>
            </div>
          </div>
          <div className="card bg-white h-80 w-full p-5">
            <span className="font-semibold ml-2 text-2xl">Sơ đồ ghế</span>
            {renderSeatGrid()}
          </div>
        </div>
        <div className="flex justify-between flex-col items-center m-5 p-5 h-96 min-h-96 min-w-72 bg-white rounded-2xl shadow">
          <span className="font-semibold text-2xl mb-4">Chỗ ngồi đã chọn</span>
          <div className="card bg-white h-40 w-64 p-4 drop-shadow-lg">
            <span className="font-semibold text-lg mb-4">
              Ghế: {selectedSeat}
            </span>
            <span className="font-semibold text-lg mb-4">Hạng:</span>
            <span className="font-semibold text-lg mb-4">Giá:</span>
          </div>
          <button className="btn btn-ghost flex justify-center items-center w-full  drop-shadow-md bg-white rounded-full ">
            <svg
              className="w-12 h-12"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="200px"
              width="200px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Circle_Plus">
                <g>
                  <path d="M15,12.5H12.5V15a.5.5,0,0,1-1,0V12.5H9a.5.5,0,0,1,0-1h2.5V9a.5.5,0,0,1,1,0v2.5H15A.5.5,0,0,1,15,12.5Z"></path>
                </g>
              </g>
            </svg>
          </button>
          <Link
            href={"/PayingPage"}
            className="btn btn-ghost bg-orange-500 text-white w-full rounded-full"
          >
            {" "}
            Tiếp tục thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
