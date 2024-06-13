"use client";

import React, { useEffect, useState } from "react";
import AirportTable from "./AirportTable";
import CreateAirportForm from "./CreateAirportForm";
import axios from "axios";
import { AirportType } from "@/type";

const AirportManage = () => {
  const [availableFlight, setAvailableFlight] = useState<boolean>(true);
  const [allFlightInfo, setAllFlightInfo] = useState<AirportType[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<AirportType[]>([]);
  const [searchQuery, setSearchQuery] = useState<{
    country: string;
    city: string;
  }>({ country: "", city: "" });

  useEffect(() => {
    const searchForFlight = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/airport`;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        setAllFlightInfo(response.data.data);
        setFilteredFlights(response.data.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    searchForFlight();
  }, []);

  const handleFilterAvailableFlight = () => {
    setAvailableFlight((prev) => !prev);
  };

  useEffect(() => {
    let filtered = allFlightInfo;

    if (availableFlight) {
      filtered = filtered.filter(
        (flight) => flight.status === "Đang hoạt động"
      );
    }

    if (searchQuery.country || searchQuery.city) {
      filtered = filtered.filter((flight) => {
        const matchesCountry = flight.country
          .toLowerCase()
          .includes(searchQuery.country.toLowerCase());
        const matchesCity = flight.city
          .toLowerCase()
          .includes(searchQuery.city.toLowerCase());
        return matchesCountry && matchesCity;
      });
    }

    setFilteredFlights(filtered);
  }, [availableFlight, searchQuery, allFlightInfo]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Airport DashBoard
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Airport Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <div className="flex justify-between h-full items-center mt-5">
            <div>
              <CreateAirportForm />
            </div>

            <div className="flex justify-between">
              <label className="input input-bordered flex items-center gap-2">
                <p className=" ">Country</p>
                <input
                  type="text"
                  id="country"
                  className="grow font-medium"
                  placeholder="Vietnam"
                  onChange={handleSearch}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

              <label className="input input-bordered flex items-center gap-2 mx-3">
                <p className=" ">City</p>
                <input
                  type="text"
                  id="city"
                  className="grow font-medium"
                  placeholder="Ha Noi"
                  onChange={handleSearch}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <div className="flex rounded-md p-1 items-center justify-around h-12 bg-base-300">
                <div
                  className={`${
                    availableFlight
                      ? "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                      : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                  }`}
                  onClick={handleFilterAvailableFlight}
                >
                  All
                </div>

                <div
                  className={`${
                    availableFlight
                      ? "flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                      : "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                  }`}
                  onClick={handleFilterAvailableFlight}
                >
                  Available
                </div>
              </div>
            </div>
          </div>

          <div className=" bg-white rounded-2xl p-5 my-3">
            <AirportTable allFlight={filteredFlights} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportManage;
