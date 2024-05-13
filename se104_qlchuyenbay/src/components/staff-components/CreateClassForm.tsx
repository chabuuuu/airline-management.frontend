import { useState, useEffect } from "react";
import axios from "axios";

const CreateClassForm = () => {
  const [className, setClassName] = useState("");
  const [color, setColor] = useState("");
  const [priceBonusInterest, setPriceBonusInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let data = {
      className: className,
      color: color,
      priceBonusInterest: parseFloat(priceBonusInterest),
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/ticket-class/create`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMTEiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJAMVRoaW5oSGEiLCJyb2xlIjoiU3RhZmZfTFYxIiwiaWF0IjoxNzE1MDQ2NTAyLCJleHAiOjE3MTUzNzA1MDJ9.jIpNTIColQSM4rY5D7jJVPlMHllHZtGABkO3TxqMJC8",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="collapse bg-slate-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-semibold">
        Create new ticket class
      </div>
      <div className="collapse-content ">
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="className"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Class Name
              </label>
              <input
                id="className"
                type="text"
                placeholder="Enter class name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="input"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                htmlFor="color"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Color
              </label>
              <input
                id="color"
                type="text"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3">
              <label
                htmlFor="priceBonusInterest"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Price Bonus Interest
              </label>
              <input
                id="priceBonusInterest"
                type="number"
                placeholder="Enter price bonus interest"
                value={priceBonusInterest}
                onChange={(e) => setPriceBonusInterest(e.target.value)}
                className="input"
              />
            </div>
            <div className="w-full md:w-1/2 items-end flex justify-end  px-3">
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Creating..." : "Create Class"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassForm;
