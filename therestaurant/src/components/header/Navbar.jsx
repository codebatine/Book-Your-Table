import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { WalletContext } from "../../context/WalletContext";

export const Navbar = () => {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } =
    useContext(WalletContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
          <button onClick={!isConnected ? connectWallet : disconnectWallet}>
            {!isConnected ? "Connect Wallet" : "Connected"}
          </button>
          <span>{walletAddress}</span>
        </ul>
      </nav>
    </>
  );
};
