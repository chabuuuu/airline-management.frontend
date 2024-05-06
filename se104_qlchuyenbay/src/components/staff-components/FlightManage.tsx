import React, { useEffect, useState } from "react";
import FlightTable from "./FlightTable";
import SearchModal from "../SearchModal";
import CreateAirportForm from "./CreateAirportForm";
import CreateFlightForm from "./CreateFlightForm";
import axios from "axios";
import { PlanesData } from "@/planes";

type CardType = {
  flightId: string;
  logo?: string;
  brand: string;
  date: string;
  time?: string;
  duration?: string;
  departure: string;
  arrival: string;
  status: string;
  price: string | number;
};

const FlightManage = () => {
  type RowType = {
    flight: string;
    logo: string;
    brand: string;
    date: string;
    time: string;
    duration?: string;
    departure: string;
    airportStart?: string;
    airportEnd?: string;
    arrival: string;
    seat: string;
    placed?: string;
    status: string;
    price: string | number;
    available: string;
  };
  const MAX_LENGTH_COL = 7;

  const [allFlightInfo, setAllFlightInfo] = useState<RowType[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<RowType[]>([]);

  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const searchForFlight = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/flight`;

      try {
        const response = await axios.get(url);
        const responseData = response.data;

        const updatedFlightInfo = responseData.data.map((dt: any) => {
          const planeData = PlanesData.find(
            (plane) => plane.brand === dt.airlines
          );
          //const logo = planeData ? planeData.logo : "";
          const logo =
            "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png";

          return {
            flight: dt.flightId,
            brand: dt.airlines,
            logo: logo,
            date: dt.departureTime.slice(0, 10),
            time: dt.departureTime.slice(11, 16),
            departure: dt.departureAirport.city,
            airportStart: dt.departureAirport.airportName,
            arrival: dt.arrivalAirport.city,
            airportEnd: dt.arrivalAirport.airportName,
            duration: dt.flightDuration,
            status: dt.status,
            price: dt.price,
            seat: dt.seatsAvailable,
          };
        });

        setAllFlightInfo(updatedFlightInfo);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    searchForFlight();
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const filtered = allFlightInfo.filter((flight) =>
      flight.departure.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFlights(filtered);
  }, [searchQuery, allFlightInfo]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [filterFlight, setFilterFlight] = useState<CardType[]>();

  const [filters, setFilters] = useState<string | null>(null);

  const handleFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const filterValue = event.currentTarget.textContent;
    setFilters(filterValue);
  };

  useEffect(() => {
    let filtered = allFlightInfo;

    if (filters) {
      filtered = allFlightInfo.filter(
        (flight) => flight.status.toLowerCase() === filters.toLowerCase()
      );
    }

    setFilteredFlights(filtered);
  }, [filters, allFlightInfo]);

  const offFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setFilters(null);
  };
  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Flight DashBoard
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Flight Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <div className="flex justify-between h-full items-center mt-5">
            <div>
              <CreateFlightForm />
            </div>

            <div className="flex justify-between">
              <label className="input max-w-[250px] input-bordered flex items-center gap-2 ml-2">
                <p className=" ">Departure</p>
                <input
                  type="text"
                  className=" font-medium"
                  placeholder="HaNoi"
                  onChange={handleSearch}
                />
              </label>

              <label className="input max-w-[250px]  input-bordered flex items-center gap-2 ml-2">
                <p className=" ">Destination</p>
                <input
                  type="text"
                  className="font-medium"
                  placeholder="HoChiMinh"
                  //onChange={handleSearch}
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
              <label className="input input-bordered flex items-center gap-2 ml-2">
                <p className=" ">Date</p>
                <input
                  type="date"
                  className="w-[200px] font-medium"
                  placeholder="HaNoi"
                  // onChange={handleSearch}
                />
              </label>

              <div className="flex justify-between items-center ml-2 rounded-lg  px-2 bg-base-300">
                <p className="font-normal text-slate-600 mr-3 text-sm">
                  Status
                </p>

                {!!filters && (
                  <div className="flex items-center justify-between bg-white rounded-lg p-1 px-3  mr-2">
                    <span className="text-sm mr-3">{filters}</span>
                    <a onClick={offFilter}>
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </a>
                  </div>
                )}

                <div className="dropdown dropdown-bottom dropdown-end  ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex justify-center items-center rounded-full "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 "
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.1924 5.65685C11.5829 5.26633 11.5829 4.63316 11.1924 4.24264L8.36397 1.41421C8.30576 1.356 8.24485 1.30212 8.18165 1.25259C7.50286 0.720577 6.55947 0.689024 5.84929 1.15793C5.73839 1.23115 5.63317 1.31658 5.53554 1.41421L2.70711 4.24264C2.31658 4.63316 2.31658 5.26633 2.70711 5.65685C3.09763 6.04738 3.7308 6.04738 4.12132 5.65685L6.00003 3.77814V18C6.00003 18.5523 6.44775 19 7.00003 19C7.55232 19 8.00003 18.5523 8.00003 18V3.8787L9.77818 5.65685C10.1687 6.04737 10.8019 6.04737 11.1924 5.65685Z"
                        fill="#0F0F0F"
                      />
                      <path
                        d="M12.7071 18.3432C12.3166 18.7337 12.3166 19.3668 12.7071 19.7574L15.5355 22.5858C15.6332 22.6834 15.7384 22.7689 15.8493 22.8421C16.6256 23.3546 17.6805 23.2692 18.364 22.5858L21.1924 19.7574C21.5829 19.3668 21.5829 18.7337 21.1924 18.3432C20.8019 17.9526 20.1687 17.9526 19.7782 18.3432L18 20.1213L18 6C18 5.44771 17.5523 5 17 5C16.4477 5 16 5.44771 16 6L16 20.2218L14.1213 18.3432C13.7308 17.9526 13.0976 17.9526 12.7071 18.3432Z"
                        fill="#0F0F0F"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-5"
                  >
                    <li>
                      <a onClick={handleFilter}>Succes</a>
                    </li>
                    <li>
                      <a onClick={handleFilter}>In Progress</a>
                    </li>
                    <li>
                      <a onClick={handleFilter}>Cancel</a>
                    </li>
                    <li>
                      <a onClick={handleFilter}>Not Finish</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-white rounded-2xl p-5 my-3">
            <FlightTable allFlight={filteredFlights} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightManage;
