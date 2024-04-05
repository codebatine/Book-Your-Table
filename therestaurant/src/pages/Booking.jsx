import React, { useCallback, useEffect, useState } from "react";
import { Bookingform } from "../components/booking/Bookingform";
import { ConnectWallet } from "../components/booking/ConnectWallet";
import { ShowBooking } from "../components/booking/ShowBooking";
import {
  loadReadContract,
  loadWriteContract,
  requestAccount,
  walletChecker,
} from "../services/blockchainService";
import { ChooseRestaurant } from "../components/booking/ChooseRestaurant";

let errorMsg = "";

walletChecker(errorMsg);

export const Booking = () => {
  const [wallet, setWallet] = useState([]);
  const [readContract, setReadContract] = useState();
  const [restaurantList, setRestaurantList] = useState([]);
  const [writeContract, setWriteContract] = useState();
  const [booking, setBooking] = useState({
    numberOfGuests: 0,
    name: "",
    date: "",
    time: "",
    restaurantId: 0,
  });
  const [showBooking, setShowBooking] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [restaurantInput, setRestaurantInput] = useState(false);

  useEffect(() => {
    if (showBooking !== null) {
      setLoadingScreen(false);
    }
  }, [showBooking]);

  const connectWallet = async () => {
    const account = await requestAccount();
    setWallet(account);

    const todoReadContract = loadReadContract()
    setReadContract(todoReadContract);

    const resturantWriteContract = await loadWriteContract();
    setWriteContract(resturantWriteContract);
  };

  const readRestaurant = useCallback(async () => {
    let count = await readContract.restaurantCount();
    
    const restaurants = [];
    for (let i = 1; i <= count; i++){
      const resturant = await readContract.restaurants(i);
      restaurants.push(resturant)
    }

    setRestaurantList(restaurants);
  }, [readContract]);

  const handleEnterBooking = () => {
    readRestaurant();
    setRestaurantInput(true);
  }

  const handleBooking = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value })
  };

  const createBooking = async () => {
    try {
      const result = await writeContract.createBooking(
        booking.numberOfGuests,
        booking.name,
        booking.date,
        booking.time,
        booking.restaurantId,
      );
      await result.wait();
      returnBooking(booking);
    } catch (error) {
      console.error("Error creating resturant", error);
    }
  };

  const returnBooking = (booking) => {
    console.log(booking);
    setLoadingScreen("true");
    setTimeout(() => {
      setShowBooking(booking);
    }, 3000);
  };

  return (
    <div className="booking-wrapper container">
      <ConnectWallet connectWallet={connectWallet} wallet={wallet} />
      <ChooseRestaurant showBooking={showBooking} handleEnterBooking={handleEnterBooking}/>
      <Bookingform
        restaurantInput={restaurantInput}
        booking={booking}
        handleBooking={handleBooking}
        createBooking={createBooking}
        restaurantList={restaurantList}
        showBooking={showBooking}
        loadingScreen={loadingScreen}
      />
      <ShowBooking showBooking={showBooking} loadingScreen={loadingScreen} restaurantList={restaurantList}/>
    </div>
  );
};
