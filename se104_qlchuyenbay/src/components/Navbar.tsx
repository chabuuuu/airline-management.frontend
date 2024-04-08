"use client";

import Logout from "@/app/logout";
import Link from "next/link";
import React, { FC } from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-neutral-100">
      <div className="container justify-between flex items-center ">
        <Link href="/" className="text-2xl font-bold">
          CSE
        </Link>

        <div className="flex justify-center items-center">
          <Link className="btn btn-ghost mr-1 ml-1 " href="/About">
            ABOUT US
          </Link>
          {session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost ">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    className="btn btn-ghost mr-1 ml-1 "
                    href="/ProfilePage"
                  >
                    <div className=" w-full flex justify-between items-center">
                      <span>PROFILE</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z" />
                      </svg>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className=" w-full flex justify-between items-center">
                    <Logout />
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link className="btn btn-ghost mr-1 ml-1 " href={"/SignIn"}>
                Sign In
              </Link>

              <Link
                className="btn btn-ghost mr-1 ml-1 bg-slate-800 text-white hover:text-black"
                href={"/SignUp"}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;