import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Staff = {
  staffId: string;
  username: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  role: string;
  createAt: string;
  updateAt: string;
};

const StaffAccountTable = () => {
  const { data: session } = useSession();
  const [staffs, setStaffs] = useState<Staff[]>([]);
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

    getAllStaff();
  }, [session]);

  const [filtersStaffs, setFiltersStaffs] = useState<Staff[]>([]);
  const [filterRole, setFilterRole] = useState<string>("");

  useEffect(() => {
    setFiltersStaffs(staffs);
  }, [staffs]);

  useEffect(() => {
    if (filterRole) {
      setFiltersStaffs(staffs.filter((staff) => staff.role === filterRole));
    } else {
      setFiltersStaffs(staffs);
    }
  }, [filterRole, staffs]);

  const handleAllStaff = () => {
    setFilterRole("");
  };

  const handleFilterStaffRole = (role: string) => {
    setFilterRole(role);
  };

  return (
    <div className="flex flex-col collapse-content">
      <div className="flex justify-between h-full items-center mt-5">
        <div></div>

        <div className="flex justify-between">
          <label className="input input-bordered flex items-center gap-2">
            <p className=" ">Username</p>
            <input
              type="text"
              className="grow font-medium"
              placeholder="admin"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="flex rounded-md p-1 items-center justify-around h-12 bg-base-300 ml-3">
            <div
              className={`${
                filterRole === "" ? "bg-white" : ""
              } flex justify-center rounded-md px-5 py-2  text-sm font-medium`}
              onClick={handleAllStaff}
            >
              All
            </div>

            <div
              className={`${
                filterRole === "Staff_LV1" ? "bg-white" : ""
              } flex justify-center rounded-md px-5 py-2  text-sm font-medium`}
              onClick={() => handleFilterStaffRole("Staff_LV1")}
            >
              StaffLV1
            </div>

            <div
              className={`${
                filterRole === "Staff_LV2" ? "bg-white" : ""
              } flex justify-center rounded-md px-5 py-2  text-sm font-medium`}
              onClick={() => handleFilterStaffRole("Staff_LV2")}
            >
              StaffLV2
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white rounded-2xl p-5 my-3">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Contact</th>

                <th>Activated</th>
                <th>Role</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {filtersStaffs.map((customer, index) => (
                <tr key={index}>
                  <th>{index}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://th.bing.com/th/id/OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa?rs=1&pid=ImgDetMain"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{customer.username}</div>
                        <div className="text-sm opacity-50">
                          {customer.birthday}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {customer.email}
                    <br />
                    {customer.phoneNumber}
                  </td>

                  <td>
                    Update at: {customer.updateAt}
                    <br />
                    Create at: {customer.createAt}
                  </td>
                  <td>
                    <div>
                      <div
                        className={
                          customer.role === "Staff_LV1"
                            ? " badge badge-primary badge-outline btn-xs font-medium"
                            : " badge badge-accent badge-outline btn-xs font-medium"
                        }
                      >
                        {customer.role.toString()}
                      </div>
                    </div>
                  </td>
                  <td>
                    <button>
                      <svg
                        className="w-4 h-4 hover:opacity-50 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 50"
                        fill="none"
                      >
                        <circle cx="25" cy="25" r="25" fill="#2F2F2F" />
                        <circle cx="100" cy="25" r="25" fill="#2F2F2F" />
                        <circle cx="175" cy="25" r="25" fill="#2F2F2F" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffAccountTable;
