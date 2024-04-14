"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import Cities from "@/cities.json";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  airlines: z.string(),
  airplaneModel: z.string(),
  departure: z.string(),
  destination: z.string(),
  price: z.string(),
  total_business_seat: z.string(),
  total_economy_seat: z.string(),
  date: z.string(),
  flight: z.string(),
  intermediateAirport: z.string(),
  intermediateAirportTime: z.string(),
  intermediateAirportNote: z.string(),
});

type FormFields = z.infer<typeof schema>;

const CreateFlightForm = () => {
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
  const [intermediateAirport, setIntermediateAirport] = useState<string[]>([]);

  const handleAddintermediateAirport = () => {
    console.log(intermediateAirport);
    if (intermediateAirport.length < 2) {
      setIntermediateAirport([...intermediateAirport, ""]);
    }
  };

  useEffect(() => {
    const options = Cities.map((city) => city.name);
    setCityOptions(options);
  }, []);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 px-8 mx-auto bg-white shadow-md rounded-2xl max-w-4xl"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Tạo chuyến bay</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6">Thông tin chuyến bay</h2>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="airline"
            >
              Hãng máy bay
            </label>
            <input
              {...register("airlines")}
              id="airline"
              className=" border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Hãng máy bay"
            />
            {errors.airlines && (
              <div className="text-red-500">{errors.airlines.message}</div>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="flightCode"
            >
              Loại máy bay
            </label>
            <input
              {...register("airplaneModel")}
              id="flightCode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              placeholder="Mã chuyến bay"
            />
            {errors.airplaneModel && (
              <div className="text-red-500">{errors.airplaneModel.message}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="airline"
            >
              Giá vé
            </label>
            <input
              {...register("price")}
              id="airline"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              placeholder="Giá vé"
            />
            {errors.price && (
              <div className="text-red-500">{errors.price.message}</div>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="flightCode"
            >
              Ngày giờ
            </label>
            <input
              {...register("date")}
              id="flightCode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="datetime-local"
              placeholder="Ngày giờ"
            />
            {errors.date && (
              <div className="text-red-500">{errors.date.message}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="arrivalAirport"
            >
              Sân bay đi
            </label>
            <div>
              <Autocomplete
                className="w-full"
                onChange={(_, value) => setDeparture(value)}
                disabled={isSubmitting}
                options={cityOptions}
                value={departure}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("departure")}
                    placeholder="Departure"
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="arrivalAirport"
            >
              Sân bay đến
            </label>
            <div>
              <Autocomplete
                className="w-full"
                onChange={(_, value) => setDestination(value)}
                disabled={isSubmitting}
                options={cityOptions}
                value={destination}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("destination")}
                    placeholder="Destination"
                  />
                )}
              />
              {errors.destination && (
                <div className="text-red-500">{errors.destination.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstClassSeats"
            >
              Số ghế hạng 1
            </label>
            <input
              {...register("total_business_seat")}
              id="firstClassSeats"
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight "
              type="text"
              placeholder="Số ghế hạng 1"
            />
            {errors.total_business_seat && (
              <div className="text-red-500">
                {errors.total_business_seat.message}
              </div>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="secondClassSeats"
            >
              Số ghế hạng 2
            </label>
            <input
              {...register("total_economy_seat")}
              id="secondClassSeats"
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight "
              type="text"
              placeholder="Số ghế hạng 2"
            />
            {errors.total_economy_seat && (
              <div className="text-red-500">
                {errors.total_economy_seat.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6">Sân bay trung gian</h2>

        <div className="flex">
          <div className="w-20">
            <span className="flex justify-center items-center text-gray-700 text-sm font-bold  ">
              STT
            </span>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full">
            <span className="block text-gray-700 text-sm font-bold">
              Sân bay trung gian
            </span>
            <span className="block text-gray-700 text-sm font-bold">
              Thời gian
            </span>
            <span className="block text-gray-700 text-sm font-bold">
              Ghi chú
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {intermediateAirport.map((_, index) => (
          <div className="flex mb-5" key={index}>
            <div className="w-20 flex justify-center items-center">
              <span>{index + 1}</span>
            </div>
            <div className="grid grid-cols-3 gap-5 w-full">
              <div className="">
                <input
                  {...register(`intermediateAirport`)}
                  id={`airport-${index}`}
                  className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                  type="text"
                  placeholder="Sân bay trung gian"
                />
                {errors.intermediateAirport && (
                  <div className="text-red-500">
                    {errors.intermediateAirport.message}
                  </div>
                )}
              </div>

              <div className="">
                <input
                  {...register(`intermediateAirportTime`)}
                  id={`time-${index}`}
                  className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                  type="text"
                  placeholder="Thời gian"
                />
                {errors.intermediateAirportTime && (
                  <div className="text-red-500">
                    {errors.intermediateAirportTime.message}
                  </div>
                )}
              </div>

              <div className="">
                <input
                  {...register(`intermediateAirportNote`)}
                  id={`note-${index}`}
                  className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                  type="text"
                  placeholder="Ghi chú"
                />
                {errors.intermediateAirportNote && (
                  <div className="text-red-500">
                    {errors.intermediateAirportNote.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={handleAddintermediateAirport}
            className="text-gray-500 text-sm font-bold mb-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center  focus:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full "
      >
        {isSubmitting ? "Loading... " : " Tạo chuyến bay"}
      </button>
    </form>
  );
};

export default CreateFlightForm;
