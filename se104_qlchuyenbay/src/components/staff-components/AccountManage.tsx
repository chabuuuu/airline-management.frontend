import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import CustomerAccountTable from "./CustomerAccountTable";
import StaffAccountTable from "./StaffAccountTable";
import BarChart from "../BarChart";
import PieChart from "../PieChart";

const AccountManage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title text-2xl font-semibold">
            Account DashBoard
          </div>
          <div className="collapse-content">
            <div className="flex justify-between h-full w-full">
              <PieChart />
              <BarChart />
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" />
          <div className="collapse-title ">
            <div className="text-2xl font-semibold inline-flex items-center">
              Staff Account Management
            </div>
          </div>

          <StaffAccountTable />
        </div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" />
          <div className="collapse-title ">
            <div className="text-2xl font-semibold inline-flex items-center">
              Customer Account Management
            </div>
          </div>
          <CustomerAccountTable />
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
