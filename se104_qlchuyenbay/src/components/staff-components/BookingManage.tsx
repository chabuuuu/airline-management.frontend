import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const BookingManage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllBookingListOfStaff = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/booking/list`;
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
        console.log(session?.user.token);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getAllBookingListOfStaff();
  });
  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-2xl font-semibold">
          Ticket Booked DashBoard
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 my-3">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className="text-2xl font-semibold inline-flex items-center">
            Airplane Table Management
          </div>
        </div>
        <div className="flex flex-col collapse-content">
          <div className=" bg-white rounded-2xl p-5 my-3">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManage;
