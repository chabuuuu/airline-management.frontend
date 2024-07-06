"use client";

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
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import { Customer } from "@/type";

const MAX_LENGTH_COL = 7;
const MAX_PAGE_BUTTONS = 3;

const CustomerAccountTable: React.FC<{ customers: Customer[] }> = ({
  customers,
}) => {
  const { data: session } = useSession();

  const [filterCustomer, setFilterCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    setFilterCustomer(customers);
  }, [customers]);

  const [customerActivityModal, setCustomerActivityModal] =
    useState<boolean>(false);
  const [customerChangeRoleModal, setCustomerChangeRoleModal] =
    useState<boolean>(false);

  const handleDeleteUser = async (e: any) => {
    console.log(e.target.value);
  };

  const [selectCustomer, setSelectCustomer] = useState<{
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthday: string;
    role: string;
  }>({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthday: "",
    role: "Staff_LV2",
  });

  const [countryOptions, setCountryOptions] = useState<
    {
      name: string;
      code: string;
    }[]
  >([]);

  useEffect(() => {
    const get_all_country = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/airport/country`,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        const options = responseData.map((country: any) => ({
          name: country.name,
          code: country.code,
        }));
        setCountryOptions(options);
      } catch (e) {
        console.log(e);
      }
    };
    get_all_country();
  }, []);

  const [searchQuery, setSearchQuery] = useState<{
    username: string;
    countryCode: string;
    emailValidated: boolean | null;
  }>({ username: "", countryCode: "", emailValidated: null });

  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const matchesUsername = customer.fullname
        .toLowerCase()
        .includes(searchQuery.username.toLowerCase());
      const matchesCountry = customer.nationality
        .toLowerCase()
        .includes(searchQuery.countryCode.toLowerCase());
      const matchesEmailValidated =
        searchQuery.emailValidated === null ||
        customer.emailValidated === searchQuery.emailValidated;

      return matchesUsername && matchesCountry && matchesEmailValidated;
    });
    setFilterCustomer(filtered);
  }, [searchQuery, customers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const changeCustomerRole = async () => {
    if (checkChangeRole) {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/staff`,
        headers: {
          Authorization: session?.user.token,
        },
        data: JSON.stringify(selectCustomer),
      };
      try {
        const response = await axios.request(config);
        toast.success("Update successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setInterval(() => {
          window.location.reload();
        }, 3000);
      } catch (e: any) {
        const messages = e.response.data.message;
        toast.error(messages || "An error occurred", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const [checkChangeRole, setCheckChangeRole] = useState<boolean>(false);

  const deleteUserById = async (id: string) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/customer/${id}`,
      headers: {
        Authorization: session?.user.token,
      },
    };
    try {
      const response = await axios.request(config);
      toast.success("Delete successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setInterval(() => {
        window.location.reload();
      }, 3000);
    } catch (e: any) {
      const messages = e.response.data.message;
      toast.error(messages || "An error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // Page pagination
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(filterCustomer.length / MAX_LENGTH_COL);
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);
  return (
    <div className="flex flex-col collapse-content">
      <div className="flex justify-between h-full items-center mt-5">
        <div></div>

        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            <label className="input h-[40px] input-bordered flex items-center gap-2">
              <p className="">Customer</p>
              <input
                type="text"
                id="username"
                className="grow font-medium"
                placeholder="Nguyen Van A"
                onChange={handleSearch}
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
          </div>

          <div className="flex flex-col justify-center">
            <Autocomplete
              disablePortal
              className="bg-white w-[200px] mx-3"
              id="countryCode"
              options={countryOptions}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                setSearchQuery((prevState) => ({
                  ...prevState,
                  countryCode: value ? value.code : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Vietnam" />
              )}
            />
          </div>

          <div className="flex rounded-md p-2 items-center justify-around h-[40px]  bg-base-300">
            <div
              className={`${
                searchQuery.emailValidated === null
                  ? "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                  : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
              }`}
              onClick={() => {
                setSearchQuery((prevState) => ({
                  ...prevState,
                  emailValidated: null,
                }));
              }}
            >
              All
            </div>

            <div
              className={`${
                searchQuery.emailValidated === true
                  ? "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                  : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
              }`}
              onClick={() => {
                setSearchQuery((prevState) => ({
                  ...prevState,
                  emailValidated: true,
                }));
              }}
            >
              Validated
            </div>

            {/* <div
              className={`${
                searchQuery.emailValidated === false
                  ? "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
                  : "flex justify-center rounded-md px-5 py-2  text-sm font-medium"
              }`}
              onClick={() => {
                setSearchQuery((prevState) => ({
                  ...prevState,
                  emailValidated: false,
                }));
              }}
            >
              Not Validated
            </div> */}
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
                              <picture>
                                <img
                                  src={customer?.cccdPicture}
                                  crossOrigin="anonymous"
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </picture>
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

                            <DropdownItem textValue="dropdown" className="h-2">
                              <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
                            </DropdownItem>

                            <DropdownItem
                              textValue="dropdown"
                              key={`delete-${customer.customerId}`}
                              className="btn btn-sm btn-ghost text-red-600"
                              value={customer.customerId}
                              onClick={() =>
                                deleteUserById(customer.customerId)
                              }
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
            <button
              className="join-item btn btn-xs btn-ghost"
              onClick={() => setPage(1)}
            >
              «
            </button>
            {[...Array(endPage - adjustedStartPage + 1).keys()].map((index) => {
              const pageNumber = adjustedStartPage + index;
              return (
                <button
                  key={pageNumber}
                  className={`join-item btn btn-xs ${
                    pageNumber === page ? "btn-active" : ""
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              className="join-item btn btn-xs btn-ghost"
              onClick={() => setPage(totalPages)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountTable;
