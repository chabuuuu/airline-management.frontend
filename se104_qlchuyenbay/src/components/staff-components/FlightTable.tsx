import React from "react";

const Flight = () => {
  type inputType = {
    flight: string;
    logo: string;
    brand: string;
    date: string;
    time?: string;
    departure: string;
    airportStart?: string;
    airportEnd?: string;
    destination: string;
    seat: string;
    placed: string;
    status: string;
    price: string | number;
    available: string;
  };
  const cardsData: inputType[] = [
    {
      flight: "AIR2056",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "20",
      status: "available",
      price: 3500000,
      available: "available",
    },
    {
      flight: "AIR2058",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "48",
      status: "sold",
      price: 3500000,
      available: "expired",
    },

    {
      flight: "AIR2056",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "20",
      status: "available",
      price: 3500000,
      available: "available",
    },
    {
      flight: "AIR2058",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "48",
      status: "sold",
      price: 3500000,
      available: "expired",
    },
    {
      flight: "AIR2056",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "20",
      status: "available",
      price: 3500000,
      available: "available",
    },
    {
      flight: "AIR2058",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "48",
      status: "sold",
      price: 3500000,
      available: "available",
    },
    {
      flight: "AIR2056",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "20",
      status: "available",
      price: 3500000,
      available: "expired",
    },
    {
      flight: "AIR2058",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "48",
      status: "sold",
      price: 3500000,
      available: "expired",
    },
    {
      flight: "AIR2056",
      logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      brand: "VietNamAirlines",
      date: "2024-03-25",
      time: "16:20 PM - 20:00 PM",
      departure: "HoChiMinh",
      airportStart: "San bay Tan Son Nhat",
      destination: "HaNoi",
      airportEnd: "San bay Noi Bai",
      seat: "48",
      placed: "20",
      status: "available",
      price: 3500000,
      available: "available",
    },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Flight</th>
              <th>Departure</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Seat</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cardsData.map((cardData, index) => (
              <tr
                key={index}
                className={cardData.status === "sold" ? " bg-red-50" : ""}
              >
                <th>
                  <label>
                    {/* <input type="checkbox" className="checkbox" /> */}
                    <span>{index}</span>
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={cardData.logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cardData.flight}</div>
                      <div className="text-sm opacity-50">{cardData.brand}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="font-semibold">{cardData.departure}</span>
                  <br />
                  <span className="text-sm">{cardData.airportStart}</span>
                </td>
                <td>
                  <span className="font-semibold">{cardData.destination}</span>
                  <br />
                  <span className="text-sm">{cardData.airportEnd}</span>
                </td>
                <td>
                  <span className="font-semibold">{cardData.date}</span>
                  <p className="text-sm">{cardData.time}</p>
                </td>
                <td>
                  <span className="font-medium">
                    {cardData.placed}/{cardData.seat}
                  </span>
                </td>
                <td>
                  <span className="font-semibold ">{cardData.price}</span>
                </td>
                <td>
                  <button
                    className={
                      cardData.available === "expired"
                        ? "btn btn-ghost  text-red-400 btn-xs"
                        : "btn btn-ghost text-green-400 btn-xs"
                    }
                  >
                    {cardData.available}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Flight;
