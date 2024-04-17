"use client";
import Button from "@/components/Button";
import Ticket from "@/components/Ticket";
import React from "react";
import { useSearchParams } from "next/navigation";

interface Seat {
  seat: string;
  class: string;
  price: string;
}

interface Params {
  logo: string;
  brand: string;
  date: string;
  time: string;
  departure: string;
  destination: string;
  chooseSeat: Seat[];
}

const PayingPage = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const filteredParams: Params = {
    logo: params.logo,
    brand: params.brand,
    date: params.date,
    time: params.time,
    departure: params.departure,
    destination: params.destination,
    chooseSeat: params.chooseSeat ? JSON.parse(params.chooseSeat) : [],
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <Button link="/" content={"Tro lai"} />
        <Button link="/" content={"Thanh toan"} />
      </div>
      <Ticket params={filteredParams} />
    </div>
  );
};

export default PayingPage;
