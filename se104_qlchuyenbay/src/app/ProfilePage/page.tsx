"use client";
import { useRouter } from "next/navigation";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import ProfileCard from "@/components/ProfileCard";
import TicketCard from "@/components/TIcketCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TicketsPurchasedModal from "@/components/TicketsPurchasedModal";
import { BookingType } from "@/type";
import axios from "axios";

function ProfilePage() {
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState<number>(0);

  useEffect(() => {
    const getBookingTicket = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/booking/me`,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        const mappedData = responseData.map((dt: any) => ({
          bookingId: dt.bookingId,
          paymentStatus: dt.paymentStatus,
          bookingStatus: dt.bookingStatus,
          passengerId: dt.passengerId,
          price: dt.price,
          bookedAt: dt.bookedAt,
          updateAt: dt.updateAt,
          seatId: dt.seatFlight.seatId,
          flightId: dt.seatFlight.flightId,
          class: dt.seatFlight.class,
        }));
        console.log("mappedData", mappedData);
        setBookings(mappedData);
      } catch (e) {
        console.log(e);
      }
    };
    getBookingTicket();
  }, []);

  useEffect(() => {
    const total = bookings.reduce((acc, book) => acc + Number(book.price), 0);
    setTotalMoneySpent(total);
  }, [bookings]);

  return (
    <div className="container ">
      <div className="flex flex-row justify-between ">
        <ProfileCard CUSTOMER_TOKEN={session?.user.token} />
        <div className="flex flex-col justify-between w-full ml-5">
          <div className="  mb-5 flex justify-between items-center">
            {/* <PieChart /> */}
            {/* <BarChart /> */}
          </div>

          <div className="flex flex-col items-center  w-full bg-slate-50 p-5 rounded-2xl">
            <div className="flex w-full justify-between">
              <div>
                <div>
                  <span className="text-lg font-normal ">
                    Totals ticket booked:{" "}
                  </span>
                  <span className="text-xl font-semibold">
                    {bookings.length}
                  </span>
                </div>

                <div>
                  <span className="text-lg font-normal ">Money spent: </span>
                  <span className="text-xl font-semibold">
                    {totalMoneySpent} VND
                  </span>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Lastest Ticket</p>
                <TicketCard
                  flightId={bookings[0]?.flightId}
                  bookedAt={bookings[0]?.bookedAt}
                  seatId={bookings[0]?.seatId}
                  paymentStatus={bookings[0]?.paymentStatus}
                  seatClass={bookings[0]?.class}
                  price={bookings[0]?.price}
                />
              </div>
            </div>
            <TicketsPurchasedModal allBookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
