import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import { BookingType } from "@/type";

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
  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Ticket Booked DashBoard
        </div>
        <div className="collapse-content">
          <p>hello</p>
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
