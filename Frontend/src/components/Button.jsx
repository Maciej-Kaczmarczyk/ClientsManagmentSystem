import { useState } from "react";

const Button = ({ style, method, icon, text, type }) => {
  const [currentIcon, setCurrentIcon] = useState(icon);

  const handleClick = () => {
    method();
  };

  return (
    <button
      className={`${style} flex h-10 items-center justify-center gap-2 rounded-lg px-4 font-semibold text-white `}
      onClick={handleClick}
      type={type}
    >
      {currentIcon ? currentIcon : null}

      {text}
    </button>
  );
};

export default Button;
