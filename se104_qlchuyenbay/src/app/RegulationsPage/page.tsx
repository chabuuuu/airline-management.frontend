"use client";
import axios from "axios";
import { useEffect, useState } from "react";
const RegulationsPage = () => {
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

  const [secondRegulationModal, setSecondRegulationModal] =
    useState<boolean>(false);

  const [thirdRegulation, setThirdRegulation] = useState<{
    timeBookedAtLeast: string;
  }>();
  console.log(secondRegulation);

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col p-10 w-5/6 rounded-2xl  bg-white ">
        <div className="flex justify-center ">
          <h1 className=" lg:text-4xl font-bold text-gray-800">QUY ĐỊNH</h1>
        </div>

        <ul className="divide-y divide-gray-200">
          <li className="flex justify-between items-center py-4">
            <p className="text-xl font-semibold">Quy Định 1</p>
            <p className="mt-2 text-gray-600 max-w-[750px]">
              {" "}
              Có 10 sân bay. Thời gian bay tối thiểu là 30 phút. Có tối đa 2 sân
              bay trung gian với thời gian dừng từ 10 đến 20 phút.,
            </p>
          </li>
          <li className="flex justify-between items-center py-4">
            <h2 className="text-xl font-semibold">Quy Định 2</h2>
            <p className="mt-2 text-gray-600 max-w-[750px]">
              {" "}
              Chỉ bán vé khi còn chỗ. Có 2 hạng vé (1, 2). Vé hạng 1 bằng 105%
              của đơn giá, vé hạng 2 bằng với đơn giá, mỗi chuyến bay có một giá
              vé riêng.,
            </p>
          </li>
          <li className="flex justify-between items-center py-4">
            <h2 className="text-xl font-semibold">Quy Định 3</h2>
            <p className="mt-2 text-gray-600 max-w-[750px]">
              {" "}
              Chỉ cho đặt vé chậm nhất 1 ngày trước khi khởi hành. Vào ngày khởi
              hành tất cả các phiếu đặt sẽ bị hủy
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegulationsPage;
/**/
