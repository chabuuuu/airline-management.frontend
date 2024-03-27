import Link from "next/link";

function SignIn() {
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
              Welcome, <br /> sign in to continue
            </h2>
            <form className="space-y-4 z-50 ">
              <div className="mt-10 mb-5">
                <label className=" px-1 block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  className="w-full  p-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className=" px-1 block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="*******"
                  className="w-full  p-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <a href="#" className="text-sm text-blue-600">
                Forgot Password?
              </a>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-900"
              >
                Sign In
              </button>
              <button
                type="submit"
                className="btn btn-ghost w-full py-2 px-4 bg-white  rounded "
              >
                Sign In with Google
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/SignUp"
                className=" text-sm text-blue-600 mt-5 hover:border-b-2 hover:border-slate-300"
              >
                Create an account
              </Link>
            </p>
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

export default SignIn;
