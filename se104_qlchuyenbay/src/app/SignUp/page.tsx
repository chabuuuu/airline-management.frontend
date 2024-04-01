import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

function SignUp() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:p-12 bg-gray-100 rounded-lg shadow-lg">
          <div className="hidden lg:block">
            <img
              src="https://i.postimg.cc/9f1FPGGC/image-2024-03-26-170516871.png"
              alt="Illustration"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
              Let's get started
            </h2>
            <SignUpForm />
            <p className="text-sm text-gray-600 mt-3">
              Already have an account?{" "}
              <Link href="/SignIn" className="text-indigo-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
