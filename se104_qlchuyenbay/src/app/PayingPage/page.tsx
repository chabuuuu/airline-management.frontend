"use client";
import Button from "@/components/Button";

import Ticket from "@/components/Ticket";

const PayingPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <Button content={"Tro lai"} />
        <Button content={"Thanh toan"} />
      </div>
      <Ticket />
      <Ticket />
      <Ticket />
    </div>
  );
};

export default PayingPage;
