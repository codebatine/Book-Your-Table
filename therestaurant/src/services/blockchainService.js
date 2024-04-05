import { ethers } from "ethers";
import { abi, contractAddress } from "./config.js";

export let writeContract;
let readContract;

export const initializeBlockchain = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.provider = new ethers.BrowserProvider(window.ethereum);

      readContract = new ethers.Contract(contractAddress, abi, window.provider);

      const signer = await window.provider.getSigner();
      writeContract = new ethers.Contract(contractAddress, abi, signer);
    } catch (error) {
      console.error("Error in initializeBlockchain:", error);
      return;
    }
  } else {
    return;
  }
};

export const createRestaurant = async (restaurantName) => {
  if (!writeContract) {
    return;
  }

  try {
    await writeContract.createRestaurant(restaurantName);
  } catch (error) {
    console.error("Error in createRestaurant:", error);
    throw error;
  }
};

export const getRestaurants = async () => {
  if (!readContract) {
    return [];
  }

  try {
    const restaurantCount = await readContract.restaurantCount();
    const restaurants = [];
    for (let i = 1; i <= restaurantCount; i++) {
      const restaurant = await readContract.restaurants(i);
      restaurants.push(restaurant);
    }
    return restaurants;
  } catch (error) {
    console.error(`Failed to fetch restaurants: ${error}`);
  }
};

//Booking

export const requestAccount = async () => {
  try {
    const result = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return result;
  } catch (error) {
    console.error("Error requesting account:", error);
  }
};

export const loadReadContract = () => {
  const todoReadContract = new ethers.Contract(
    contractAddress,
    abi,
    window.provider,
  );

  return todoReadContract;
};

export const loadWriteContract = async () => {
  const signer = await provider.getSigner();

  const resturantWriteContract = new ethers.Contract(
    contractAddress,
    abi,
    signer,
  );

  return resturantWriteContract;
};

export const walletChecker = (errorMsg) => {
  if (!window.ethereum) {
    errorMsg =
      "Ethers.js: Web3 provider not found. Please install a wallet with Web3 support.";
    console.error(errorMsg);
  } else {
    window.provider = new ethers.BrowserProvider(window.ethereum);
  }
};
