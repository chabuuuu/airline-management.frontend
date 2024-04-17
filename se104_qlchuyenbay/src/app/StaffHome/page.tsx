"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import FlightTable from "@/components/staff-components/FlightTable";

export default function StaffHome() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex: any) => {
    setActiveTab(tabIndex);
  };

  return (
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
          <div className="collapse collapse-arrow bg-base-200 my-3">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Your DashBoard
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 my-3">
            <input type="checkbox" />
            <div className="collapse-title ">
              <div className="text-xl font-medium inline-flex items-center">
                Flight
                <svg
                  className="w-6 h-6 ml-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col collapse-content">
              <Menu />
              <div className=" bg-white rounded-2xl p-5 my-3">
                <FlightTable />
              </div>
            </div>
          </div>
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
        ></div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-semibold text-lg h-12"
          aria-label="Airport Management"
          checked={activeTab === 3}
          onChange={() => handleTabChange(3)}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
            activeTab === 3 ? "" : "hidden"
          }`}
        >
          Tab content 3
        </div>
      </div>
    </main>
  );
}
