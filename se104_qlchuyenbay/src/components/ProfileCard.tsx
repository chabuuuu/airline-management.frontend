import React from "react";

const ProfileCard: React.FC = () => {
  const profile = {
    name: "Huỳnh Nhật Minh",
    dob: "dd/mm/yyyy",
    id: "********",
    issueNumber: "100",
    email: "ducnguyenkudo@gmail.com",
    phone: "0787071810",
  };

  return (
    <div className="bg-white rounded-xl p-6 w-96 shadow-lg flex flex-col items-center justify-between">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white relative">
          <img
            className="object-cover w-full h-full"
            src="https://i.postimg.cc/fW7tk0PW/plane-01-7-1.png"
            alt="Profile Picture"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{profile.name}</h2>
        <p className="text-sm text-gray-600 mb-1">
          Date of Birth: {profile.dob}
        </p>
        <p className="text-sm text-gray-600 mb-1">ID: {profile.id}</p>
        <p className="text-sm text-gray-600 mb-1">Email: {profile.email}</p>
        <p className="text-sm text-gray-600 mb-1">Phone: {profile.phone}</p>
        <p className="text-sm text-gray-600 mb-1">
          Issue Number: {profile.issueNumber}
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
