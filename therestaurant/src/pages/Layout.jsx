import { useState } from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import "../App.scss";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header>
        <nav>
          <div
            id="menu-icon"
            onClick={toggleMenu}
            className={isOpen ? "open" : ""}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li>
              <NavLink to={"/"} onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/booking"} onClick={toggleMenu}>
                Booking
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin"} onClick={toggleMenu}>
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink to={"/contact"} onClick={toggleMenu}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
