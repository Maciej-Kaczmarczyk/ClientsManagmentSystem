import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

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

  useEffect(() => {
    if (!pathname) return;
    const activeItem = navItems.find((item) => item.path === pathname);
    setActiveElement(activeItem);
    const activeRef = navRef.current.find((ref) => ref.innerText === activeItem.name);
    const { width, left } = activeRef.getBoundingClientRect();
    underline.current.style.width = `${width}px`;
    underline.current.style.transform = `translateX(${left}px)`;
  }, []);

  const updateUnderlinePosition = (event) => {
    setActiveElement(event.target.innerText);
    const { width, left } = event.target.getBoundingClientRect();
    underline.current.style.width = `${width + 10}px`;
    underline.current.style.transform = `translateX(${left - 5}px)`;
  };

  return (
    <nav className="flex justify-center items-center h-16 bg-white text-black relative shadow-sm">
      <div className="flex w-full justify-between items-center max-w-screen-xl py-4">
        <ul className="flex gap-10 relative">
          {navItems.map((item, index) => (
            <NavLink className="relative" key={index} to={item.path} onClick={updateUnderlinePosition} ref={(el) => (navRef.current[index] = el)}>
              {item.name}
            </NavLink>
          ))}
        </ul>
        <div ref={underline} className="h-[2px] w-20 bg-[#1F1F1F] absolute -bottom-[1px] transition-all duration-200" style={{ left: "0px", transition: "transform 0.5s ease, width 0.5s ease" }} />
      </div>
    </nav>
  );
};

export default Navbar;
