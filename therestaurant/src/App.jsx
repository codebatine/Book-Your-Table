import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./Router";
import { useEffect, useState } from "react";
import { WalletContext } from "./context/WalletContext";
import { ContractContext } from "./context/ContractContext";
import {
  loadReadContract,
  loadWriteContract,
} from "./services/blockchainService";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletProvider, setWalletProvider] = useState(null);
  const [readContract, setReadContract] = useState(null);
  const [writeContract, setWriteContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setWalletProvider(accounts);
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

    const Contracts = async () => {
      const rContract = await loadReadContract();
      setReadContract(rContract);

      const wContract = await loadWriteContract();
      setWriteContract(wContract);
    };
    Contracts();
  }, []);

  return (
    <>
      <WalletContext.Provider
        value={{
          walletAddress,
          isConnected,
          connectWallet,
          disconnectWallet,
          walletProvider,
        }}
      >
        <ContractContext.Provider value={{ readContract, writeContract }}>
          <RouterProvider router={router} />
        </ContractContext.Provider>
      </WalletContext.Provider>
    </>
  );
}

export default App;
