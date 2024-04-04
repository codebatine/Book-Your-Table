import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ShowBooking = ({showBooking, loadingScreen}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/thankyou');
  };

  console.log(showBooking);


  return (
    <>
      {loadingScreen && <><div className="loading-wrapper">Loading...</div></>}
      {showBooking && (
          <div className="show-booking-wrapper">
            <h2>Your booking has been confirmed!</h2>
            <div>
              Guests: {showBooking.numberOfGuests}
            </div>
            <div>
              Your name: {showBooking.name}
            </div>
            <div>
             Date: {showBooking.date}
            </div>
            <div>
             Time: {showBooking.time}
            </div>
            <div>
             Resturant: {showBooking.restaurantId}
            </div>
            <button onClick={handleClick}>OK</button>
          </div>
      )}
    </>
  )
}
