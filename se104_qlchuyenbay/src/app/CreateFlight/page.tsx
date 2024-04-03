'use client'

import CreateFlightForm from "@/components/CreateFlightForm";
import BottomNavbar from "@/components/BottomNavbar";
import Link from "next/link";

function CreateFlight() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* <div className="flex items-center space-x-6 mb-4"></div> */}
      <CreateFlightForm />
      <BottomNavbar />
    </div>
  );
}

export default CreateFlight;
