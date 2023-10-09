import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { removeCookie } from "typescript-cookie";
import LogoutIcon from "../assets/icons/logoutIcon.svg";
import authService from "../services/authService";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Clients", path: "/clients" },
    { name: "Orders", path: "/orders" },
  ];

  const [activeElement, setActiveElement] = useState(null);
  const underline = useRef(null);
  const { pathname } = useLocation();
  const navRef = useRef([]);

  // Update the active navigation element and its underline position when the pathname changes.
  useEffect(() => {
    if (!pathname) return;
    const activeItem = navItems.find((item) => item.path === pathname);
    setActiveElement(activeItem);
    const activeRef = navRef.current.find(
      (ref) => ref.innerText === activeItem.name,
    );
    const { width, left } = activeRef.getBoundingClientRect();
    updateUnderlinePosition(width, left);
  }, [pathname]);

  // Update the underline position when the window is resized.
  useEffect(() => {
    const handleResize = () => {
      if (activeElement) {
        const activeRef = navRef.current.find(
          (ref) => ref.innerText === activeElement.name,
        );
        const { width, left } = activeRef.getBoundingClientRect();
        updateUnderlinePosition(width, left);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeElement]);

  // Function to update the underline's width and position.
  const updateUnderlinePosition = (width, left) => {
    if (underline.current) {
      underline.current.style.width = `${width}px`;
      underline.current.style.transform = `translateX(${left}px)`;
    }
  };

  return (
    <nav className="relative flex h-16 items-center justify-center bg-uiPrimary px-8 text-textPrimary shadow-sm">
      <ul className="flex w-full max-w-screen-xl items-center justify-between py-4">
        <ul className="relative flex gap-10 text-sm sm:text-base">
          {/* Map through navigation items and create NavLink elements. */}
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className="relative"
                to={item.path}
                onClick={updateUnderlinePosition}
                ref={(el) => (navRef.current[index] = el)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Underline element to indicate the active navigation item. */}
        <li
          ref={underline}
          className="absolute -bottom-[1px] h-[2px] w-20 bg-uiQuaternary transition-all duration-200"
          style={{
            left: "0px",
            transition: "transform 0.5s ease, width 0.5s ease",
          }}
        />

        <li className="flex items-center">
          <Dropdown>
            <li
              className="flex items-center gap-2 px-4 py-1 hover:cursor-pointer hover:bg-uiSecondary"
              onClick={authService.logout}
            >
              <LogoutIcon />
              <p className="text-sm sm:text-base md:text-base">
                Sign out
              </p>
            </li>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
