"use client";

import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const schema = z.object({
  country: z.string().nonempty("Country is required"),
  departure: z.string().nonempty("Departure is required"),
  destination: z.string().nonempty("Destination is required"),
  date: z.string().nonempty("Date is required"),
});

type FormFields = z.infer<typeof schema>;

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [departure, setDeparture] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [country, setCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  const [countryOptions, setCountryOptions] = useState<
    {
      name: string;
      code: string;
    }[]
  >([]);

  useEffect(() => {
    const get_all_country = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/airport/country`,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        const options = responseData.map((country: any) => ({
          name: country.name,
          code: country.code,
        }));
        setCountryOptions(options);
      } catch (e) {
        console.log(e);
      }
    };
    get_all_country();
  }, []);

  useEffect(() => {
    const get_all_city_by_code = async () => {
      if (!countryCode) return;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/airport/city?country=${countryCode}`,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        console.log(responseData);
        setCityOptions(responseData);
      } catch (e) {
        console.log(e);
      }
    };
    get_all_city_by_code();
  }, [countryCode]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Form data:", data);
    const queryParams = `?departure=${encodeURIComponent(
      data.departure
    )}&destination=${encodeURIComponent(
      data.destination
    )}&date=${encodeURIComponent(data.date)}`;
    window.location.href = `/SearchingPage${queryParams}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1 min-w-[200px]">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="country"
          >
            Country
          </label>
          <Autocomplete
            className="w-full"
            onChange={(_, value) => {
              setCountry(value);
              const selectedCountryCode = countryOptions.find(
                (option) => option.name === value
              )?.code;
              setCountryCode(selectedCountryCode || null);
            }}
            disabled={isSubmitting}
            options={countryOptions.map((option) => option.name)}
            value={country}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                {...register("country")}
                placeholder="Country"
              />
            )}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            {...register("date")}
            id="date"
            type="date"
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.date && (
            <div className="text-red-500">{errors.date.message}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mb-10 gap-5">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="departure"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Departure
          </label>
          <Autocomplete
            className="w-full"
            onChange={(_, value) => setDeparture(value)}
            disabled={isSubmitting || !countryCode}
            options={cityOptions}
            value={departure}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                {...register("departure")}
                placeholder="Departure City"
              />
            )}
          />
          {errors.departure && (
            <div className="text-red-500">{errors.departure.message}</div>
          )}
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="destination"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Destination
          </label>
          <Autocomplete
            className="w-full"
            onChange={(_, value) => setDestination(value)}
            disabled={isSubmitting || !countryCode}
            options={cityOptions}
            value={destination}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                {...register("destination")}
                placeholder="Destination City"
              />
            )}
          />
          {errors.destination && (
            <div className="text-red-500">{errors.destination.message}</div>
          )}
        </div>
      </div>

      <div className="flex justify-end w-full mt-10">
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn btn-ghost w-14 rounded-full"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
