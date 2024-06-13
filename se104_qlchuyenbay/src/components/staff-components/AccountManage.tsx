import React, { useEffect, useState } from "react";

import CustomerAccountTable from "./CustomerAccountTable";
import StaffAccountTable from "./StaffAccountTable";
import BarChart from "../BarChart";
import PieChart from "../PieChart";
import { Customer, Staff, chart } from "@/type";
import { useSession } from "next-auth/react";
import axios from "axios";
import LineChart from "../LineChart";

const AccountManage = () => {
  const { data: session } = useSession();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const [customerAccountValidated, setCustomerAccountValidated] =
    useState<number>(0);

  useEffect(() => {
    const getAllStaff = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/staff`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        setStaffs(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    const getAllCustomer = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/customer`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        const validatedCount = response.data.data.filter(
          (cus: any) => cus.emailValidated
        ).length;
        setCustomerAccountValidated(validatedCount);
        setCustomers(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllStaff();
    getAllCustomer();
  }, [session]);

  const pieData: chart = {
    tittle: "Validated customer account.",
    unit: "Count",
    datas: [
      customerAccountValidated,
      customers.length - customerAccountValidated,
    ],
    labels: ["Validated", "Not Validated"],
  };

  const [customerInMonth, setCustomerInMonth] = useState<number[]>(
    Array(12).fill(0)
  );

  useEffect(() => {
    const monthCounts = Array(12).fill(0);
    customers.forEach((cus) => {
      const createMonth = cus.createAt?.slice(5, 7);
      if (createMonth) {
        const monthIndex = Number(createMonth) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthCounts[monthIndex]++;
        }
      }
    });
    setCustomerInMonth(monthCounts);
  }, [customers]);

  const lineData: chart = {
    tittle: "Register customer account.",
    unit: "Count",
    datas: customerInMonth,
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oc",
      "Nov",
      "Dec",
    ],
  };
  return (
    <div>
      <div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title text-2xl font-semibold">
            Account DashBoard
          </div>
          <div className="collapse-content">
            <div className="flex justify-between h-full w-full gap-4">
              <PieChart props={pieData} />
              <LineChart props={lineData} />
              {/* <BarChart /> */}
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

          <StaffAccountTable staffs={staffs} />
        </div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" />
          <div className="collapse-title ">
            <div className="text-2xl font-semibold inline-flex items-center">
              Customer Account Management
            </div>
          </div>
          <CustomerAccountTable customers={customers} />
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
