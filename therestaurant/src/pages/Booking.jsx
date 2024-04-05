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
  const [resturantList, setResurantList] = useState([]);
  const [writeContract, setWriteContract] = useState();
  const [booking, setBooking] = useState({
    id: 0,
    numberOfGuests: 0,
    name: "",
    date: "",
    time: "",
    resturantId: 0,
  });
  const [showBooking, setShowBooking] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [resturant, setResturant] = useState({id: 0, name: "", bookingIds: []});

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

    setResurantList(restaurants);
  }, [readContract]);

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
        booking.resturantId,
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

  console.log(resturantList);

  return (
    <div className="booking-wrapper container">
      <ConnectWallet connectWallet={connectWallet} wallet={wallet} />
      <ChooseRestaurant readRestaurant={readRestaurant} resturantList={resturantList} setResturant={setResturant}/>
      <Bookingform
        booking={booking}
        handleBooking={handleBooking}
        createBooking={createBooking}
      />
      <ShowBooking showBooking={showBooking} loadingScreen={loadingScreen} />
    </div>
  );
};
