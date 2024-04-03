"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import SearchModal from "@/components/SearchModal";
import Image from "next/image";

export default function StaffHome() {
  type inputType = {
    logo: string;
    brand: string;
    date: string;
    time?: string;
    spot: [string, string];
    status: string;
    price: string | number;
  };
  const cardsData: inputType[] = [
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "16:20 PM, 2024-03-25",
      spot: ["HoChiMinh", "HaNoi"],
      status: "available",
      price: 3500000,
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-26",
      spot: ["HoChiMinh", "HaNoi"],
      status: "sold",
      price: "Not available",
    },
    // Add more card data as needed
  ];

  return (
    <main className="main">
      <div className=" card-actions justify-end">
        <Button link="/CreateFlight" content={"Tạo chuyến bay"} />
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <SearchModal />
      </div>
      <Menu />
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {cardsData.map((cardData, index) => (
          <Card key={index} {...cardData} />
        ))}
      </div>
    </main>
  );
}
