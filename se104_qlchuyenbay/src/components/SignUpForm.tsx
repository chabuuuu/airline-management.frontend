"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import qs from "qs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullname: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  birthday: z.string().transform((str) => new Date(str)),
  cccd: z.string(),
  cccdPicture: z.custom<File>(),
});
async function createAccount(data: Object) {
  const url = `${process.env.NEXT_PUBLIC_SERVER}/customer`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
    data: qs.stringify(data),
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      console.log(response.data.token);
    })
    .catch((error) => {
      console.log(error);
    });
}

type FormFields = z.infer<typeof schema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    createAccount(data);
  };
  return (
    <form
      className="grid grid-cols-2 gap-6 p-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Your Name
        </label>
        <input
          {...register("fullname")}
          type="text"
          id="name"
          placeholder="John"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="birthday"
          className="block text-sm font-medium text-gray-700"
        >
          Birthday
        </label>
        <input
          {...register("birthday")}
          type="date"
          id="birthday"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {errors.birthday && (
          <div className="text-red-500">{errors.birthday.message}</div>
        )}
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          CCCD
        </label>
        <input
          {...register("cccd")}
          type="text"
          id="cccd"
          placeholder="John"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="birthday"
          className="block text-sm font-medium text-gray-700"
        >
          CCCD Picture
        </label>
        <input
          {...register("cccdPicture")}
          type="file"
          id="cccdPicture"
          className="file-input file-input-bordered w-full file-input-sm rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {errors.cccdPicture && (
          <div className="text-red-500">{errors.cccdPicture?.message}</div>
        )}
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          {...register("address")}
          type="text"
          id="address"
          placeholder="123 Street, City"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          type="tel"
          id="phone"
          placeholder="123-456-7890"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="col-span-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="col-span-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
      >
        {isSubmitting ? "Loading... " : " Create account"}
      </button>
      <button
        type="button"
        className="col-span-2 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none"
      >
        Create an account with Google
      </button>
    </form>
  );
};

export default SignUpForm;
