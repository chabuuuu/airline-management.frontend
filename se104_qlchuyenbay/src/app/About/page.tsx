"use client";

import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import ProfileCard from "@/components/ProfileCard";
import TicketCard from "@/components/TIcketCard";
import Link from "next/link";
import React from "react";

function About() {
  return (
    <div className="container ">
      <div className="flex flex-row justify-between ">
        <ProfileCard />
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
            <Link
              href="/"
              className="btn w-full bg-blue-600 text-white hover:text-black "
            >
              See all tickets purchased
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
