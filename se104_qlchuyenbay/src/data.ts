import React from "react";
type inputType = {
  logo: string;
  brand: string;
  date: string;
  time: string;
  spot: [string, string];
  status: string;
  price: string | number;
};
export const cardData: inputType[] = [
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: " 2024-03-25",
    time: "16:20 PM",
    spot: ["HoChiMinh", "HaNoi"],
    status: "available",
    price: 3500000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: " 2024-03-25",
    time: "17:20 PM",
    spot: ["HoChiMinh", "HaNoi"],
    status: "sold",
    price: 2000000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: " 2024-03-26",
    time: "17:20 PM",
    spot: ["HoChiMinh", "HaNoi"],
    status: "sold",
    price: 2200000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-31-03",
    time: "09:45 AM",
    spot: ["HoChiMinh", "HaNoi"],
    status: "available",
    price: 3200000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    spot: ["HaNoi", "Vinh"],
    status: "sold",
    price: 1800000,
  },

  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-02-04",
    time: "14:15 PM",
    spot: ["HoChiMinh", "DaNang"],
    status: "available",
    price: 2400000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-03-04",
    time: "08:00 AM",
    spot: ["DaNang", "ThanhHoa"],
    status: "sold",
    price: 2000000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-04-04",
    time: "17:00 PM",
    spot: ["HoChiMinh", "QuangBinh"],
    status: "available",
    price: 2600000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-05-04",
    time: "11:20 AM",
    spot: ["HaNoi", "PhuQuoc"],
    status: "available",
    price: 3000000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-06-04",
    time: "15:40 PM",
    spot: ["Vinh", "HoChiMinh"],
    status: "sold",
    price: 2200000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-07-04",
    time: "10:15 AM",
    spot: ["ThanhHoa", "HaNoi"],
    status: "available",
    price: 2800000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-08-04",
    time: "13:25 PM",
    spot: ["QuangBinh", "DaNang"],
    status: "available",
    price: 2300000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-09-04",
    time: "16:55 PM",
    spot: ["PhuQuoc", "HaNoi"],
    status: "sold",
    price: 2700000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-27-03",
    time: "10:00 AM",
    spot: ["HaNoi", "Vinh"],
    status: "available",
    price: 3000000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-28-03",
    time: "14:30 PM",
    spot: ["HoChiMinh", "DaNang"],
    status: "available",
    price: 2500000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-29-03",
    time: "11:45 AM",
    spot: ["ThanhHoa", "QuangBinh"],
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-30-03",
    time: "08:00 AM",
    spot: ["PhuQuoc", "HaNoi"],
    status: "available",
    price: 2800000,
  },
];
