import { ethers } from 'ethers';
import { abi, contractAddress } from './config.js';

export const createRestaurant = async (restaurantName, writeContract) => {
  if (!writeContract) {
    return;
  }

  try {
    await writeContract.createRestaurant(restaurantName);
  } catch (error) {
    console.error('Error in createRestaurant:', error);
    throw error;
  }
};

export const getRestaurants = async (readContract) => {
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

export const loadReadContract = async () => {
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

// Booking

export const createBooking = async (booking, writeContract) => {
  try {
    const result = await writeContract.createBooking(
      booking.numberOfGuests,
      booking.name,
      booking.date,
      booking.time,
      booking.restaurantId
    );
    await result.wait();
  } catch (error) {
    console.error('Error creating booking', error);
  }
};

export const editBooking = async (
  bookingId,
  numberOfGuests,
  name,
  date,
  time,
  writeContract
) => {
  try {
    const result = await writeContract.editBooking(
      bookingId,
      numberOfGuests,
      name,
      date,
      time
    );
    await result.wait();
  } catch (error) {
    console.error('Error editing booking:', error);
    throw error;
  }
};

export const getBookings = async (restaurantId, readContract) => {
  if (!readContract) {
    return [];
  }

  try {
    const count = await readContract.bookingCount();
    const bookings = [];
    for (let i = 1; i <= count; i++) {
      const booking = await readContract.bookings(i);
      if (booking.resturantId === restaurantId) {
        bookings.push(booking);
      }
    }
    return bookings;
  } catch (error) {
    console.error(`Failed to fetch bookings: ${error}`);
  }
};

export const removeBooking = async (bookingId, writeContract) => {
  try {
    if (!writeContract) {
      throw new Error('Write contract not initialized');
    }
    const result = await writeContract.removeBooking(bookingId);
    await result.wait();
  } catch (error) {
    console.error('Error removing booking:', error);
    throw error;
  }
};

//

export const getBookingFunc = async (restaurantId, readContract) => {
  if (!readContract) {
    return [];
  }
  try {
    const bookings = await readContract.getBookings(restaurantId);
    return bookings;
  } catch (error) {
    console.error(`Failed to fetch bookings: ${error}`);
  }
};
