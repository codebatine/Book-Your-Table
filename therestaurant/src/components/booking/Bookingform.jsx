import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../../context/ContractContext';
import { createBooking } from "../../services/blockchainService";

export const Bookingform = ({displayBookingConfirmation, loadingScreen, booking, handleSetBooking, restaurantList, displayBookingForm, returnBooking}) => {

  const [bookings, setBookings] = useState([]);
  const { readContract, writeContract } = useContext(ContractContext)

  useEffect(() => {
    const fetchBookings = async () => {
      console.log("Current bookings:", bookings);

      try {
        if (readContract) {
          console.log("Fetching bookings...");
          const bookingCount = await readContract.bookingCount();
          const fetchedBookings = [];
          for (let i = 1; i <= bookingCount; i++) {
            const booking = await readContract.bookings(i);
            fetchedBookings.push(booking);
          }
          console.log("Fetched bookings:", fetchedBookings);
          fetchedBookings.sort((a, b) => a - b);
          setBookings(fetchedBookings);

          console.log("Bookings array:", fetchedBookings);
        } else {
          console.error("Read contract is null");
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
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

  return (
    <>{(!displayBookingConfirmation && !loadingScreen && displayBookingForm) &&     
    <div className="form-wrapper">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreateBooking();}}>   
        <div className="form-control">
          <label htmlFor="booking-form-restaurantId">Restaurant</label>
          <select name="restaurantId" onChange={handleSetBooking} defaultValue="">
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
       <label htmlFor="booking-form-time">Time</label>
        <div>
          <button
            onClick={(e) => {e.preventDefault(); handleSetBooking({ target: { name: "time", value: "1800" } })}}
            className={booking.time === "1800" ? "bookingTime selected" : "bookingTime"}
          >
            18:00
          </button>
          <button
            onClick={(e) => {e.preventDefault(); handleSetBooking({ target: { name: "time", value: "2100" } })}}
            className={booking.time === "2100" ? "bookingTime selected" : "bookingTime"}
          >
            21:00
          </button>
        </div>
      </div>
        <button>Add Booking</button>
      </form>
    </div>}
  </>

  )
}