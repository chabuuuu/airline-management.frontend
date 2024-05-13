import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";
type Customer = {
  customerId: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  birthday: string;
  address: string;
  nationality: string;
  emailValidated: boolean;
  cccd: string;
  cccdPicture: string;
  profilePicture: string;
  createAt: string;
  updateAt: string;
};
const MAX_LENGTH_COL = 7;

const CustomerAccountTable = () => {
  const { data: session } = useSession();

  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
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
        setCustomers(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    getAllCustomer();
  });

  const [filterCustomer, setFilterCustomer] = useState<Customer[]>([]);
  const [emailValidated, setEmailValidated] = useState<boolean | null>(false);
  useEffect(() => {
    setFilterCustomer(customers);
  }, [customers]);

  const handleFilterAvailableFlight = () => {
    setEmailValidated(!emailValidated);
  };
  useEffect(() => {
    if (emailValidated) {
      setFilterCustomer(customers.filter((cus) => cus.emailValidated));
    } else {
      setFilterCustomer(customers);
    }
  }, [emailValidated, customers]);

  const [customerActivityModal, setCustomerActivityModal] =
    useState<boolean>(false);

  const [customerChangeRoleModal, setCustomerChangeRoleModal] =
    useState<boolean>(false);

  const handleDeleteUser = async (e: any) => {
    console.log(e.target.value);
  };

  const [page, setPage] = useState<number>(1);

  return (
    <div className="flex flex-col collapse-content">
      <div className="flex justify-between h-full items-center mt-5">
        <div></div>

        <div className="flex justify-between">
          <label className="input input-bordered flex items-center gap-2">
            <p className=" ">City</p>
            <input
              type="text"
              className="grow font-medium"
              placeholder="HaNoi"
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
                emailValidated
                  ? "flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                  : "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
              }`}
              onClick={handleFilterAvailableFlight}
            >
              All
            </div>

            <div
              className={`${
                emailValidated
                  ? "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                  : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
              }`}
              onClick={handleFilterAvailableFlight}
            >
              Available
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
                <th>CCCD</th>
                <th>Contact</th>

                <th>Activated</th>
                <th>Email Validated</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {filterCustomer.map((customer, index) => {
                if (
                  index >= MAX_LENGTH_COL * (page - 1) &&
                  index < MAX_LENGTH_COL * page
                ) {
                  return (
                    <tr key={customer.customerId}>
                      <th>{index}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={customer.cccdPicture}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{customer.fullname}</div>
                            <div className="text-sm opacity-50">
                              {customer.birthday}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {customer.cccd}
                        <br />
                        {customer.nationality}, {customer.address}
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
                          <button
                            className={
                              customer.emailValidated
                                ? "btn btn-ghost text-green-400 btn-xs font-medium"
                                : "btn btn-ghost text-rose-400 btn-xs font-medium"
                            }
                          >
                            {customer.emailValidated.toString()}
                          </button>
                        </div>
                      </td>
                      <td>
                        <Dropdown key={customer.customerId}>
                          <DropdownTrigger>
                            <Button variant="bordered">
                              <svg
                                className="w-4 h-4 hover:opacity-50 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 50"
                                fill="none"
                              >
                                <circle cx="25" cy="25" r="25" fill="#2F2F2F" />
                                <circle
                                  cx="100"
                                  cy="25"
                                  r="25"
                                  fill="#2F2F2F"
                                />
                                <circle
                                  cx="175"
                                  cy="25"
                                  r="25"
                                  fill="#2F2F2F"
                                />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            className="bg-white rounded-xl drop-shadow-lg p-3"
                          >
                            <DropdownItem
                              onClick={() => setCustomerActivityModal(true)}
                              textValue="dropdown"
                              key={`detail-${customer.customerId}`}
                              className="btn btn-sm btn-ghost"
                            >
                              <div className="flex justify-between">
                                <p> Details Activity</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 192 512"
                                  className="w-4 h-4"
                                >
                                  <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                                </svg>
                              </div>
                            </DropdownItem>

                            <DropdownItem
                              onClick={() => setCustomerChangeRoleModal(true)}
                              textValue="dropdown"
                              key={`changerole-${customer.customerId}`}
                              className="btn btn-sm btn-ghost"
                            >
                              <div className="flex justify-between">
                                <p>Change role</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                                </svg>
                              </div>
                            </DropdownItem>
                            <DropdownItem textValue="dropdown" className="h-2">
                              <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
                            </DropdownItem>

                            <DropdownItem
                              textValue="dropdown"
                              key={`delete-${customer.customerId}`}
                              className="btn btn-sm btn-ghost text-red-600"
                              value={customer.customerId}
                            >
                              <div className="flex justify-between">
                                <p> Delete user</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  viewBox="0 0 448 512"
                                >
                                  <path
                                    fill="#f24a4a"
                                    d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                                  />
                                </svg>
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between p-3">
          <p className="font-medium">
            Total customer: {filterCustomer.length}{" "}
          </p>
          <div className="join">
            {[
              ...Array(
                Math.ceil(filterCustomer.length / MAX_LENGTH_COL)
              ).keys(),
            ].map((pageNumber) => (
              <button
                key={pageNumber}
                className="join-item btn btn-xs"
                onClick={() => setPage(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      {customerActivityModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Seat Flight </h3>

            <div className="flex flex-col justify-between">
              {/* <HandleSeatModal flightId={selectedFlightId} /> */}
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setCustomerActivityModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setCustomerActivityModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {customerChangeRoleModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Change role</h3>

            <Checkbox className=" text-white">
              {" "}
              <p className="text-black">Confirm to change customer to staff</p>
            </Checkbox>

            <div className="flex flex-col justify-between">
              {/* <HandleSeatModal flightId={selectedFlightId} /> */}
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setCustomerChangeRoleModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setCustomerChangeRoleModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccountTable;