"use client";

import React from "react";
import CreateClassForm from "@/components/staff-components/CreateClassForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { Rules } from "@/type";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const RegulationsManage = () => {
  const { data: session } = useSession();

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
    setUpdateRulesData(rules);
  }, [rules]);
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

  const [secondRegulationModal, setSecondRegulationModal] =
    useState<boolean>(false);
  const [firstRegulationModal, setFirstRegulationModal] =
    useState<boolean>(false);
  const [thirdRegulationModal, setThirdRegulationModal] =
    useState<boolean>(false);

  const [thirdRegulation, setThirdRegulation] = useState<{
    timeBookedAtLeast: string;
  }>();

  const [updateRulesData, setUpdateRulesData] = useState<Rules>();

  const handleChangeInputRules = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changeMode || changeModeRule3) {
      const { name, value } = e.target;
      setUpdateRulesData((prevRules: any) => ({
        ...prevRules,
        [name]: Number(value),
      }));
    }
  };

  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [changeModeRule3, setChangeModeRule3] = useState<boolean>(false);

  const handleChangeRules = async () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/rules/modify`,
      headers: {
        Authorization: session?.user.token,
      },
      data: JSON.stringify(updateRulesData),
    };
    console.log(config);
    try {
      const response = await axios.request(config);
      console.log(response);
      toast.success("Update succesful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setChangeMode(!changeMode);
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

  return (
    <div className="overflow-x-auto mt-10 p-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Regulations</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td className="text-base font-semibold">Quy Định 1</td>
            <td className="text-base">
              Thời gian bay tối thiểu là {rules?.minFlightDuration} giờ. Có tối
              đa {rules?.maxIntermediateAirport} sân bay trung gian với thời
              gian dừng từ {rules?.minIntermediateAirportStopDelay} đến{" "}
              {rules?.maxIntermediateAirportStopDelay} phút.
            </td>
            <td>
              <button onClick={() => setFirstRegulationModal(true)}>
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
              </button>
            </td>
          </tr>
          {/* row 2 */}
          <tr>
            <td className="text-base font-semibold">Quy Định 2</td>
            <td className="text-base">
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
            </td>
            <td>
              <button onClick={() => setSecondRegulationModal(true)}>
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
              </button>
            </td>
          </tr>
          {/* row 3 */}
          <tr>
            <td className="text-base font-semibold">Quy Định 3</td>
            <td className="text-base">
              Chỉ cho đặt vé chậm nhất {rules?.minBookingTime} ngày trước khi
              khởi hành. Vào ngày khởi hành tất cả các phiếu đặt sẽ bị hủy. Chỉ
              cho hủy vé {rules?.minCancelBookingTime} ngày trước ngày khởi
              hành.
            </td>
            <td>
              <button
                onClick={() => setThirdRegulationModal(!thirdRegulationModal)}
              >
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
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {firstRegulationModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Airport Rules</h3>

            <table className="table flex justify-center ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {!changeMode ? (
                <tbody>
                  <tr>
                    <td>Thời gian bay tối thiểu:</td>
                    <td>{updateRulesData?.minFlightDuration} giờ</td>
                  </tr>
                  <tr>
                    <td>Số sân bay trung gian tối đa:</td>
                    <td>{updateRulesData?.maxIntermediateAirport} sân bay</td>
                  </tr>
                  <tr>
                    <td>Thời gian dừng tối thiểu:</td>
                    <td>
                      {updateRulesData?.minIntermediateAirportStopDelay} giờ
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian dừng tối đa:</td>
                    <td>
                      {updateRulesData?.maxIntermediateAirportStopDelay} giờ
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td>Thời gian bay tối thiểu:</td>
                    <td>
                      <input
                        type="text"
                        name="minFlightDuration"
                        value={updateRulesData?.minFlightDuration}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />
                      <span className="ml-3">giờ</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Số sân bay trung gian tối đa:</td>
                    <td>
                      <input
                        type="text"
                        name="maxIntermediateAirport"
                        value={updateRulesData?.maxIntermediateAirport}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />
                      <span className="ml-3">sân bay</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian dừng tối thiểu:</td>
                    <td>
                      <input
                        type="text"
                        name="minIntermediateAirportStopDelay"
                        value={updateRulesData?.minIntermediateAirportStopDelay}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />
                      <span className="ml-3">giờ</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian dừng tối đa:</td>
                    <td>
                      <input
                        type="text"
                        name="maxIntermediateAirportStopDelay"
                        value={updateRulesData?.maxIntermediateAirportStopDelay}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />
                      <span className="ml-3">giờ</span>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            <div className="modal-action">
              {!changeMode ? (
                <button
                  className="btn btn-sm"
                  onClick={() => setChangeMode(!changeMode)}
                >
                  Change Rule
                </button>
              ) : (
                <button
                  className="btn btn-sm bg-green-500 text-white"
                  onClick={() => handleChangeRules()}
                >
                  Save
                </button>
              )}

              <button
                className="btn btn-sm"
                onClick={() => {
                  setFirstRegulationModal(false);
                  setUpdateRulesData(rules);
                  setChangeMode(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {secondRegulationModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl p-10 rounded-2xl">
            <h3 className="font-bold text-2xl mb-10">Update Booking Rules</h3>

            <CreateClassForm />
            <div className="flex justify-between">
              <div className="mt-5 w-[300px] collapse bg-slate-100">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-semibold">
                  Update price interest
                </div>
                <div className="collapse-content ">
                  <div className="overflow-x-auto">
                    <table className="table flex justify-center ">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Class</th>
                          <th>Price Bonus Interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tmpSecondR.map((regulation, index) => (
                          <tr key={index}>
                            <td> {regulation.ticketClass}</td>

                            <td>
                              <input
                                type="text"
                                value={regulation.ticketPriceInterest}
                                className="input input-bordered input-sm w-[100px] max-w-xs"
                                onChange={(e) => {
                                  const updatedRegulations = [
                                    ...secondRegulation,
                                  ];
                                  updatedRegulations[
                                    index
                                  ].ticketPriceInterest = e.target.value;
                                  setTmpSecondR(updatedRegulations);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      className="btn btn-sm bg-green-500 text-white"
                      onClick={() => setSecondRegulationModal(false)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-action flex justify-end flex-col">
                <button
                  className="btn btn-sm"
                  onClick={() => setSecondRegulationModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {thirdRegulationModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Airport Rules</h3>

            <table className="table flex justify-center ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {!changeModeRule3 ? (
                <tbody>
                  <tr>
                    <td>Thời gian đặt vé chậm nhất trước khi cất cánh: </td>
                    <td>{updateRulesData?.minBookingTime} ngày</td>
                  </tr>
                  <tr>
                    <td>Thời gian hủy vé chậm nhất trước khi cất cánh: </td>
                    <td>{updateRulesData?.minCancelBookingTime} ngày</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td>Thời gian đặt vé chậm nhất trước khi cất cánh: </td>
                    <td>
                      <input
                        type="text"
                        name="minBookingTime"
                        value={updateRulesData?.minBookingTime}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />
                      <span className="ml-3">ngày</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian hủy vé chậm nhất trước khi cất cánh: </td>
                    <td>
                      <input
                        type="text"
                        name="minCancelBookingTime"
                        value={updateRulesData?.minCancelBookingTime}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />

                      <span className="ml-3">ngày</span>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            <div className="modal-action">
              {!changeModeRule3 ? (
                <button
                  className="btn btn-sm"
                  onClick={() => setChangeModeRule3(!changeModeRule3)}
                >
                  Change Rule
                </button>
              ) : (
                <button
                  className="btn btn-sm text-white bg-green-500"
                  onClick={() => handleChangeRules()}
                >
                  Save
                </button>
              )}

              <button
                className="btn btn-sm"
                onClick={() => {
                  setThirdRegulationModal(!thirdRegulationModal);
                  setUpdateRulesData(rules);
                  setChangeModeRule3(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegulationsManage;
