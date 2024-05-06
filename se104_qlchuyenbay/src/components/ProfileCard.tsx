import axios from "axios";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface Profile {
  customerId: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  birthday: string;
  address: string;
  nationality: string;
  emailValidated: boolean;
  cccd: string;
  cccdPicture: string;
  profilePicture: string;
  createAt: string;
  updateAt: string;
}

interface ProfileCardProps {
  CUSTOMER_TOKEN: string | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ CUSTOMER_TOKEN }) => {
  const [profile, setProfile] = useState<Profile>({
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
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/customer/me`,
          {
            headers: {
              Authorization: `${CUSTOMER_TOKEN}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        // Handle error properly, e.g., show a message to the user
      }
    };
    fetchProfile();
  }, [CUSTOMER_TOKEN]);

  const handleChangeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle file change here
  };

  const handleOnsubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement form submit logic here
  };

  return (
    <div className="bg-white rounded-xl px-10 pt-10 shadow-lg flex flex-col justify-between min-w-72">
      <div>
        <div>
          <div className="w-28 h-28 mx-auto  rounded-full overflow-hidden border-4 border-white relative">
            <img
              className="object-cover w-full h-full"
              src={
                profile.cccdPicture ||
                "https://i.postimg.cc/fW7tk0PW/plane-01-7-1.png"
              }
              alt="Profile Picture"
            />
          </div>
        </div>

        <h2 className="text-3xl mb-5 font-bold text-gray-800 text-center">
          {profile.fullname}
        </h2>
        <div className="bg-gray-200 p-2 rounded-lg my-3">
          <p className="text-base font-medium">Basic Details</p>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Date of Birth</span> <br />
          <span className="text-sm">{profile.birthday}</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Address</span> <br />
          <span className="text-sm">
            {profile.address}, {profile.nationality}
          </span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Identification</span> <br />
          <span className="text-sm">{profile.cccd}</span>
        </p>

        <div className="bg-gray-200 p-2 rounded-lg my-3">
          <p className="text-base font-medium">Contact Information</p>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Email</span> <br />
          <span className="text-sm">{profile.email}</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Phone</span> <br />
          <span className="text-sm">{profile.phoneNumber}</span>
        </p>
      </div>
      <button className="btn btn-ghost">Edit profile</button>
    </div>
  );
};

export default ProfileCard;
