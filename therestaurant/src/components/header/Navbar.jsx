import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { WalletContext } from "../../context/WalletContext";

export const Navbar = () => {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } =
    useContext(WalletContext);
  console.log(isConnected);
  console.log(walletAddress);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/booking">Booking</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <button onClick={!isConnected ? connectWallet : disconnectWallet}>
        {!isConnected ? "Connect Wallet" : "Connected"}
      </button>
      <p>{walletAddress}</p>
    </nav>
  );
};
