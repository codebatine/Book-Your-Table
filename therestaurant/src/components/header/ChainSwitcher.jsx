import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "../../services/config";

export const ChainSwitcher = () => {
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    const setUp = async () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Install MetaMask.");
        return;
      }
      const chainId = await ethereum.request({ method: "eth_chainId" });
      setContractAddress(CONTRACT_ADDRESSES[chainId]);

      const handdleChainChanged = (_chainId) => {
        setContractAddress(CONTRACT_ADDRESSES[_chainId]);
        window.location.reload();
      };

      ethereum.on("chainChanged", handdleChainChanged);

      return () => {
        ethereum.removeListener("chainChanged", handdleChainChanged);
      };
    };
    setUp();
  }, []);

  return <div>ChainSwitcher</div>;
};
