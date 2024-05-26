"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Seat {
  seat: string;
  class: string;
  price: string;
}

interface Params {
  logo: string;
  brand: string;
  date: string;
  time: string;
  departure: string;
  destination: string;
  chooseSeat: Seat[];
}

interface FillForm {
  fullname: string;
  phonenumber: string;
  email: string;
  luggage: string;
  money: string;
}

const PayingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const filteredParams: Params = {
    logo: params.logo,
    brand: params.brand,
    date: params.date,
    time: params.time,
    departure: params.departure,
    destination: params.destination,
    chooseSeat: params.chooseSeat ? JSON.parse(params.chooseSeat) : [],
  };
  let totalMoney = 0;
  filteredParams.chooseSeat.forEach((param) => {
    totalMoney += parseInt(param.price);
  });
  const [formData, setFormData] = useState<FillForm[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setFormData(newFormData);
    console.log(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/iPayPage?total=${totalMoney.toString()}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {filteredParams.chooseSeat.map((param, index) => (
          <div key={index} className="flex justify-center items-center mb-6">
            <div className="bg-white rounded-3xl shadow-md ">
              <div className="flex rounded-t-3xl p-2 bg-teal-600 justify-between items-center border-b ">
                <div className="flex items-center">
                  <img
                    src={filteredParams.logo}
                    alt={filteredParams.brand}
                    className="w-12 object-cover mx-4"
                  />
                  <h2 className="text-2xl font-semibold text-white">
                    {filteredParams.brand}
                  </h2>
                </div>
                <span className="font-semibold text-2xl text-white py-1 px-3 rounded-full ">
                  {param.class.toUpperCase()} CLASS
                </span>
              </div>
              <div className="pl-10 pr-10 pb-10 pt-5">
                <div className="my-4 grid grid-cols-6 gap-6 max-w-[800px]">
                  <div>
                    <h3 className="font-bold text-gray-600">
                      CHUYẾN BAY/FLIGHT
                    </h3>
                    <p className="text-xl font-bold">AIR2056</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">FROM:</h3>
                    <p className="text-xl font-bold">
                      {filteredParams.departure}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">TO:</h3>
                    <p className="text-xl font-bold">
                      {filteredParams.destination}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">THỜI GIAN/TIME</h3>
                    <p className="text-lg">{filteredParams.time}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">NGÀY/DATE</h3>
                    <p className="text-lg">{filteredParams.date}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">GHẾ/SEAT</h3>
                    <p className="text-4xl font-bold">{param.seat}</p>
                  </div>
                </div>

                <div className="my-4">
                  <h3 className="font-bold text-gray-600">HỌ TÊN/FULL NAME</h3>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="NGUYEN VAN A"
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className=" grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-gray-600">SỐ ĐIỆN THOẠI</h3>
                    <input
                      type="text"
                      name="phoneNumber"
                      required
                      placeholder="012345678"
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">EMAIL</h3>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="ac@gmail.com"
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="my-4">
                    <h3 className="font-bold text-gray-600">HÀNH LÝ KÍ GỬI</h3>
                    <select
                      name="luggage"
                      value={formData[index]?.luggage || ""}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                    >
                      <option>0 kg</option>
                      <option>20 kg</option>
                      <option>15 kg</option>
                      <option>10 kg</option>
                      <option>7 kg</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-orange-500">
                        TỔNG THANH TOÁN
                      </h3>
                      <p className="text-3xl font-bold text-orange-500">
                        {param.price} VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center">
          <div className="w-full  flex justify-between max-w-[850px] ">
            <button className="btn " onClick={router.back}>
              Back
            </button>

            <button
              type="submit"
              className="btn btn-active bg-orange-400 text-white min-w-[200px] hover:text-black "
            >
              Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PayingPage;
