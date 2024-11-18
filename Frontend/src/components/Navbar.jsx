import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { removeCookie } from "typescript-cookie";
import LogoutIcon from "../assets/icons/logoutIcon.svg";
import authService from "../services/authService";
import Dropdown from "./Dropdown";
import { useThemeStore } from "../stores/useThemeStore";

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

    // If the pathname doesn't match any of the navigation items, check if it starts with any of the navigation items.
    if (!activeItem) {
      navItems.forEach((item) => {
        if (pathname.startsWith(item.path)) {
          setActiveElement(item);
        }
      });
      return;
    }
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

  // if (
  //   localStorage.theme === "dark" ||
  //   (!("theme" in localStorage) &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches)
  // ) {
  //   document.documentElement.classList.add("dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  // }

  // const toggleTheme = () => {
  //   document.documentElement.classList.toggle("dark");
  //   localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
  // };

  return (
    <nav className="relative flex h-16 items-center justify-center border-b-[1px] border-zinc-200 bg-white px-8 text-textPrimary dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      <ul className="flex w-full max-w-screen-xl items-center justify-between py-4">
        <ul className="relative flex gap-10 text-sm sm:text-base">
          {/* Map through navigation items and create NavLink elements. */}
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className="relative duration-200 hover:cursor-pointer hover:text-blue-600 dark:hover:text-blue-500"
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
          className="absolute -bottom-[1px] h-[2px] w-20 bg-uiQuaternary transition-all duration-200 dark:bg-zinc-300"
          style={{
            left: "0px",
            transition: "transform 0.5s ease, width 0.5s ease",
          }}
        />

        <li className="flex items-center">
          <Dropdown>
            {/* <li
              className="px-4 py-1 text-sm hover:cursor-pointer hover:bg-uiSecondary dark:hover:bg-zinc-700 sm:text-base md:text-base"
              onClick={toggleTheme}
            >
              Toggle Theme
            </li> */}
            <li
              className="flex items-center gap-2 px-4 py-1 hover:cursor-pointer hover:bg-uiSecondary dark:hover:bg-zinc-700"
              onClick={authService.logout}
            >
              <LogoutIcon />
              <p className="text-sm sm:text-base md:text-base">Sign out</p>
            </li>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
