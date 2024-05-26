import React from "react";
import CreateClassForm from "@/components/staff-components/CreateClassForm";
import axios from "axios";
import { useEffect, useState } from "react";

const RegulationsManage = () => {
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
        console.log(response);
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

  const [secondRegulationModal, setSecondRegulationModal] =
    useState<boolean>(false);

  const [thirdRegulation, setThirdRegulation] = useState<{
    timeBookedAtLeast: string;
  }>();
  console.log(secondRegulation);

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
              Có 10 sân bay. Thời gian bay tối thiểu là 30 phút. Có tối đa 2 sân
              bay trung gian với thời gian dừng từ 10 đến 20 phút.
            </td>
            <td>
              <button>
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
              Chỉ cho đặt vé chậm nhất 1 ngày trước khi khởi hành. Vào ngày khởi
              hành tất cả các phiếu đặt sẽ bị hủy
            </td>
            <td>
              <button>
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
      {secondRegulationModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Seat Flight</h3>

            <p className="mt-6">
              Chỉ bán vé khi còn chỗ. Có {secondRegulation.length} hạng vé (
              {secondRegulation
                .map((regulation) => regulation.ticketClass)
                .join(", ")}
              ) . Vé{" "}
              {secondRegulation.map((regulation, index) => (
                <span key={index}>
                  <span className="font-bold">{regulation.ticketClass}</span>{" "}
                  bằng{" "}
                  <span className="font-bold">
                    {regulation.ticketPriceInterest}
                  </span>{" "}
                  giá vé gốc
                  {index !== secondRegulation.length - 1 && ", "}
                </span>
              ))}{" "}
              . Mỗi chuyến bay có một giá vé riêng.
            </p>
            <div className="mt-5 collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-semibold">
                Change ticket class
              </div>
              <div className="collapse-content ">
                <div className="overflow-x-auto">
                  <table className="table flex justify-center ">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Class</th>
                        <th>Price Bonus Interest</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tmpSecondR.map((regulation, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{regulation.ticketClass}</td>
                          <td>
                            <input
                              type="text"
                              value={regulation.ticketPriceInterest}
                              onChange={(e) => {
                                const updatedRegulations = [
                                  ...secondRegulation,
                                ];
                                updatedRegulations[index].ticketPriceInterest =
                                  e.target.value;
                                setTmpSecondR(updatedRegulations);
                              }}
                            />
                          </td>
                          <td>
                            <button
                              className="text-sm btn-xs btn btn-ghost font-medium"
                              onClick={() => console.log(index)}
                            >
                              {" "}
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="btn btn-ghost "
                    onClick={() => {
                      handleCancel;
                      setSecondRegulationModal(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-ghost"
                    onClick={() => setSecondRegulationModal(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <CreateClassForm />

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSecondRegulationModal(false)}
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
