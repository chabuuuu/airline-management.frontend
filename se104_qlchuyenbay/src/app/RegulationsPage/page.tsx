"use client";
import { Rules } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";
const RegulationsPage = () => {
  const [rules, setRules] = useState<Rules>();

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
          ticketClass: dt.className,
          ticketPriceInterest: dt.priceBonusInterest,
        }));
        setSecondRegulation(newClass);
      } catch (e) {
        console.log(e);
      }
    };
    getAllTicketClass();

    const getRules = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/rules`,
        headers: {},
      };
      try {
        const response = await axios.request(config);

        const rd = response.data;
        setRules({
          minFlightDuration: rd.airportRules.minFlightDuration,
          maxIntermediateAirport: rd.airportRules.maxIntermediateAirport,
          minIntermediateAirportStopDelay:
            rd.airportRules.minIntermediateAirportStopDelay,
          maxIntermediateAirportStopDelay:
            rd.airportRules.maxIntermediateAirportStopDelay,
          minBookingTime: rd.bookingRules.minBookingTime,
          minCancelBookingTime: rd.bookingRules.minCancelBookingTime,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getRules();
  }, []);

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
          ticketClass: dt.className,
          ticketPriceInterest: dt.priceBonusInterest,
        }));
        setSecondRegulation(newClass);
      } catch (e) {
        console.log(e);
      }
    };
    getAllTicketClass();
  }, []);

  const [firstRegulation, setFirstRegulation] = useState<{
    miniumDuration: string;
    miniumMediateAiport: string;
  }>();

  const [secondRegulation, setSecondRegulation] = useState<
    {
      ticketClass: string;
      ticketPriceInterest: string;
    }[]
  >([]);
  const [tmpSecondR, setTmpSecondR] = useState<
    {
      ticketClass: string;
      ticketPriceInterest: string;
    }[]
  >([]);

  const handleCancel = () => {
    setTmpSecondR(secondRegulation);
  };
  useEffect(() => {
    handleCancel();
  });

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col p-10 w-full max-w-[1000px] rounded-2xl  bg-white ">
        <div className="flex justify-center ">
          <h1 className=" lg:text-4xl font-bold text-gray-800">QUY ĐỊNH</h1>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="text-xl font-semibold">Quy Định 1</p>
              </td>
              <td>
                <p className="mt-2 text-base  text-gray-600 max-w-[650px] ">
                  {" "}
                  Thời gian bay tối thiểu là {rules?.minFlightDuration} giờ. Có
                  tối đa {rules?.maxIntermediateAirport} sân bay trung gian với
                  thời gian dừng từ {rules?.minIntermediateAirportStopDelay} đến{" "}
                  {rules?.maxIntermediateAirportStopDelay} phút.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="text-xl font-semibold">Quy Định 2</h2>
              </td>
              <td>
                <p className="mt-2  text-base text-gray-600 max-w-[650px] ">
                  {" "}
                  Chỉ bán vé khi còn chỗ. Có {secondRegulation.length} hạng vé (
                  {secondRegulation
                    .map((regulation) => regulation.ticketClass)
                    .join(", ")}
                  ) . Vé{" "}
                  {secondRegulation.map((regulation, index) => (
                    <span key={index}>
                      <span>{regulation.ticketClass}</span> bằng{" "}
                      <span>{regulation.ticketPriceInterest}</span> giá vé gốc
                      {index !== secondRegulation.length - 1 && ", "}
                    </span>
                  ))}{" "}
                  . Mỗi chuyến bay có một giá vé riêng.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="text-xl font-semibold">Quy Định 3</h2>{" "}
              </td>
              <td>
                <p className="mt-2  text-base text-gray-600 max-w-[650px] ">
                  {" "}
                  Chỉ cho đặt vé chậm nhất {rules?.minBookingTime} ngày trước
                  khi khởi hành. Vào ngày khởi hành tất cả các phiếu đặt sẽ bị
                  hủy. Chỉ cho hủy vé {rules?.minCancelBookingTime} ngày trước
                  ngày khởi hành.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegulationsPage;
/**/
