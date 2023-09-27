import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { removeCookie } from "typescript-cookie";
import LogoutIcon from "../assets/icons/logoutIcon.svg";
import authService from "../services/authService";

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
    const activeRef = navRef.current.find((ref) => ref.innerText === activeItem.name);
    const { width, left } = activeRef.getBoundingClientRect();
    updateUnderlinePosition(width, left);
  }, [pathname]);

  // Update the underline position when the window is resized.
  useEffect(() => {
    const handleResize = () => {
      if (activeElement) {
        const activeRef = navRef.current.find((ref) => ref.innerText === activeElement.name);
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
    <nav className="flex justify-center items-center h-16 bg-uiPrimary text-textPrimary relative shadow-sm px-8">
      <div className="flex w-full justify-between items-center max-w-screen-xl py-4">
        <ul className="flex gap-10 relative text-xs sm:text-sm md:text-base">
          {/* Map through navigation items and create NavLink elements. */}
          {navItems.map((item, index) => (
            <NavLink className="relative" key={index} to={item.path} onClick={updateUnderlinePosition} ref={(el) => (navRef.current[index] = el)}>
              {item.name}
            </NavLink>
          ))}
        </ul>
        {/* Underline element to indicate the active navigation item. */}
        <div ref={underline} className="h-[2px] w-20 bg-uiQuaternary absolute -bottom-[1px] transition-all duration-200" style={{ left: "0px", transition: "transform 0.5s ease, width 0.5s ease" }} />
        <div className="flex items-center gap-2 hover:cursor-pointer" onClick={authService.logout}>
          <p className="hidden sm:block text-xs sm:text-sm md:text-base">Logout</p>
          <LogoutIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
