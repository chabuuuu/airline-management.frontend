"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import FlightTable from "@/components/staff-components/FlightTable";
import AirplaneTable from "@/components/staff-components/AirplaneTable";
import AirportTable from "@/components/staff-components/AirportTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AirportManage from "@/components/staff-components/AirportManage";
import FlightManage from "@/components/staff-components/FlightManage";

export default function StaffHome() {
  const { data: session } = useSession();
  if (session && session?.user.role !== "Staff_LV2") {
    redirect("/");
  }
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex: any) => {
    setActiveTab(tabIndex);
  };

  return (
    session &&
    session.user.role === "Staff_LV2" && (
      <main className="main">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_0"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Profile "
            checked={activeTab === 0}
            onChange={() => handleTabChange(0)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 0 ? "" : "hidden"
            }`}
          ></div>
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
            aria-label="Airplane "
            checked={activeTab === 2}
            onChange={() => handleTabChange(2)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 2 ? "" : "hidden"
            }`}
          >
            <div className="collapse collapse-arrow bg-base-200 my-3">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-2xl font-semibold">
                Airplane DashBoard
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 my-3">
              <input type="checkbox" />
              <div className="collapse-title ">
                <div className="text-2xl font-semibold inline-flex items-center">
                  Airplane Table Management
                </div>
              </div>
              <div className="flex flex-col collapse-content">
                <Menu />
                <div className=" bg-white rounded-2xl p-5 my-3">
                  <AirplaneTable />{" "}
                </div>
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab font-semibold text-lg h-12"
            aria-label="Airport"
            checked={activeTab === 3}
            onChange={() => handleTabChange(3)}
          />
          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
              activeTab === 3 ? "" : "hidden"
            }`}
          >
            <AirportManage />
          </div>
        </div>
      </main>
    )
  );
}
