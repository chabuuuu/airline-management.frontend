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
        setBookings(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getAllBookingListOfStaff();
  }, []);

  const [customerBookingCount, setCustomerBookingCount] = useState<
    {
      customer: string;
      count: number;
    }[]
  >([]);

  const [customerInMonth, setCustomerInMonth] = useState<number[]>(
    Array(12).fill(0)
  );
  const [pieData, setPieData] = useState<chart>({
    tittle: "Payment rate",
    unit: "Percent",
    datas: [],
    labels: ["Paid", "Unpaid"],
  });

  useEffect(() => {
    const customerCount: { [key: string]: number } = {};
    const monthCounts = Array(12).fill(0);
    let paidCount = 0;
    let unpaidCount = 0;
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
        }
      }
      if (book.paymentStatus) {
        paidCount++;
      } else {
        unpaidCount++;
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

    const total = paidCount + unpaidCount;
    const paidPercentage = total > 0 ? (paidCount / total) * 100 : 0;
    const unpaidPercentage = total > 0 ? (unpaidCount / total) * 100 : 0;
    setPieData((prevData) => ({
      ...prevData,
      datas: [paidPercentage, unpaidPercentage],
    }));
  }, [bookings]);

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

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Ticket Booked DashBoard
        </div>
        <div className="collapse-content">
          <div className="flex gap-5 h-full">
            <BarChart data={brandChartData} orientation={"horizontal"} />
            <PieChart props={pieData} />

            <LineChart props={lineData} />
          </div>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Airplane Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <div className=" bg-white rounded-2xl p-5 my-3">
            <div className="overflow-x-auto">
              <BookingTable allBooking={bookings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManage;
