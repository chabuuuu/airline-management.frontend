"use client";

import ProfileCard from "@/components/ProfileCard";
import TicketCard from "@/components/TIcketCard";

function About() {
  return (
    <div className="container h-full ">
      <ProfileCard />
      <div className="grid items-center justify-center md:grid-cols-1 lg:grid-cols-1 gap-5 mt-5">
        <TicketCard
          airline="VietNamAirlines"
          date="2024-04-15"
          time="08:30 AM"
          departure="HoChiMinh SGN"
          arrival="Vinh VII"
          duration="1 hours 30 minutes"
          price="$350.00"
        />
        <TicketCard
          airline="Delta Airlines"
          date="2024-04-15"
          time="08:30 AM"
          departure="New York JFK"
          arrival="Los Angeles LAX"
          duration="5 hours 30 minutes"
          price="$350.00"
        />
      </div>
    </div>
  );
}

export default About;
