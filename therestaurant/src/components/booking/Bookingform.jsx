import React, { useContext } from 'react'
import { ContractContext } from '../../context/ContractContext';
import { createBooking } from "../../services/blockchainService";

export const Bookingform = ({displayBookingConfirmation, loadingScreen, booking, handleSetBooking, restaurantList, displayBookingForm, returnBooking}) => {

  const { writeContract } = useContext(ContractContext)

  const handleCreateBooking = async () => {
    try {
      await createBooking(booking, writeContract)
      returnBooking();
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  }

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
        <select
          name="time"
          id="booking-form-time"
          value={booking.time}
          onChange={handleSetBooking}
          required
        >
          <option value="">Select time</option>
          <option value="1800">18:00</option>
          <option value="2100">21:00</option>
        </select>
      </div>
        <button>Add Booking</button>
      </form>
    </div>}
  </>

  )
}