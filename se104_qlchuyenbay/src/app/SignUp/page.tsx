import Link from "next/link";

function SignUp() {
  return (
    <>
      <div
        className="fixed w-2/3 h-48 bg-no-repeat top-50 mt-10 right-6 rotate-12 "
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/CxjRL1xY/plane-01-7-2.png')",
        }}
      ></div>

      <div className="flex justify-center items-center h-fit">
        <div className="flex flex-row h-full mt-10">
          <div className="flex-grow max-w-md bg-white p-8 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold mb-5 text-indigo-900">
              Let's start
            </h2>
            <form className="space-y-4 z-50 ">
              <div className="mt-10 mb-5">
                <label className=" px-1 block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Fisrt Name
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="John"
                  className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mt-10 mb-5">
                <label className=" px-1 block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Wick"
                  className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
              <div className=" w-full mb-5">
                <label
                  htmlFor=""
                  className=" px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <div>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-900"
              >
                Next
              </button>

              <button
                type="submit"
                className="btn btn-ghost w-full py-2 px-4 bg-white  rounded "
              >
                Create an account with Google
              </button>
              <Link
                href="/SignIn"
                className=" text-sm text-blue-600 mt-5 hover:border-b-2 hover:border-slate-300"
              >
                Already have an account?
              </Link>
            </form>
          </div>
          <div className="flex w-96 ">
            <div
              className="h-full w-full bg-cover justify-center"
              style={{
                backgroundImage:
                  "url('https://i.postimg.cc/9f1FPGGC/image-2024-03-26-170516871.png')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
