import { Customer } from "@/type";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const InformationCard: React.FC<{ passengerId: string }> = ({
  passengerId,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCustomerData = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/customer/${passengerId}`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        setCustomer(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCustomerData();
  }, [passengerId, session]);

  return (
    <div>
      <div className="tooltip" data-tip="Information">
        <button
          onClick={() => setShowModal(!showModal)}
          className="hover:bg-blue-100 rounded-lg text-blue-500 btn-xs font-medium"
        >
          {customer?.fullname || "Loading..."}
        </button>
        {showModal && (
          <div
            onClick={() => setShowModal(!showModal)}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            >
              <div className="flex  items-center mb-4">
                <img
                  className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
                  src={customer?.profilePicture || customer?.cccdPicture}
                  alt="Avatar"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {customer?.fullname}
                  </h2>
                  <p className="text-gray-500">{customer?.email}</p>
                </div>
              </div>

              <div className="flex flex-col justify-start">
                <p>
                  <span className="font-semibold text-gray-700">CCCD:</span>
                  {customer?.cccd}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Phone:</span>
                  {customer?.phoneNumber}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">Birthday:</span>
                  {customer?.birthday}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Address:</span>
                  {customer?.address}, {customer?.nationality}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationCard;
