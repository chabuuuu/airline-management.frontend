import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral-100">
      <div className="container justify-between flex items-center ">
        <Link href="/" className="text-2xl font-bold">
          CSE
        </Link>
        <div className="Right">
          <Link className="btn btn-ghost mr-1 ml-1 " href="/About">
            ABOUT US
          </Link>
          <Link className="btn btn-ghost mr-1 ml-1 " href="/RegulationsPage">
            Regulation
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

          {/* <div className=" dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex btn btn-ghost rounded-xl items-center justify-center"
            >
              <svg
                className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <Link href={"/SignIn"}>Sign In</Link>
              </li>
              <li>
                <Link href={"/SignUp"}>Sign Up</Link>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
