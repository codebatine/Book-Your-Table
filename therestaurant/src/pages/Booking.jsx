import React, { useCallback, useContext, useEffect, useState } from "react";
import { Bookingform } from "../components/booking/Bookingform";
import { ShowBooking } from "../components/booking/ShowBooking";
import { ChooseRestaurant } from "../components/booking/ChooseRestaurant";
import { walletChecker } from "../services/blockchainService";
import { ContractContext } from "../context/ContractContext";
import { WalletContext } from "../context/WalletContext";

let errorMsg = "";

walletChecker(errorMsg);

export const Booking = () => {
  const [restaurantList, setRestaurantList] = useState([]);
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
  const { writeContract, readContract } = useContext(ContractContext);
  const { isConnected } = useContext(WalletContext);

  useEffect(() => {
    if (showBooking !== null) {
      setLoadingScreen(false);
    }
  }, [showBooking]);

  const readRestaurant = useCallback(async () => {
    let count = await readContract.restaurantCount();

    const restaurants = [];
    for (let i = 1; i <= count; i++) {
      const resturant = await readContract.restaurants(i);
      restaurants.push(resturant);
    }

    setRestaurantList(restaurants);
  }, [readContract]);

  const handleEnterBooking = () => {
    readRestaurant();
    setRestaurantInput(true);
  };

  const handleBooking = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
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
    <>
      <div className="booking-wrapper container">
        {isConnected ? (
          <ChooseRestaurant
            showBooking={showBooking}
            handleEnterBooking={handleEnterBooking}
          />
        ) : null}
        {isConnected ? (
          <Bookingform
            restaurantInput={restaurantInput}
            booking={booking}
            handleBooking={handleBooking}
            createBooking={createBooking}
            restaurantList={restaurantList}
            showBooking={showBooking}
            loadingScreen={loadingScreen}
          />
        ) : (
          <h2>Please connect the wallet to continue</h2>
        )}
        <ShowBooking
          showBooking={showBooking}
          loadingScreen={loadingScreen}
          restaurantList={restaurantList}
        />
      </div>
    </>
  );
};
