import React from "react";
import { useNavigate } from "react-router-dom";

export const ShowBooking = ({ displayBookingConfirmation, loadingScreen, restaurantList }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/thankyou");
  };

  const findRestaurantName = (restaurantId) => {
    console.log("find restaurant - restaurantId", restaurantId);
    const restaurant = restaurantList.find(
      (restaurant) => (restaurant[0].toString()) === (restaurantId),
    );
    return restaurant ? restaurant[1] : "Unknown Restaurant";
  };

  return (
    <>
      {loadingScreen && <div className="loading-wrapper">Loading...</div>}
      {displayBookingConfirmation && (
        <div className="show-booking-wrapper">
          <h2>Your booking has been confirmed!</h2>
          <div>Restaurant: {findRestaurantName(displayBookingConfirmation.restaurantId)}</div>
          <div>Guests: {displayBookingConfirmation.numberOfGuests}</div>
          <div>Your name: {displayBookingConfirmation.name}</div>
          <div>Date: {displayBookingConfirmation.date}</div>
          <div>Time: {displayBookingConfirmation.time.replace(/(\d{2})(\d{2})/, "$1:$2")}</div>
          <button onClick={handleClick}>OK</button>
        </div>
      )}
    </>
  );
};