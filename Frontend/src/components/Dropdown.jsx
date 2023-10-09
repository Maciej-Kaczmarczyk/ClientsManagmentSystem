import React, { useEffect, useRef, useState } from "react";
import SettingsIcon from "../assets/icons/settingsIcon.svg";

const Dropdown = ({children}) => {
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
      <div onClick={toggleOptionWindow} className="flex items-center gap-1 hover:cursor-pointer">
        <SettingsIcon />
        <p className="hidden md:block text-base font-normal">Settings</p>
      </div>
      {optionWindow ? (
        <div ref={popupRef}>
          <div className="absolute top-[180%] right-0 z-10 h-fit w-56 rounded-lg border-[1px] bg-uiPrimary py-4 shadow-lg">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
