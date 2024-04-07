import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../../context/ContractContext';
import { createBooking, getBookingFunc } from "../../services/blockchainService";

export const Bookingform = ({displayBookingConfirmation, loadingScreen, booking, handleSetBooking, restaurantList, displayBookingForm, returnBooking}) => {

  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [ bookings1800, setBookings1800] = useState([]);
  const [ bookings2100, setBookings2100] = useState([]);
  const [ tablesRemain1800, setTablesRemain1800] = useState(15);
  const [ tablesRemain2100, setTablesRemain2100] = useState(15);
  const { readContract, writeContract } = useContext(ContractContext)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (readContract) {
          const bookingCount = await readContract.bookingCount();
          const fetchedBookings = [];
          for (let i = 1; i <= bookingCount; i++) {
            const booking = await readContract.bookings(i);
            fetchedBookings.push(booking);
          }
          fetchedBookings.sort((a, b) => a - b);
          setAllBookings(fetchedBookings);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, [])

  useEffect(() => {
    console.log("Start useEffect");
    const getBookingsFromRestauruntId = async () => {
      try {
        console.log(parseInt(booking.restaurantId));
        const result = await getBookingFunc(parseInt(booking.restaurantId), readContract);
        setBookings(result)
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    getBookingsFromRestauruntId();
  }, [booking]);

  useEffect(() => {

    const filterAllBookings = () => {
    try {
        console.log("run checker");
        const filtertedBookingsPerRestaurunt = allBookings.filter(booking => bookings.includes(booking[5]));
        console.log("filtered Bookings", filtertedBookingsPerRestaurunt);
        const filter1800 = filtertedBookingsPerRestaurunt.filter(booking => booking[4] === 1800n)
        setBookings1800(filter1800);
        const filter2100 = filtertedBookingsPerRestaurunt.filter(booking => booking[4] === 2100n)
        setBookings2100(filter2100);
    } catch (error) {
      console.error("Failed to filter bookings:", error);
    }
  }
    filterAllBookings();
  }, [bookings]);

  useEffect(() => {
    try {
      const tablesremain1800 = 15 - bookings1800.length
      setTablesRemain1800(tablesremain1800)
      const tablesremain2100 = 15 - bookings2100.length
      setTablesRemain2100(tablesremain2100)
    } catch (error) {
      console.error("Failed to count remaining tables:", error);      
    }
  }, [bookings1800, bookings2100])

  const handleCreateBooking = async () => {
    try {
      await createBooking(booking, writeContract)
      returnBooking();
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  }



  // console.log("booking form input", booking);
  // console.log("restuarunt list", restaurantList);
  console.log("all Bookings", allBookings);
  console.log("bookings", bookings);
  console.log("bookings1800", bookings1800.length);
  console.log("bookings2100", bookings2100.length);

  
  

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
          <label htmlFor="booking-form-time-1800">18:00</label><span>{tablesRemain1800} tables remain</span>
          <input type="radio" id="booking-form-time-1800"
            onClick={(e) => {e.preventDefault(); handleSetBooking({ target: { name: "time", value: "1800" } })}}
            className={booking.time === "1800" ? "bookingTime selected" : "bookingTime"}
          />
          <label htmlFor="booking-form-time-2100">21:00</label><span>{tablesRemain2100} tables remain</span>
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