import React, { useEffect, useRef, useState } from "react";
import SettingsIcon from "../assets/icons/settingsIcon.svg";

const Dropdown = ({ children }) => {
  const [optionWindow, setOptionWindow] = useState(false);
  const toggleOptionWindow = () => {
    setOptionWindow(!optionWindow);
  };

  const popupRef = useRef();

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOptionWindow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={toggleOptionWindow}
        className="flex items-center gap-1 hover:cursor-pointer hover:text-blue-600 duration-200"
      >
        <SettingsIcon />
        <p className="hidden text-base font-normal md:block">Settings</p>
      </div>
      {optionWindow ? (
        <ul ref={popupRef}>
          <div className="absolute top-[200%] right-0 z-10 h-fit w-56 rounded-lg border-[1px] bg-white py-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            {children}
          </div>
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
