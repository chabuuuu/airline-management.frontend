"use client";
import Button from "@/components/Button";

import Ticket from "@/components/Ticket";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Params {
  logo: string;
  brand: string;
  date: string;
  time: string;
  departure: string;
  destination: string;
  price: string;
  seat: string;
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
    price: params.price,
    seat: params.seat,
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
