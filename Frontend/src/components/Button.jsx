import { useState } from "react";

const Button = ({ style, method, icon, text }) => {
  const [currentIcon, setCurrentIcon] = useState(icon);

  const handleClick = () => {
    method();
  };

  return (
    <button className={`${style} flex gap-2 justify-center text-white items-center rounded-lg h-10 px-4 font-semibold `} onClick={handleClick}>
      {currentIcon ? currentIcon : null}

      {text}
    </button>
  );
};

export default Button;
