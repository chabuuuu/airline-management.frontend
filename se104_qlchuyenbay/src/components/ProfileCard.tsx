import React from "react";

const ProfileCard: React.FC = () => {
  const profile = {
    name: "Huỳnh Nhật Minh",
    dob: "dd/mm/yyyy",
    id: "********",
    issueNumber: "100",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-6 mb-4">
        <div
          className=" bg-cover h-32 w-32"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/fW7tk0PW/plane-01-7-1.png')",
          }}
        ></div>
        <div>
          <h2 className="text-lg text-gray-900 font-semibold">
            {profile.name}
          </h2>
          <p className="text-gray-600">Ngày sinh: {profile.dob}</p>
          <p className="text-gray-600">CCCD: {profile.id}</p>
          <p className="text-gray-600">Cấp: {profile.issueNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
