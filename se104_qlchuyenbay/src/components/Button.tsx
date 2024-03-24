import React from "react";

type inputType = {
  content: string;
  color?: string;
  textcolor?: string;
};

const Button: React.FC<inputType> = ({ content, color, textcolor }) => {
  return (
    <button className={`btn rounded-3xl ${color} ${textcolor}}`}>
      {content}
    </button>
  );
};

export default Button;
