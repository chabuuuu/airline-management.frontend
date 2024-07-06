"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import { BookingType, chart } from "@/type";
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import PieChart from "../PieChart";

const BookingManage = () => {
  const { data: session } = useSession();

  const [bookings, setBookings] = useState<BookingType[]>([]);

  useEffect(() => {
    const getAllBookingListOfStaff = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/booking/list`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        responseData.sort((a: any, b: any) => {
          const dateA = new Date(
            a.bookedAt.split(" ")[0].split("-").reverse().join("-") +
              "T" +
              a.bookedAt.split(" ")[1]
          ).getTime();
          const dateB = new Date(
            b.bookedAt.split(" ")[0].split("-").reverse().join("-") +
              "T" +
              b.bookedAt.split(" ")[1]
          ).getTime();
          return dateB - dateA;
        });
        setBookings(responseData);
      } catch (e) {
        console.log(e);
      }
    };

    getAllBookingListOfStaff();
  }, [session?.user.token]);

  const [customerBookingCount, setCustomerBookingCount] = useState<
    {
      customer: string;
      count: number;
    }[]
  >([]);

  const [customerInMonth, setCustomerInMonth] = useState<number[]>(
    Array(12).fill(0)
  );
  const [revenueInMonth, setRevenueInMonth] = useState<number[]>(
    Array(12).fill(0)
  );
  const [availableFlight, setAvailableFlight] = useState<boolean>(false);

  const handleFilterAvailableFlight = () => {
    setAvailableFlight((prev) => !prev);
  };
  useEffect(() => {
    const customerCount: { [key: string]: number } = {};
    const monthCounts = Array(12).fill(0);
    const revenueMonth = Array(12).fill(0);
    const proceedPerMonth = Array(12).fill(0);
    let paidCount = 0;
    let unpaidCount = 0;
    let proceeds = 0;
    bookings.forEach((book) => {
      if (customerCount[book.passengerId]) {
        customerCount[book.passengerId]++;
      } else {
        customerCount[book.passengerId] = 1;
      }

      // Assuming book.bookedAt is in the format 'DD-MM-YYYY'
      const createMonth = book.bookedAt.slice(3, 5);
      if (createMonth) {
        const monthIndex = Number(createMonth) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthCounts[monthIndex]++;
          revenueMonth[monthIndex] += Number(book.price);
        }
      }
      if (book.paymentStatus) {
        paidCount++;
      } else {
        unpaidCount++;
        proceedPerMonth[Number(createMonth) - 1] += Number(book.price);
      }
    });

    const top5Count = Object.keys(customerCount).map((customer) => ({
      customer,
      count: customerCount[customer],
    }));
    top5Count.sort((a, b) => b.count - a.count);
    const top5Destinations = top5Count.slice(0, 5);
    setCustomerBookingCount(top5Destinations);
    setCustomerInMonth(monthCounts);
    setRevenueInMonth(revenueMonth);

    const total = paidCount + unpaidCount;
    const paidPercentage = total > 0 ? (paidCount / total) * 100 : 0;
    const unpaidPercentage = total > 0 ? (unpaidCount / total) * 100 : 0;
    setPieData((prevData) => ({
      ...prevData,
      datas: [paidPercentage, unpaidPercentage],
    }));
  }, [bookings]);

  const [pieData, setPieData] = useState<chart>({
    tittle: "Payment rate",
    unit: "Percent",
    datas: [],
    labels: ["Paid", "Unpaid"],
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterBookings, setFilterBookings] = useState<BookingType[]>([]);

  useEffect(() => {
    let filter = bookings.filter((book) =>
      book.bookingId.includes(searchQuery)
    );
    if (availableFlight) {
      filter = filter.filter((book) => book.paymentStatus);
    }

    setFilterBookings(filter);
  }, [searchQuery, bookings, availableFlight]);

  const brandChartData = {
    tittle: "Top 5 the most customer booking",
    unit: "Count",
    indicate: "Count",
    datas: customerBookingCount.map((d) => d.count),
    labels: customerBookingCount.map((d) => d.customer),
  };

  const lineData = {
    tittle: "Number of customer bookings each month",
    unit: "Count",
    datas: customerInMonth,
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const MonthlyRevenuelineData = {
    tittle: "Monthly revenue in current year",
    unit: "VND",
    datas: revenueInMonth,
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <div></div>
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Booking DashBoard
        </div>
        <div className="collapse-content">
          <div className="flex gap-5 h-full">
            <LineChart props={MonthlyRevenuelineData} />
            {/* <BarChart data={brandChartData} orientation={"horizontal"} /> */}

            <PieChart props={pieData} />
            <LineChart props={lineData} />
          </div>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Booking Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <div className="flex justify-between">
            <label className="input input-bordered flex items-center gap-2 mx-3">
              <p className=" ">Booking Id</p>
              <input
                type="text"
                id="bookingId"
                className="grow font-medium"
                placeholder=""
                onChange={(e: any) => {
                  setSearchQuery(e?.target.value);
                }}
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
                    ? "flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                    : "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                }`}
                onClick={() => setAvailableFlight(!availableFlight)}
              >
                All
              </div>

              <div
                className={`${
                  availableFlight
                    ? "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                    : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                }`}
                onClick={() => setAvailableFlight(!availableFlight)}
              >
                Pays
              </div>
            </div>
          </div>
          <div className=" bg-white rounded-2xl p-5 my-3">
            <div className="overflow-x-auto">
              <BookingTable allBooking={filterBookings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManage;
