"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AirPlaneDetail from "@/components/AirPlaneDetail";

const DetailPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setDeparture(params.departure || "");
    setDestination(params.destination || "");
    setDate(params.date || "");
    setTime(params.time || "");
    setBrand(params.brand || "");
    setLogo(params.logo || "");
    setPrice(params.price || "");
  }, [searchParams]);

  const baseSeatChoose = {
    seat: "",
    class: "",
    price: "",
  };
  const [chooseSeats, setChooseSeats] = useState<
    {
      seat: string;
      class: string;
      price: string;
    }[]
  >([baseSeatChoose]);

  const handleSeatSelection = (seat: string, seatClass: string) => {
    const coef = seatClass === "Business" ? 1.4 : 1;

    if (!chooseSeats.find((selectedSeat) => selectedSeat.seat === seat)) {
      const newSeat = {
        seat,
        class: seatClass,
        price: (parseInt(price) * coef).toString(),
      };
      const updatedSeats = [...chooseSeats];
      updatedSeats[updatedSeats.length - 1] = newSeat;
      setChooseSeats(updatedSeats);
    }
  };

  const handleChooseMoreSeat = () => {
    console.log(chooseSeats);
    setChooseSeats([...chooseSeats, baseSeatChoose]);
  };

  const renderSeatGrid = () => {
    const businessCols = ["1", "2", "3"];
    const economyCols = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const rows = ["A", "B", "C", "D"];

    return rows.map((row) => (
      <div key={row} className="flex justify-between items-center">
        {businessCols.map((col) => (
          <div
            key={col}
            className={`seat w-10 h-6 flex justify-center items-center rounded-lg bg-gray-200 m-3 cursor-pointer ${
              chooseSeats.find(
                (selectedSeat) => selectedSeat.seat === `${row}${col}`
              )
                ? "bg-yellow-500 text-white"
                : "text-black"
            }`}
            onClick={() => handleSeatSelection(`${row}${col}`, "Business")}
          >
            {row}
            {col}
          </div>
        ))}
        <div className="divider sm:divider-horizontal"></div>
        {economyCols.map((col) => (
          <div
            key={col}
            className={`seat w-10 h-6 flex justify-center items-center rounded-lg bg-gray-200 m-3 cursor-pointer ${
              chooseSeats.find(
                (selectedSeat) => selectedSeat.seat === `${row}${col}`
              )
                ? "bg-green-500 text-white"
                : "text-black"
            }`}
            onClick={() => handleSeatSelection(`${row}${col}`, "Economy")}
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
      <div className="flex flex-row justify-between w-full">
        <div className="mt-5 ml-5 h-full w-full">
          <div className="card bg-white h-80 w-full mb-5 p-5">
            <div className="flex items-center">
              <div className="flex items-center mb-4">
                <img
                  src={logo}
                  alt={brand}
                  className="w-12 object-cover mr-4"
                />
                <h2 className="text-2xl font-semibold">{brand}</h2>
              </div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-bold text-gray-600">CHUYẾN BAY/FLIGHT</h3>
                <p className="text-xl font-bold">AIR2056</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">THỜI GIAN/TIME</h3>
                <p className="text-xl">{time}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">NGÀY/DATE</h3>
                <p className="text-xl">{date}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-900 text-2xl font-semibold mb-3">
                {departure} - {destination}
              </div>
              <div className="text-base text-gray-500">
                Duration: 2 hours 15 minutes
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-900 text-2xl font-bold">
                {price} VND
              </div>
            </div>
          </div>
          <div className="card bg-white w-full p-5">
            <div className="flex justify-between">
              <span className="font-semibold ml-2 text-2xl">Sơ đồ ghế</span>
              <AirPlaneDetail />
            </div>
            {renderSeatGrid()}
          </div>
        </div>

        <div className="flex  justify-between flex-col items-center m-5 p-5 min-w-72 h-fit bg-white rounded-2xl shadow">
          <span className="font-semibold text-2xl mb-4">Chỗ ngồi đã chọn</span>
          <div className="m-5 max-h-[400px] overflow-y-scroll pl-3">
            {chooseSeats.map((param, index) => (
              <div
                key={index}
                className="card bg-white h-40 w-64 p-4 drop-shadow-lg mb-5"
              >
                <span className="font-semibold text-lg mb-4">
                  Ghế: {param.seat}
                </span>
                <span className="font-semibold text-lg mb-4">
                  Hạng: {param.class}
                </span>
                <span className="font-semibold text-lg mb-4">
                  Giá: {param.price}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleChooseMoreSeat}
            className="btn btn-ghost flex justify-center items-center mb-5 w-full drop-shadow-md bg-white rounded-full "
          >
            <svg
              className="w-12 h-12"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
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
            href={{
              pathname: "/PayingPage",
              query: {
                logo: logo,
                brand: brand,
                date: date,
                time: time,
                departure: departure,
                destination: destination,
                chooseSeat: JSON.stringify(chooseSeats),
              },
            }}
            className="btn bg-orange-500 text-white w-full rounded-full"
          >
            Tiếp tục thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
