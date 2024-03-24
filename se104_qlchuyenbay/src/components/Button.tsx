import React from "react";

type inputType = {
  content: string;
  color?: string;
};

const Button: React.FC<inputType> = ({ content, color }) => {
  return <button className={`btn rounded-3xl ${color}`}>{content}</button>;
};

export default Button;
