import React from 'react'

export const Bookingform = ({booking, handleBooking, createBooking}) => {
  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => {
        e.preventDefault();
        createBooking();}}>
          <div className="form-control">
            <label>Number of Guests</label>
            <input 
            type="text"
            name="numberOfGuests"
            value={booking.numberOfGuests}
            onChange={handleBooking}
            />
          </div>
          <div className="form-control">
            <label>Your name</label>
            <input 
            type="text"
            name="name"
            value={booking.name}
            onChange={handleBooking}
            />
          </div>
          <div className="form-control">
            <label>Date</label>
            <input 
            type="text"
            name="date"
            value={booking.date}
            onChange={handleBooking}
            />
          </div>
          <div className="form-control">
            <label>Time</label>
            <input 
            type="text"
            name="time"
            value={booking.time}
            onChange={handleBooking}
            />
          </div>
          <div className="form-control">
            <label>Resturant ID</label>
            <input 
            type="text"
            name="resturantId"
            value={booking.resturantId}
            onChange={handleBooking}
            />
          </div>
          <button>Add Booking</button>
        </form>
      </div>
  )
}
