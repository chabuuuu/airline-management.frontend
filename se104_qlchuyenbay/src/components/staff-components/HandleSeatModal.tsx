"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

type Props = {
  flightId: string;
};

const HandleSeatModal: React.FC<Props> = ({ flightId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getSeatOfAirplane = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/seat-flight/seat-list?flightId=${flightId}`;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const seatData = response.data.data;
        setAlreadySelectedSeats((prevSeats) => {
          const newSeats = seatData.map((seat: any) => ({
            seatId: seat.seatId,
            class: seat.class,
            color: seat.ticketClass.color,
            selected: !seat.isEmpty,
          }));

          const uniqueSeats = newSeats.filter((newSeat: any) => {
            return !prevSeats.some(
              (prevSeat) => prevSeat.seatId === newSeat.seatId
            );
          });

          return [...prevSeats, ...uniqueSeats];
        });
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    getSeatOfAirplane();
  }, [flightId]);

  const [alreadySelectedSeats, setAlreadySelectedSeats] = useState<
    {
      seatId: string;
      class: string;
      color: string;
      priceBonusInterest: string;
      selected: boolean;
    }[]
  >([]);

  const [chooseSeats, setChooseSeats] = useState<
    {
      seat: string;
      class: string;
      priceBonusInterest: string;
      price: string;
    }[]
  >([]);
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
          parseFloat("125000") *
          (1 + parseFloat(priceBonusInterest))
        ).toString(),
      };
      setChooseSeats([...chooseSeats, newSeat]);
    }
  };

  const handleUnchecked = (seatId: string) => {
    return () => {
      const updatedSeats = chooseSeats.filter((seat) => seat.seat !== seatId);
      setChooseSeats(updatedSeats);
    };
  };

  const renderSeat = (seat: {
    seatId: string;
    class: string;
    priceBonusInterest: string;
    color: string;
    selected: boolean;
  }) => {
    let seatClassName =
      "grid seat text-sm font-light w-8 h-6 flex justify-center items-center rounded-lg m-2 cursor-pointer";
    let seatBgColor = "bg-gray-200";
    let textColor = "text-black";

    if (!seat.selected) {
      if (seat.class === "LV2") {
        seatBgColor = chooseSeats.find(
          (selectedSeat) => selectedSeat.seat === seat.seatId
        )
          ? "bg-blue-500"
          : "bg-seat-blue";
      } else {
        seatBgColor = chooseSeats.find(
          (selectedSeat) => selectedSeat.seat === seat.seatId
        )
          ? "bg-red-500"
          : "bg-red-200";
      }
      textColor = "text-white";
    } else {
      seatClassName += " bg-gray-500 text-white";
    }

    return (
      <div className="flex justify-between" key={seat.seatId}>
        <div className="indicator">
          {chooseSeats.find((choose) => seat.seatId === choose.seat) && (
            <span
              onClick={handleUnchecked(seat.seatId)}
              className="indicator-item mt-1 mr-1 cursor-pointer hover:bg-slate-500 badge bg-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-2 h-2"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M9.68195 1.19689C10.2677 0.611104 11.2175 0.611104 11.8033 1.19689V1.19689C12.3891 1.78268 12.3891 2.73242 11.8033 3.31821L3.31799 11.8035C2.73221 12.3893 1.78246 12.3893 1.19667 11.8035V11.8035C0.610887 11.2177 0.610887 10.268 1.19667 9.68217L9.68195 1.19689Z"
                  fill="white"
                />
                <path
                  d="M11.8033 9.68202C12.3891 10.2678 12.3891 11.2175 11.8033 11.8033V11.8033C11.2175 12.3891 10.2678 12.3891 9.68197 11.8033L1.19669 3.31805C0.610905 2.73227 0.610905 1.78252 1.19669 1.19673V1.19673C1.78248 0.610947 2.73223 0.610947 3.31801 1.19673L11.8033 9.68202Z"
                  fill="white"
                />
              </svg>
            </span>
          )}

          <div
            className={`${seatClassName} ${seatBgColor} ${textColor}`}
            onClick={() => {
              if (changeCollapse) {
                if (!seat.selected) {
                  handleSeatSelection(
                    seat.seatId,
                    seat.class,
                    seat.priceBonusInterest
                  );
                }
              }
            }}
          >
            {seat.seatId}
          </div>
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

  const [ticketColorClasses, setTicketColorClasses] = useState<
    {
      class: string;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    const getAllTicketClass = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/ticket-class/list`,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data.data;
        const newClass = responseData.map((dt: any) => ({
          class: dt.className,
          color: dt.color,
        }));
        setTicketColorClasses(newClass);
      } catch (e) {
        console.log(e);
      }
    };
    getAllTicketClass();
  }, []);

  const [classToChange, setClassToChange] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);

  const changeSeatClass = async () => {
    let listSeat = chooseSeats.map((s) => s.seat);
    let data = {
      flightId: flightId,
      seatIdList: listSeat,
      class: classToChange,
    };

    try {
      const response = await fetch(`/api/auth/change-class`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const mss = await response.json();
      console.log(mss);

      if (response.status !== 200) {
        mss.message.message.map((m: any) => {
          toast.error(m || "An error occurred", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      } else {
        toast.success("Changed successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        startTransition(() => {
          setChooseSeats([]);
          // Refresh the current route and fetch new data from the server without
          // losing client-side browser or React state.
          router.refresh();
        });

        // setInterval(() => {
        //   window.location.reload();
        // }, 3000);
      }
    } catch (e: any) {
      toast.error("An error occurred", {
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

  // useEffect(() => {
  //   if (isChange && chooseSeats.length > 0 && classToChange) {
  //     changeSeatClass();
  //   }
  // }, [isChange, chooseSeats, classToChange]);
  const [changeCollapse, setChangeCollapse] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-col justify-between">
        <div className="flex justify-end gap-2 items-center">
          {ticketColorClasses.map((type, idx) => (
            <div
              className={`badge text-white bg-${type.color}-500 hover:opacity-70 m-2`}
              key={idx}
            >
              Class: {type.class}
            </div>
          ))}

          <div
            key="s"
            className="badge text-white bg-gray-500 hover:opacity-70 m-2`"
          >
            Selected
          </div>
        </div>
        <div>{renderSeatGrid()}</div>

        <div className="mt-5">
          <div className="collapse bg-slate-100">
            <input
              type="checkbox"
              onClick={() => {
                setChangeCollapse(!changeCollapse);
                setChooseSeats([]);
              }}
            />
            <div className="collapse-title text-xl font-semibold">
              Change seat class
            </div>
            <div className="collapse-content ">
              <div className=" rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-5">
                  <div className="font-semibold">
                    <p className="w-[90px]">Seat select </p>
                    <p className="font-bold text-xl">{chooseSeats.length}</p>
                  </div>
                  <label className="form-control w-full max-w-xs">
                    <select
                      className="select select-bordered"
                      onChange={(e) => setClassToChange(e.target.value)}
                    >
                      <option disabled value="">
                        Choose class you want to change to
                      </option>

                      {ticketColorClasses.map((type, idx) => (
                        <option key={idx} value={type.class}>
                          {type.class}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    onClick={() => {
                      changeSeatClass();
                    }}
                    className="btn btn-ghost"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleSeatModal;
