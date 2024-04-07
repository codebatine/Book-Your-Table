import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../../context/ContractContext';
import { createBooking, getBookingFunc } from "../../services/blockchainService";

export const Bookingform = ({displayBookingConfirmation, loadingScreen, booking, handleSetBooking, restaurantList, displayBookingForm, returnBooking}) => {

  const [bookings, setBookings] = useState([]);
  const { readContract, writeContract } = useContext(ContractContext)

  useEffect(() => {
    const getBookingsFromRestauruntId = async () => {
      try {
        const result = await getBookingFunc(parseInt(booking.restaurantId), readContract);
        setBookings(result)
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    getBookingsFromRestauruntId();
  }, []);

  const handleCreateBooking = async () => {
    try {
      await createBooking(booking, writeContract)
      returnBooking();
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  }

  console.log("resturantList", restaurantList);
  console.log("bookings", bookings);
  console.log("restaurant ID?", parseInt(booking.restaurantId));

  return (
    <>{(!displayBookingConfirmation && !loadingScreen && displayBookingForm) &&     
    <div className="form-wrapper">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreateBooking();}}>   
        <div className="form-control">
          <label htmlFor="booking-form-restaurantId">Restaurant</label>
          <select name="restaurantId" id="booking-form-restaurantId" onChange={handleSetBooking} defaultValue="">
            <option value="" disabled>Välj restaurang</option>
          {restaurantList.map((restaurant) => (<option key={restaurant[0].toString()} value={restaurant[0].toString()}>{restaurant[1]}</option>))}
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="booking-form-numberOfGuests">Number of Guests</label>
          <input 
          type="number"
          name="numberOfGuests"
          id="booking-form-numberOfGuests"
          value={booking.numberOfGuests}
          onChange={handleSetBooking}
          required
          min="1"
          max="6"
          />
        </div>
        <div className="form-control">
          <label htmlFor="booking-form-numbername">Your name</label>
          <input 
          type="text"
          name="name"
          id="booking-form-numbername"
          value={booking.name}
          onChange={handleSetBooking}
          required
          />
        </div>
        <div className="form-control">
            <label htmlFor="booking-form-date">Date</label>
            <input 
            type="date"
            name="date"
            id="booking-form-date"
            value={booking.date}
            onChange={handleSetBooking}
            required
            />
          </div>
        <div className="form-control">
        <div>
          <label htmlFor="booking-form-time-1800">18:00</label>
          <input type="radio" id="booking-form-time-1800"
            onClick={(e) => {e.preventDefault(); handleSetBooking({ target: { name: "time", value: "1800" } })}}
            className={booking.time === "1800" ? "bookingTime selected" : "bookingTime"}
          />
          <label htmlFor="booking-form-time-2100">21:00</label>
          <input type="radio" id="booking-form-time-2100"
            onClick={(e) => {e.preventDefault(); handleSetBooking({ target: { name: "time", value: "2100" } })}}
            className={booking.time === "2100" ? "bookingTime selected" : "bookingTime"}
          />
        </div>
      </div>
        <button>Add Booking</button>
      </form>
    </div>}
  </>

  )
}