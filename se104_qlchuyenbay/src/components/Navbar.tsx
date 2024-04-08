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
          <Link className="btn btn-ghost mr-1 ml-1 " href="/iPayPage">
            iPay
          </Link>
          <Link className="btn btn-ghost mr-1 ml-1 " href="/About">
            ABOUT US
          </Link>
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

      </div>
    </div>
  );
};

export default Navbar;