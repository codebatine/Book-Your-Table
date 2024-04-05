import React from 'react'

export const Bookingform = ({showBooking, loadingScreen, booking, handleBooking, createBooking, restaurantList, restaurantInput}) => {
  return (
    <>{(!showBooking && !loadingScreen && restaurantInput) &&     
    <div className="form-wrapper">
      <form onSubmit={(e) => {
        e.preventDefault();
        createBooking();}}>   
        <div className="form-control">
          <label htmlFor="booking-form-resturantId">Restaurant</label>
          <select name="restaurantId" onChange={handleBooking}>
          {restaurantList.map((resturant) => <option key={resturant[0]} value={resturant[0].toString()}>{resturant[1]}</option>)}
          </select>
        </div>       
        <div className="form-control">
          <label htmlFor="booking-form-numberOfGuests">Number of Guests</label>
          <input 
          type="number"
          name="numberOfGuests"
          id="booking-form-numberOfGuests"
          value={booking.numberOfGuests}
          onChange={handleBooking}
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
          onChange={handleBooking}
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
            onChange={handleBooking}
            required
            />
          </div>
        <div className="form-control">
       <label htmlFor="booking-form-time">Time</label>
        <select
          name="time"
          id="booking-form-time"
          value={booking.time}
          onChange={handleBooking}
          required
        >
          <option value="">Select time</option>
          <option value="1800">18:00</option>
          <option value="1900">19:00</option>
          <option value="2000">20:00</option>
          <option value="2100">21:00</option>
        </select>
      </div>
        <button>Add Booking</button>
      </form>
    </div>}
  </>

  )
}
