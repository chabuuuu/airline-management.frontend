"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullname: z.string(),
  birthday: z.string().transform((str) => new Date(str)),
  address: z.string(),
  phonenumber: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

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
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "https://airlane-management-backend.onrender.com/api/v1",
        options
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
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
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
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
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {errors.birthday && (
          <div className="text-red-500">{errors.birthday.message}</div>
        )}
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          {...register("phonenumber")}
          type="tel"
          id="phone"
          placeholder="123-456-7890"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
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
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div>
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
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
      >
        {isSubmitting ? "Loading... " : " Create account"}
      </button>
      <button
        type="button"
        className="w-full py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none"
      >
        Create an account with Google
      </button>
    </form>
  );
};

export default SignUpForm;
