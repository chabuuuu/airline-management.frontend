"use client";

import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Cities from "@/cities.json";
import axios from "axios";

const schema = z.object({
  departure: z.string(),
  destination: z.string(),
  date: z.string(),
  flight: z.string(),
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

  useEffect(() => {
    const get_all_city_by_code = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/airport/city?country=VN`,
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
  }, []);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const queryParams = `?departure=${encodeURIComponent(
      data.departure
    )}&destination=${encodeURIComponent(
      data.destination
    )}&date=${encodeURIComponent(data.date)}&flightType=${encodeURIComponent(
      data.flight
    )}`;
    window.location.href = `/SearchingPage${queryParams}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between items-center mb-10">
        <div className="mr-5">
          <label
            htmlFor="departure"
            className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Departure
          </label>
          <div className="w-full">
            <Autocomplete
              onChange={(_, value) => setDeparture(value)}
              disabled={isSubmitting}
              options={cityOptions}
              value={departure}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("departure")}
                  sx={{ width: 200 }}
                  placeholder="Departure"
                  required
                />
              )}
            />
            {errors.departure && (
              <div className="text-red-500">{errors.departure.message}</div>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="destination"
            className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Destination
          </label>
          <div className="w-full">
            <Autocomplete
              onChange={(_, value) => setDestination(value)}
              disabled={isSubmitting}
              options={cityOptions}
              value={destination}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("destination")}
                  sx={{ width: 200 }}
                  placeholder="Destination"
                  required
                />
              )}
            />
            {errors.destination && (
              <div className="text-red-500">{errors.destination.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center ">
        <div className="w-full mb-5">
          <label
            htmlFor="date"
            className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <div>
            <input
              {...register("date")}
              id="date"
              type="date"
              required
              className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            />
            {errors.date && (
              <div className="text-red-500">{errors.date.message}</div>
            )}
          </div>
        </div>
        <div className="w-1/2 ml-5 mb-5">
          <label
            htmlFor="flight"
            className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Flights
          </label>
          <select
            {...register("flight")}
            id="flight"
            className="select select-bordered w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          >
            <option value="One way">One way</option>
            <option value="Round trip">Round trip</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end w-full mt-10">
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn btn-ghost w-14 bg-slate-200 rounded-full"
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
