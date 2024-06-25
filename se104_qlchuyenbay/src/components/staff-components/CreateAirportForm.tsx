"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";

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

  const onSubmit: SubmitHandler<FormFields> = async (data: any, event) => {
    event?.preventDefault();

    try {
      const response = await fetch(`/api/auth/CreateAirport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const mss = await response.json();
      console.log(mss);
      if (!(mss.statusCode === 200)) {
        toast.error(mss.message.message[0], {
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
        toast.success("Create new Airport succesful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setInterval(() => {
          window.location.reload();
        }, 3000);
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

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <ToastContainer />
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-ghost  transition duration-300"
      >
        Create new airport
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
      {showModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" min-w-[600px]  p-8 px-8 mx-auto bg-white shadow-md rounded-2xl max-w-5xl"
          >
            <h1 className="text-2xl font-bold ">Tạo mới sân bay</h1>
            <div className="divider h-1"></div>

            <div className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold "
                    htmlFor="arrivalAirport"
                  >
                    <p className=" mb-2 ">Country</p>
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
                            size="small"
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
                  </label>
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="arrivalAirport"
                  >
                    <p className=" mb-2 ">City</p>
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
                            size="small"
                            {...register("city")}
                            placeholder="City"
                          />
                        )}
                      />
                      {errors.city && (
                        <div className="text-red-500">
                          {errors.city.message}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="grid grid-cols-1 gap-5">
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
                  className="shadow  appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight place-content-start "
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
                className="btn btn-ghost border-neutral-400 rounded-2xl mr-5"
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
