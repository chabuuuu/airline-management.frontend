import Button from "@/components/Button";
import Card from "@/components/Card";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  type inputType = {
    logo: string;
    brand: string;
    date: string;
    spot: [string, string];
    status: string;
    price: string | number;
  };
  const cardsData: inputType[] = [
    {
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
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
    // Add more card data as needed
  ];

  return (
    <main className="main">
      <div className=" card-actions justify-end">
        <Button content={"Tạo chuyến bay"} />
        <Button content={"Tìm kiếm"} color="bg-orange-600" />
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
