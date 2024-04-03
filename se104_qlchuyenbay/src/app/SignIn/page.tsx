import SearchForm from "@/components/SearchForm";
import SignInForm from "@/components/SignInForm";
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
          <div className="flex-grow max-w-md bg-white p-8 rounded-s-2xl shadow-lg ">
            <h2 className="text-2xl font-bold mb-5 text-indigo-900">
              Welcome, <br /> sign in to continue
            </h2>
            <SignInForm />

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/SignUp"
                className=" text-sm text-blue-600 mt-5 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
          <div className="flex w-96 ">
            <div
              className="h-full w-full bg-cover rounded-e-2xl justify-center"
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
