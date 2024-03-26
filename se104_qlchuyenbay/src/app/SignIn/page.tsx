function SignIn() {
  return (
    <div className="flex justify-center items-center h-fit">
      <div className="flex flex-row h-full mt-10">
        <div
          className="fixed w-2/3 h-2/3 bg-no-repeat top-0 right-12 rotate-12 "
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/fW7tk0PW/plane-01-7-1.png')",
          }}
        ></div>
        <div className="flex-grow max-w-md bg-white p-8 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-5 text-indigo-900">
            Welcome, <br /> sign in to continue
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full p-2 mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full p-2 mt-5 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
            <a href="#" className="text-blue-600">
              Create an account
            </a>
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
  );
}

export default SignIn;
