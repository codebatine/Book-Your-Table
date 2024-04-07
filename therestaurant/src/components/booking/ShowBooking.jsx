import React from "react";
import { useNavigate } from "react-router-dom";

export const ShowBooking = ({ showBooking, loadingScreen, restaurantList }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/thankyou");
  };

  const findRestaurantName = (restaurantId) => {
    const restaurant = restaurantList.find(
      (restaurant) => restaurant[0].toString() === restaurantId.toString(),
    );
    return restaurant ? restaurant[1] : "Unknown Restaurant";
  };

  return (
    <>
      <div className="container-contact">
        {loadingScreen && <div>Loading...</div>}
        {showBooking && (
          <div className="container-contact">
            <h2>Your booking has been confirmed!</h2>
            <div>Restaurant: {findRestaurantName(showBooking.restaurantId)}</div>
            <div>Guests: {showBooking.numberOfGuests}</div>
            <div>Your name: {showBooking.name}</div>
            <div>Date: {showBooking.date}</div>
            <div>Time: {showBooking.time}</div>
            <button onClick={handleClick}>OK</button>
          </div>
        )}
      </div>
    </>
  );
};
