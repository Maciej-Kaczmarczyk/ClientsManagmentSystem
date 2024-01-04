import { useState } from "react";

interface ButtonProps {
  style: string;
  method: () => void;
  icon?: JSX.Element | string;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = (ButtonProps: ButtonProps) => {
  const [currentIcon, setCurrentIcon] = useState(ButtonProps.icon);

  const handleClick = () => {
    ButtonProps.method();
  };

  return (
    <button
      className={`${ButtonProps.style} flex h-9 items-center justify-center gap-2 rounded-lg px-4 font-semibold text-white duration-200 focus:bg-blue-500`}
      onClick={handleClick}
      type={ButtonProps.type ? ButtonProps.type : "button"}
    >
      {currentIcon ? currentIcon : null}

      {ButtonProps.text}
    </button>
  );
};

export default Button;
