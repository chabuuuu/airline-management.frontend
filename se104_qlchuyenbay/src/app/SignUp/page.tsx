import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

function SignUp() {
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="flex p-3">
          <div className="hidden lg:block">
            <img
              src="https://images.pexels.com/photos/2517931/pexels-photo-2517931.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Illustration"
              className="w-full  object-contain rounded-s-2xl"
            />
          </div>
          <div className="flex flex-col justify-center rounded-e-2xl  bg-white p-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Let's get started
            </h2>
            <SignUpForm />
            <p className="ml-5 text-sm text-gray-600 mt-3">
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
