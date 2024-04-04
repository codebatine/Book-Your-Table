import { ethers } from 'ethers';
import { abi, contractAddress } from './config.js';

export const requestAccount = async () => {
  try {
    const result = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return result;
  } catch (error) {
    console.error('Error requesting account:', error);
  }
};

export const loadReadContract = () => {
  const todoReadContract = new ethers.Contract(
    contractAddress,
    abi,
    window.provider
  );

  return todoReadContract;
};

export const loadWriteContract = async () => {
  const signer = await provider.getSigner();

  const resturantWriteContract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return resturantWriteContract;
};

export const walletChecker = (errorMsg) => {
  if (!window.ethereum) {
    errorMsg =
      'Ethers.js: Web3 provider not found. Please install a wallet with Web3 support.';
    console.error(errorMsg);
  } else {
    window.provider = new ethers.BrowserProvider(window.ethereum);
  }
};
