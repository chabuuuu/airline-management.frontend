"use client";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
import { GoogleSignUpButton } from "./GoogleSignUpButton";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase letter, number, and special character"
    ),
  fullname: z.string().nonempty("Name is required"),
  address: z.string(),
  nationality: z.string().default("VN"),
  phoneNumber: z.string(),
  birthday: z.string(),
  cccd: z.string(),
  cccdPicture: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .transform(async (files) => {
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("image", files[0], files[0].name);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/customer/upload-profile-picture`,
          formData
        );
        return response.data.picture_url;
      }
    })
    .default("https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"),
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

  const [showModal, setShowModal] = useState(false);
  const [cccdPicture, setCccdPicture] = useState<string>("");

  const [verifiedEmail, setVerifiedEmail] = useState<string>("");
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormFields> = async (data, event) => {
    try {
      event?.preventDefault();

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const mss = await response.json();
      console.log(mss);

      if (!(mss.statusCode === 200)) {
        toast.error(mss.message.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setVerifiedEmail(data.email);
        setCreateSuccess(true);
        toast.success(
          "Register succesful! Please verified your email to login.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    } catch (e: any) {
      const messages = e.response.data.message;
      console.log(e.response.data.message);
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
      console.log(e);
    }
  };

  useEffect(() => {
    const verifiedEmailHandle = async () => {
      console.log(JSON.stringify({ email: verifiedEmail }));
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/customer/send-verify-email`,
        headers: {},
        data: JSON.stringify({ email: verifiedEmail }),
      };
      try {
        const response = await axios.request(config);
        console.log(response);
        setCreateSuccess(false);
        setVerifiedEmail("");
      } catch (e: any) {
        console.log(e);
      }
    };

    if (createSuccess) verifiedEmailHandle();
  }, [verifiedEmail, createSuccess]);

  return (
    <div>
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
          {errors.fullname && (
            <div className="text-red-500">{errors.fullname.message}</div>
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
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.birthday && (
            <div className="text-red-500">{errors.birthday.message}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
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
          <label className="block text-sm font-medium text-gray-700">
            CCCD Picture
          </label>
          <input
            {...register("cccdPicture")}
            type="file"
            id="cccdPicture"
            className="file-input file-input-bordered w-full file-input-sm rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
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
        <div className="col-span-2">
          <GoogleSignUpButton />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
