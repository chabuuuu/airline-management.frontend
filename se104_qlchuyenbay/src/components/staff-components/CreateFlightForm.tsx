import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type IntermediateAirport = {
  airport: string;
  time: string;
  note: string;
};

type FormFields = {
  airlines: string;
  airplaneModel: string;
  price: string;
  departureAirportId: string;
  arrivalAirportId: string;
  totalBusinessSeat: string;
  totalEconomySeat: string;
  date: string;
};

const CreateFlightForm: React.FC = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<FormFields>({
    airlines: "",
    airplaneModel: "",
    price: "",
    departureAirportId: "",
    arrivalAirportId: "",
    totalBusinessSeat: "",
    totalEconomySeat: "",
    date: "",
  });

  const [departure, setDeparture] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [intermediateAirports, setIntermediateAirports] = useState<
    IntermediateAirport[]
  >([]);
  const [airportOptions, setAirportOptions] = useState<
    { airportId: string; airportName: string }[]
  >([]);

  useEffect(() => {
    const getAllAirports = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/airport`,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data.data;
        const options = responseData.map((airport: any) => ({
          airportId: airport.airportId,
          airportName: airport.airportName,
        }));
        setAirportOptions(options);
      } catch (e) {
        console.error(e);
      }
    };
    getAllAirports();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...formData, intermediateAirports };
    console.log(data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/flight`,
      headers: {
        Authorization: session?.user.token,
      },
      data: JSON.stringify(data),
    };
    try {
      const response = await axios.request(config);
      console.log(response);
      toast.success("Create new flight succesful!", {
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
      toast.error(messages || "An error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddIntermediateAirport = () => {
    if (intermediateAirports.length < 2) {
      setIntermediateAirports([
        ...intermediateAirports,
        { airport: "", time: "", note: "" },
      ]);
    }
  };

  const handleIntermediateAirportChange = (
    index: number,
    field: keyof IntermediateAirport,
    value: string
  ) => {
    const updatedIntermediateAirports = [...intermediateAirports];
    updatedIntermediateAirports[index][field] = value;
    setIntermediateAirports(updatedIntermediateAirports);
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-ghost transition duration-300"
      >
        New
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
            onSubmit={onSubmit}
            className="min-w-[900px] p-8 px-8 mx-auto bg-white shadow-md rounded-2xl max-w-4xl"
          >
            <h1 className="text-2xl font-bold">Tạo chuyến bay</h1>
            <div className="divider h-1"></div>
            <div className="mb-3">
              <h2 className="text-xl font-semibold mb-6">
                Thông tin chuyến bay
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="airlines"
                  >
                    Hãng máy bay
                  </label>
                  <input
                    id="airlines"
                    name="airlines"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    type="text"
                    placeholder="Hãng máy bay"
                    value={formData.airlines}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="airplaneModel"
                  >
                    Loại máy bay
                  </label>
                  <input
                    id="airplaneModel"
                    name="airplaneModel"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text"
                    placeholder="Loại máy bay"
                    value={formData.airplaneModel}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Giá vé
                  </label>
                  <input
                    id="price"
                    name="price"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text"
                    placeholder="Giá vé"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Ngày giờ
                  </label>
                  <input
                    id="date"
                    name="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="datetime-local"
                    placeholder="Ngày giờ"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="departure"
                  >
                    Sân bay đi
                  </label>
                  <Autocomplete
                    onChange={(_, value) => {
                      setDeparture(value);
                      const id = airportOptions.find(
                        (op) => op.airportName === value
                      )?.airportId;
                      setFormData({
                        ...formData,
                        departureAirportId: id || "",
                      });
                    }}
                    options={airportOptions.map((op) => op.airportName)}
                    value={departure}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="departure"
                        name="departure"
                        placeholder="Sân bay đi"
                      />
                    )}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="destination"
                  >
                    Sân bay đến
                  </label>
                  <Autocomplete
                    onChange={(_, value) => {
                      setDestination(value);
                      const id = airportOptions.find(
                        (op) => op.airportName === value
                      )?.airportId;
                      setFormData({ ...formData, arrivalAirportId: id || "" });
                    }}
                    options={airportOptions.map((op) => op.airportName)}
                    value={destination}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="destination"
                        name="destination"
                        placeholder="Sân bay đến"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {/* <div className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="totalBusinessSeat"
                  >
                    Số ghế hạng thương gia
                  </label>
                  <input
                    id="totalBusinessSeat"
                    name="totalBusinessSeat"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    type="text"
                    placeholder="Số ghế hạng thương gia"
                    value={formData.totalBusinessSeat}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="totalEconomySeat"
                  >
                    Số ghế hạng phổ thông
                  </label>
                  <input
                    id="totalEconomySeat"
                    name="totalEconomySeat"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    type="text"
                    placeholder="Số ghế hạng phổ thông"
                    value={formData.totalEconomySeat}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div> */}
            <div className="mb-3">
              <h2 className="text-xl font-semibold mb-6">Sân bay trung gian</h2>
              <div className="flex">
                <div className="w-20">
                  <span className="flex justify-center items-center text-gray-700 text-sm font-bold">
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
              {intermediateAirports.map((inter, index) => (
                <div className="flex mb-3" key={index}>
                  <div className="w-20 flex justify-center items-center">
                    <span>{index + 1}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-5 w-full">
                    <input
                      onChange={(e) =>
                        handleIntermediateAirportChange(
                          index,
                          "airport",
                          e.target.value
                        )
                      }
                      id={`airport-${index}`}
                      className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      type="text"
                      placeholder="Sân bay trung gian"
                    />
                    <input
                      onChange={(e) =>
                        handleIntermediateAirportChange(
                          index,
                          "time",
                          e.target.value
                        )
                      }
                      id={`time-${index}`}
                      className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      type="text"
                      placeholder="Thời gian"
                    />
                    <input
                      onChange={(e) =>
                        handleIntermediateAirportChange(
                          index,
                          "note",
                          e.target.value
                        )
                      }
                      id={`note-${index}`}
                      className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      type="text"
                      placeholder="Ghi chú"
                    />
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={handleAddIntermediateAirport}
                  className="text-gray-500 text-sm font-bold mb-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center focus:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIntermediateAirports([]);
                  setShowModal(false);
                }}
                className="btn btn-ghost rounded-2xl mr-5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateFlightForm;
