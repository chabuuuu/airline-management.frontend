"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AirPlaneDetail from "@/components/AirPlaneDetail";
import axios from "axios";

const data = [
  {
    seatId: "A1",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "A2",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "A3",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "A4",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "A5",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "A6",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "A7",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "A8",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B1",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B2",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B3",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B4",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B5",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B6",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B7",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "B8",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C1",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C2",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C3",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C4",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C5",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C6",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C7",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "C8",

    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D1",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D2",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D3",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D4",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D5",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D6",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D7",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "D8",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E1",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E2",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E3",
    class: "LV2",
    isEmpty: false,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E4",
    class: "LV2",
    isEmpty: false,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E5",
    class: "LV2",
    isEmpty: false,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E6",
    class: "LV2",
    isEmpty: false,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E7",
    class: "LV2",
    isEmpty: false,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "E8",
    class: "LV2",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.00",
      color: "blue",
    },
  },
  {
    seatId: "F1",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
  {
    seatId: "F2",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
  {
    seatId: "F3",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
  {
    seatId: "F4",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
  {
    seatId: "F5",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
  {
    seatId: "F6",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
  {
    seatId: "F7",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
  {
    seatId: "F8",
    class: "LV1",
    isEmpty: true,
    ticketClass: {
      priceBonusInterest: "0.5",
      color: "blue",
    },
  },
];
const DetailPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [flightId, setFlightId] = useState<string>("");
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

    setFlightId(params.flightId || "");
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
    priceBonusInterest: "",
    price: "",
  };
  const [chooseSeats, setChooseSeats] = useState<
    {
      seat: string;
      class: string;
      priceBonusInterest: string;
      price: string;
    }[]
  >([baseSeatChoose]);

  const handleSeatSelection = (
    seat: string,
    seatClass: string,
    priceBonusInterest: string
  ) => {
    if (!chooseSeats.find((selectedSeat) => selectedSeat.seat === seat)) {
      const newSeat = {
        seat,
        class: seatClass,
        priceBonusInterest: priceBonusInterest,
        price: (
          parseFloat(price) *
          (1 + parseFloat(priceBonusInterest))
        ).toString(),
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

  const [alreadySelectedSeats, setAlreadySelectedSeats] = useState<
    {
      seatId: string;
      class: string;
      color: string;
      priceBonusInterest: string;
      selected: boolean;
    }[]
  >(
    data.map((seat: any) => ({
      seatId: seat.seatId,
      class: seat.class,
      color: seat.ticketClass.color,
      priceBonusInterest: seat.ticketClass.priceBonusInterest,
      selected: !seat.isEmpty,
    }))
  );

  useEffect(() => {
    const getSeatOfAirplane = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/seat-flight/seat-list?flightId=13`;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const seatData = response.data.data;

        console.log(seatData);
        console.log(flightId);

        // setAlreadySelectedSeats((prevSeats) => {
        //   const newSeats = seatData.map((seat: any) => ({
        //     seatId: seat.seatId,
        //     class: seat.class,
        //     color: seat.ticketClass.color,
        //     selected: seat.isEmpty,
        //   }));

        //   const uniqueSeats = newSeats.filter((newSeat: any) => {
        //     return !prevSeats.some(
        //       (prevSeat) => prevSeat.seatId === newSeat.seatId
        //     );
        //   });

        //   return [...prevSeats, ...uniqueSeats];
        // });
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    getSeatOfAirplane();
  }, []);

  const renderSeat = (seat: {
    seatId: string;
    class: string;
    priceBonusInterest: string;
    color: string;
    selected: boolean;
  }) => {
    let seatClassName =
      "seat text-sm font-light w-8 h-6 flex justify-center items-center rounded-lg m-2 cursor-pointer";
    let seatBgColor = "bg-gray-200";
    let textColor = "text-black";

    if (!seat.selected) {
      if (seat.class === "LV2") {
        seatBgColor = chooseSeats.find(
          (selectedSeat) => selectedSeat.seat === seat.seatId
        )
          ? "bg-green-500"
          : "bg-gray-200";
      } else {
        seatBgColor = chooseSeats.find(
          (selectedSeat) => selectedSeat.seat === seat.seatId
        )
          ? "bg-yellow-500"
          : "bg-gray-200";
      }
      textColor = "text-white";
    } else {
      seatClassName += " bg-indigo-500 text-white";
    }

    return (
      <div className="flex justify-between" key={seat.seatId}>
        <div
          className={`${seatClassName} ${seatBgColor} ${textColor}`}
          onClick={() => {
            if (!seat.selected) {
              console.log(seat.priceBonusInterest);
              handleSeatSelection(
                seat.seatId,
                seat.class,
                seat.priceBonusInterest
              );
            }
          }}
        >
          {seat.seatId}
        </div>
      </div>
    );
  };

  const renderSeatGrid = () => {
    const numRows = 6;

    return Array.from({ length: numRows }, (_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="seat-row flex w-full justify-between items-center"
      >
        {Array.from(
          { length: alreadySelectedSeats.length / 6 },
          (_, seatIndex) => {
            const seatNumber = seatIndex + 1;
            const seatLabel = String.fromCharCode(65 + rowIndex) + seatNumber;
            const seat = alreadySelectedSeats.find(
              (seat) => seat.seatId === seatLabel
            );
            if (!seat) {
              return null;
            }
            return renderSeat(seat);
          }
        )}
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

        <div className="flex w-full justify-between flex-col items-center m-5 p-5 max-w-72 h-fit bg-white rounded-2xl shadow">
          <span className="font-semibold text-2xl mb-4">
            Chỗ ngồi đã chọn: {chooseSeats.length}
          </span>
          <div className=" max-h-[450px] w-full overflow-y-scroll pl-2   scroll-p-2">
            {chooseSeats.map((param, index) => (
              <div
                key={index}
                className="flex flex-col bg-white h-32 w-full p-4 drop-shadow-lg mb-5 rounded-2xl"
              >
                <span className="font-semibold text-lg mb-2">
                  Ghế: {param.seat}
                </span>
                <span className="font-semibold text-lg mb-2 ">
                  Hạng: {param.class}
                </span>
                <span className="font-semibold text-lg mb-2 ">
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
