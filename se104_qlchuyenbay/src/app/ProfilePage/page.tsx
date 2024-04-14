"use client";
import { useRouter } from "next/navigation";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import ProfileCard from "@/components/ProfileCard";
import TicketCard from "@/components/TIcketCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import TicketsPurchasedModal from "@/components/TicketsPurchasedModal";

function ProfilePage() {
  const { data: session } = useSession();

  // const router = useRouter();
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [session, router]);

  return (
    <div className="container ">
      <div className="flex flex-row justify-between ">
        <ProfileCard CUSTOMER_TOKEN={session?.user.token} />
        <div className="flex flex-col justify-between w-full ml-5">
          <div className="  mb-5 flex justify-between items-center">
            <PieChart />
            <BarChart />
          </div>

          <div className="flex flex-col items-center  w-full bg-slate-50 p-5 rounded-2xl">
            <div className="flex w-full justify-between">
              <div>
                <p className="text-lg font-semibold">Totals Ticket buys: </p>
                <p className="text-lg font-semibold">Money spent: </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Lastest Ticket</p>
                <TicketCard
                  airline="VietNamAirlines"
                  date="2024-04-15"
                  time="08:30 AM"
                  departure="HoChiMinh SGN"
                  arrival="Vinh VII"
                  duration="1 hours 30 minutes"
                  price="$350.00"
                />
              </div>
            </div>
            <TicketsPurchasedModal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
