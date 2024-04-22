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
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-ghost  transition duration-300"
      >
        New Flight
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 314.84 250.19"
        >
          <path
            d="M323.22,474.64C300,477,278.74,458.46,255.55,462.17c-14.58,3.81-29,8.33-43.45,12.5-9.22,2.66-11.55.37-12.66-9.23-1.62-14,1.48-25.2,15.2-31.62,22-9.2,16.35-28.27,16.68-48-28.92,8.1-55.1,15.59-83.48,23.61-6.83,1.92-10.77-.61-11-7.74,1-12.32-5.23-31.48,7-39.2q40.23-23.57,81-46.29c5.14-2.87,6.9-6.19,6.64-11.92-.46-10.28-.05-20.59-.15-30.88-2-25.27,26.28-68.16,49.63-36.94,25,29.88-.25,73.4,21.2,81.24,9.37,4.59,18.21,10.26,28.36,16.09-46.6,32.29-50.16,101.82-6.84,138Z"
            transform="translate(-136.11 -225.51)"
          />
          <path
            d="M451,407c-.54,91.53-141.14,91.31-140.44-.74C310.63,314,451.28,314.79,451,407Z"
            transform="translate(-136.11 -225.51)"
          />
          <path
            className="fill-white"
            d="M408.6,414H352.86c-9.36.14-9.39-15.18,0-15H408.6a7.11,7.11,0,0,1,7.12,7.11A7.2,7.2,0,0,1,408.6,414Z"
            transform="translate(-136.11 -225.51)"
          />
          <path
            className="fill-white"
            d="M373.21,434.3V378.57c-.14-9.37,15.18-9.39,15,0V434.3a7.12,7.12,0,0,1-7.12,7.12A7.21,7.21,0,0,1,373.21,434.3Z"
            transform="translate(-136.11 -225.51)"
          />
        </svg>
      </button>
      {showModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" min-w-[900px]  p-8 px-8 mx-auto bg-white shadow-md rounded-2xl max-w-4xl"
          >
            <h1 className="text-2xl font-bold ">Tạo chuyến bay</h1>
            <div className="divider h-1"></div>

            <div className="mb-3">
              <h2 className="text-xl font-semibold mb-6">
                Thông tin chuyến bay
              </h2>

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
                    <div className="text-red-500">
                      {errors.airlines.message}
                    </div>
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
                    <div className="text-red-500">
                      {errors.airplaneModel.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-3">
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

            <div className="mb-3">
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
                      <div className="text-red-500">
                        {errors.departure.message}
                      </div>
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
                      <div className="text-red-500">
                        {errors.destination.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
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
            <div className="mb-3">
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

            <div className="mb-3">
              {intermediateAirport.map((_, index) => (
                <div className="flex mb-3" key={index}>
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

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-ghost rounded-2xl mr-5"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-2xl "
              >
                {isSubmitting ? "Loading... " : " Tạo chuyến bay"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateFlightForm;
