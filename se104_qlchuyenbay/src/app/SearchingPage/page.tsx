"use client";

import Card from "@/components/Card";
import SearchModal from "@/components/SearchModal";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cardData } from "@/data";

export default function SearchingPage() {
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setDeparture(params.departure || "");
    setDestination(params.destination || "");
    setDate(params.date || "");
  }, [searchParams]);

  return (
    <main className="main">
      <div className="flex justify-end">
        <SearchModal />
      </div>
      <div className="flex justify-center items-center mb-10 ">
        {
          <>
            <p className="text-4xl font-bold mb-3 text-slate-800">
              {departure}
            </p>

            <div className="flex flex-col justify-center items-center mx-3">
              <span className="text-base">{date}</span>
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
              {destination}
            </p>
          </>
        }
      </div>
      <div className="dropdown dropdown-bottom dropdown-end flex justify-end items-center">
        <div
          tabIndex={0}
          role="button"
          className="bg-white flex justify-center items-center w-12 h-5 rounded-full hover:bg-slate-50 m-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-5 w-10 rounded-full"
          >
            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {cardData.map((carddata, index) => {
          if (
            carddata.spot[0] === departure &&
            carddata.spot[1] === destination &&
            carddata.date === date
          ) {
            return <Card key={index} {...carddata} />;
          }
          return null;
        })}
      </div>
    </main>
  );
}
