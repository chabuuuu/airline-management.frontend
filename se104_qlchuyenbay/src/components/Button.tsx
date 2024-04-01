import Link from "next/link";
import React from "react";

type inputType = {
  link: string;
  content: string;
  color?: string;
  textcolor?: string;
};

const Button: React.FC<inputType> = ({ link, content }) => {
  return (
    <Link
      href={`${link}`}
      className="btn btn-ghost bg-white rounded-3xl hover:text-white"
    >
      {content}
    </Link>
  );
};

export default Button;
