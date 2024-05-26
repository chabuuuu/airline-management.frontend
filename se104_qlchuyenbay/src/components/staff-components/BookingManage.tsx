import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BookingTable from "./BookingTable";

const BookingManage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [bookings, setBookings] = useState<
    {
      bookingId: string;
      paymentStatus: boolean;
      bookingStatus: string;
      passengerId: string;
      price: string;
      bookedAt: string;
      updateAt: string;
    }[]
  >([
    {
      bookingId: "5a43175d-78a9-46b2-98f3-27126a5ad1c0",
      paymentStatus: false,
      bookingStatus: "BOOKED",
      passengerId: "1342a007-d259-4969-b3db-c455384f6d79",
      price: "156250.00",
      bookedAt: "04-05-2024 10:06:42",
      updateAt: "04-05-2024 10:06:42",
    },
    {
      bookingId: "a073d6bd-287d-40f0-a33a-7876fb657786",
      paymentStatus: false,
      bookingStatus: "BOOKED",
      passengerId: "1342a007-d259-4969-b3db-c455384f6d79",
      price: "156250.00",
      bookedAt: "04-05-2024 10:10:09",
      updateAt: "04-05-2024 10:10:09",
    },
    {
      bookingId: "c8c27a35-2fea-48fd-a61e-22a32ab61303",
      paymentStatus: false,
      bookingStatus: "BOOKED",
      passengerId: "1342a007-d259-4969-b3db-c455384f6d79",
      price: "125000.00",
      bookedAt: "04-05-2024 10:11:07",
      updateAt: "04-05-2024 10:11:07",
    },
    {
      bookingId: "e78711a0-e617-4e62-b485-f467a4e4a7b9",
      paymentStatus: false,
      bookingStatus: "BOOKED",
      passengerId: "1342a007-d259-4969-b3db-c455384f6d79",
      price: "125000.00",
      bookedAt: "04-05-2024 10:11:56",
      updateAt: "04-05-2024 10:11:56",
    },
  ]);

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
        console.log(response);
        console.log(session?.user);
        setBookings(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    //getAllBookingListOfStaff();
  });
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
