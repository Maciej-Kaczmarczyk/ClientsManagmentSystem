import { useEffect } from "react";


// This hook is used to detect if a user clicks outside of a component. It takes in a ref and a callback function. The ref is used to detect if the user clicks outside of the component. The callback function is called when the user clicks outside of the component.

export const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
};
