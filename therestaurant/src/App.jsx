import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./Router";
import { useEffect, useState } from "react";
import { WalletContext } from "./context/WalletContext";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Install MetaMask.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);
  return (
    <>
      <WalletContext.Provider
        value={{ walletAddress, isConnected, connectWallet, disconnectWallet }}
      >
        <RouterProvider router={router} />
      </WalletContext.Provider>
    </>
  );
}

export default App;
