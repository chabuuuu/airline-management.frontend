"use client";
import Button from "@/components/Button";

import Ticket from "@/components/Ticket";

const PayingPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <Button link="/" content={"Tro lai"} />
        <Button link="/" content={"Thanh toan"} />
      </div>
      <Ticket />
    </div>
  );
};

export default PayingPage;
