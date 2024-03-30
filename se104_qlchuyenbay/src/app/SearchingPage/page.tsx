"use client";

import Card from "@/components/Card";
import SearchModal from "@/components/SearchModal";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchingPage() {
  type inputType = {
    logo: string;
    brand: string;
    date: string;
    spot: [string, string];
    status: string;
    price: string | number;
  };
  const [searchData, setSearchData] = useState<[string, string][]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const searchDataArray = Object.entries(params);

    setSearchData(searchDataArray);
  }, [searchParams]);

  const cardsData: inputType[] = [
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "16:20 PM, 2024-03-25",
      spot: ["HoChiMinh", "HaNoi"],
      status: "available",
      price: 3500000,
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
  ];
  return (
    <main className="main">
      <div className=" card-actions justify-end">
        <SearchModal />
      </div>
      <div className="flex justify-center items-center mb-10 ">
        {searchData.length >= 2 && (
          <>
            <p className="text-4xl font-bold mb-3 text-slate-800">
              {searchData[0][1]}
            </p>

            <div className="flex flex-col justify-center items-center mx-3">
              <span className="text-base">{searchData[2][1]}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="15"
                viewBox="0 0 252 17"
                fill="none"
                className="mt-1"
              >
                <rect y="5" width="252" height="7" rx="3.5" fill="#D9D9D9" />
                <ellipse cx="243" cy="8.5" rx="9" ry="8.5" fill="black" />
                <ellipse cx="9" cy="8.5" rx="9" ry="8.5" fill="#B3B3B3" />
              </svg>
            </div>
            <p className="text-4xl font-bold mb-3 text-slate-800">
              {searchData[1][1]}
            </p>
          </>
        )}
      </div>

      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {cardsData.map((cardData, index) => (
          <Card key={index} {...cardData} />
        ))}
      </div>
    </main>
  );
}
