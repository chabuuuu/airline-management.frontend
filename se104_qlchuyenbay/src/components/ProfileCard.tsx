import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

type inputType = {
  token?: string;
};

const ProfileCard: React.FC<inputType> = ({ token }) => {
  const [profile, setProfile] = useState({
    customerId: "",
    email: "",
    phoneNumber: "",
    fullname: "",
    birthday: "",
    address: "",
    nationality: "",
    emailValidated: true,
    cccd: "",
    cccdPicture: "",
    profilePicture: "",
    createAt: "",
    updateAt: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const options = {
          method: "get",
          headers: {
            Authorization: `${token}`,
          },
          muteHttpExceptions: true,
        };

        const response = await fetch(
          "http://3.1.220.207:3001/api/v1/customer/me",
          options
        );
        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    }
    //fetchProfile();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 w-96 shadow-lg flex flex-col items-center justify-between">
      <div>
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white relative">
          <img
            className="object-cover w-full h-full"
            src={
              profile.cccdPicture
                ? profile.cccdPicture
                : "https://i.postimg.cc/fW7tk0PW/plane-01-7-1.png"
            }
            alt="Profile Picture"
          />
        </div>
        <h2 className="text-2xl mb-5 font-bold text-gray-800  flex justify-center">
          {profile.fullname}
        </h2>
        <p className="text-sm text-gray-600 mb-1">
          Date of Birth: {profile.birthday}
        </p>
        <p className="text-sm text-gray-600 mb-1">ID: {profile.cccd}</p>
        <p className="text-sm text-gray-600 mb-1">
          National: {profile.nationality}
        </p>
        <p className="text-sm text-gray-600 mb-1">Email: {profile.email}</p>
        <p className="text-sm text-gray-600 mb-1">
          Phone: {profile.phoneNumber}
        </p>
      </div>
      <footer className="bg-base-100 text-gray-600 p-4 rounded-xl w-full text-center">
        <p className="text-xs">
          Copyright © 2024 - All right reserved by UIT CSE
        </p>
      </footer>
    </div>
  );
};

export default ProfileCard;
