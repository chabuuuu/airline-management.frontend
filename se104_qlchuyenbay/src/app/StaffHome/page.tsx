"use client";
import { useState } from "react";
import AirplaneTable from "@/components/staff-components/AirplaneTable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AirportManage from "@/components/staff-components/AirportManage";
import FlightManage from "@/components/staff-components/FlightManage";
import RegulationsManage from "@/components/staff-components/RegulationsManage";
import BookingManage from "@/components/staff-components/BookingManage";
import AccountManage from "@/components/staff-components/AccountManage";
import { toast } from "react-toastify";
import TicketManage from "@/components/staff-components/TicketManage";

export default function StaffHome() {
  const router = useRouter();
  const { data: session } = useSession();

  // if (!session || session.user.role === undefined) {
  //   console.log("hi");
  //   toast.success("You must to login!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  //   router.push("/");

  //   return null;
  // }
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex: any) => {
    setActiveTab(tabIndex);
  };

  let content;
  switch (session?.user.role) {
    case "Staff_LV2":
      content = (
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Flight "
            checked={activeTab === 1}
            onChange={() => handleTabChange(1)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 1 ? "" : "hidden"
            }`}
          >
            <FlightManage />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Booked "
            checked={activeTab === 2}
            onChange={() => handleTabChange(2)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 2 ? "" : "hidden"
            }`}
          >
            <BookingManage />{" "}
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Ticket "
            checked={activeTab === 3}
            onChange={() => handleTabChange(3)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 3 ? "" : "hidden"
            }`}
          >
            <TicketManage />{" "}
          </div>
        </div>
      );
      break;
    case "Staff_LV1":
      content = (
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Regulations "
            checked={activeTab === 1}
            onChange={() => handleTabChange(1)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 1 ? "" : "hidden"
            }`}
          >
            <RegulationsManage />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Airport"
            checked={activeTab === 2}
            onChange={() => handleTabChange(2)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 2 ? "" : "hidden"
            }`}
          >
            <AirportManage />
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Account"
            checked={activeTab === 3}
            onChange={() => handleTabChange(3)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 3 ? "" : "hidden"
            }`}
          >
            <AccountManage />
          </div>
        </div>
      );
      break;
    default:
      content = null;
  }

  return <main className="main">{content}</main>;
}
