import React, { useEffect, useRef, useState } from "react";
import SettingsIcon from "../assets/icons/settingsIcon.svg";
import { useSpring, animated } from "react-spring";

const Dropdown = ({ children }) => {
  const [optionWindow, setOptionWindow] = useState(false);
  const toggleOptionWindow = () => {
    setOptionWindow(!optionWindow);
  };

  const dropdownRef = useRef();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOptionWindow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Define the animation properties using useSpring
  const dropdownAnimation = useSpring({
    opacity: optionWindow ? 1 : 0,
    transform: optionWindow ? "translateY(0)" : "translateY(-10px)",
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        onClick={toggleOptionWindow}
        className="flex items-center gap-1 duration-200 hover:cursor-pointer hover:text-blue-600"
      >
        <SettingsIcon />
        <p className="hidden text-base font-normal md:block">Settings</p>
      </div>
      {optionWindow ? (
        <animated.ul
          style={{
            ...dropdownAnimation,
          }}
          className="dropdown-enter absolute top-[200%] right-0 z-10 h-fit w-56 rounded-lg border-[1px] bg-white py-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
        >
          {children}
        </animated.ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
