"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";

const schema = z.object({
  username: z.string().nonempty("User name required"),
  email: z.string().nonempty("Email required"),
  phoneNumber: z.string().nonempty("Phone Number required"),
  password: z.string().nonempty("Password required"),
  birthday: z.string().nonempty("Birthday required"),
  role: z.string().default("Staff_LV2"),
});

type FormFields = z.infer<typeof schema>;

function CreateStaffForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    event?.preventDefault();
    let url = `${process.env.NEXT_PUBLIC_SERVER}/staff`;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: session?.user.token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    try {
      const response = await axios.request(config);
      console.log(response);
      toast.success("Create Staff Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e: any) {
      const messages = e.response.data.message;
      console.log(e);
      messages.map((m: any) => {
        toast.error(m || "An error occurred", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
  };
  const [createStaffModal, setCreateStaffModal] = useState<boolean>(false);

  return (
    <div>
      <div>
        <button
          onClick={() => setCreateStaffModal(!createStaffModal)}
          className="btn btn-ghost transition duration-300"
        >
          Create Staff
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </button>
      </div>
      {createStaffModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-2xl">Create Staff Form</h3>

              <button
                onClick={() => {
                  setCreateStaffModal(!createStaffModal);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="w-5 h-5 hover:opacity-60 hover:scale-110"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
            <form
              className="space-y-4  z-50 w-full "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between gap-5">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    id="username"
                    placeholder="John"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.username && (
                    <div className="text-red-500">
                      {errors.username.message}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Birthday
                  </label>
                  <input
                    {...register("birthday")}
                    type="date"
                    id="birthday"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.birthday && (
                    <div className="text-red-500">
                      {errors.birthday.message}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  id="phoneNumber"
                  placeholder="123-456-7890"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.phoneNumber && (
                  <div className="text-red-500">
                    {errors.phoneNumber.message}
                  </div>
                )}
              </div>
              <div className="mt-10 mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="text"
                  id="email"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                />
                {errors.username && (
                  <div className="text-red-500">{errors.username.message}</div>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  autoComplete="on"
                  placeholder="******"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-2  bg-black text-white rounded hover:bg-gray-900"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateStaffForm;
