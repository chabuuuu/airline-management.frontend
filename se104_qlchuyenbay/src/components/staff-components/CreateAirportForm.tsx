"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import Cities from "@/cities.json";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  airportName: z.string(),
  city: z.string(),
  country: z.string(),
  description: z.string(),
});

type FormFields = z.infer<typeof schema>;

const CreateAirportForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [country, setCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [countryOptions, setCountryOptions] = useState<
    {
      name: string;
      code: string;
    }[]
  >([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

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
        setCityOptions(responseData); // Update cityOptions directly
      } catch (e) {
        console.log(e);
      }
    };
    get_all_city_by_code();
  }, [countryCode]);

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    const jsondata = JSON.stringify(data);
    console.log(jsondata);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/airport`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NzIxOTQwLTNlMWYtNDUxYy1hNTQ1LWQxMjU1MWQyMzNjOSIsInVzZXJuYW1lIjoibmd1eWVudmFuYV9zdGFmZmx2MiIsInBhc3N3b3JkIjoiQDFUaGluaEhhIiwicm9sZSI6IlN0YWZmX0xWMiIsImlhdCI6MTccm9sZSI6IlN0YWZmX0xWMiIsImlhdCI6MTcxNDYyMDQyMSwiZXhwIjoxNzE0OTQ0NDIxfQ.hlH3BzvJkvjdVr9Qi22x1UokRxktCvHHt8pHiadS52A",
      },
      data: jsondata,
    };
    console.log(config);
    try {
      const response = await axios.request(config);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-ghost  transition duration-300"
      >
        Tạo mới sân bay
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
      {showModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" min-w-[700px]  p-8 px-8 mx-auto bg-white shadow-md rounded-2xl max-w-4xl"
          >
            <h1 className="text-2xl font-bold ">Tạo mới sân bay</h1>
            <div className="divider h-1"></div>

            <div className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="arrivalAirport"
                  >
                    Quốc gia
                  </label>
                  <div>
                    <Autocomplete
                      className="w-full"
                      onChange={(_, value) => {
                        setCountry(value);
                        const selectedCountryCode = countryOptions.find(
                          (option: any) => option.name === value
                        )?.code;
                        setCountryCode(selectedCountryCode || null);
                        setCity(null);
                      }}
                      disabled={isSubmitting}
                      options={countryOptions.map((option) => option.name)}
                      value={country}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...register("country")}
                          placeholder="Departure"
                        />
                      )}
                    />
                    {errors.country && (
                      <div className="text-red-500">
                        {errors.country.message}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="arrivalAirport"
                  >
                    Thành phố
                  </label>
                  <div>
                    <Autocomplete
                      className="w-full"
                      onChange={(_, value) => setCity(value)}
                      disabled={isSubmitting || !countryCode} // Disable city if country code is not selected
                      options={cityOptions}
                      value={city}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...register("city")}
                          placeholder="City"
                        />
                      )}
                    />
                    {errors.city && (
                      <div className="text-red-500">{errors.city.message}</div>
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
                    htmlFor="airport"
                  >
                    Tên sân bay
                  </label>
                  <input
                    {...register("airportName")}
                    id="airportName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text"
                    placeholder="Sân bay"
                  />
                  {errors.airportName && (
                    <div className="text-red-500">
                      {errors.airportName.message}
                    </div>
                  )}
                </div>
                {/* <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select className="select select-bordered select-sm w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight ">
                    <option>Success</option>
                    <option>In Progress</option>
                    <option>Cancel</option>
                    <option>Not Started</option>
                  </select>
                </div> */}
              </div>
            </div>
            <div className="mb-3">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="descriptions"
                >
                  Miêu tả
                </label>
                <input
                  {...register("description")}
                  id="descriptions"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  type="text"
                  placeholder="Miêu tả"
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-ghost rounded-2xl mr-5"
              >
                Hủy
              </button>
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-2xl "
              >
                {isSubmitting ? "Loading... " : " Tạo sân bay"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateAirportForm;
