import Image from "next/image";
import { useState } from "react";

export default function Ticket() {
  const [formData, setFormData] = useState({
    fullName: "NGUYEN VAN A ",
    phoneNumber: "012345678",
    email: "123@gmail.com",
    luggage: "20 kg",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <div className="bg-white rounded-3xl shadow-md max-w-3xl">
        <div className="flex rounded-t-3xl p-2 bg-teal-600 justify-between items-center border-b ">
          <div className="flex items-center">
            <div className=" h-12 w-12 rounded-full overflow-hidden">
              <div
                className=" bg-cover h-12 w-12"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/PxvbyDxx/image-362-2.png')",
                }}
              ></div>
            </div>
            <span className="text-white font-semibold ml-2 text-xl">
              VietNamAirlines
            </span>
          </div>
          <span className="font-semibold text-2xl text-white py-1 px-3 rounded-full ">
            ECONOMY CLASS
          </span>
        </div>

        <form onSubmit={handleSubmit} className="pl-10 pr-10 pb-10 pt-5">
          <div className="my-4 grid grid-cols-4 gap-4">
            <div>
              <h3 className="font-bold text-gray-600">CHUYẾN BAY/FLIGHT</h3>
              <p className="text-xl font-bold">AIR2056</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-600">THỜI GIAN/TIME</h3>
              <p className="text-lg">16:20</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-600">NGÀY/DATE</h3>
              <p className="text-lg">21/4/2024</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-600">GHẾ/SEAT</h3>
              <p className="text-4xl font-bold">E3</p>
            </div>
          </div>

          <div className="my-4">
            <h3 className="font-bold text-gray-600">HỌ TÊN/FULL NAME</h3>
            <input
              type="text"
              name="fullName"
              placeholder={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className=" grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-gray-600">SỐ ĐIỆN THOẠI</h3>
              <input
                type="text"
                name="phoneNumber"
                placeholder={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-600">EMAIL</h3>
              <input
                type="email"
                name="email"
                placeholder={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="my-4">
              <h3 className="font-bold text-gray-600">HÀNH LÝ KÍ GỬI</h3>
              <select
                name="luggage"
                value={formData.luggage}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              >
                <option>20 kg</option>
                <option>15 kg</option>
                <option>10 kg</option>
                <option>7 kg</option>
                {/* Other options */}
              </select>
            </div>

            <div className="flex justify-end">
              <div className="text-right">
                <h3 className="text-xl font-bold text-orange-500">
                  TỔNG THANH TOÁN
                </h3>
                <p className="text-3xl font-bold text-orange-500">
                  3.500.000 VND
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
