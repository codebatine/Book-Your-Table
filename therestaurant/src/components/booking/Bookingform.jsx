import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../../context/ContractContext';
import { createBooking, getBookingFunc } from "../../services/blockchainService";

export const Bookingform = ({displayBookingConfirmation, loadingScreen, booking, handleSetBooking, restaurantList, displayBookingForm, returnBooking}) => {

  const [ bookings, setBookings] = useState([]);
  const [ allBookings, setAllBookings] = useState([]);
  const [ filterBookingDate, setFilterBookingDate] = useState([]);
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
          setAllBookings(fetchedBookings);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, [])

  useEffect(() => {
    if(booking.restaurantId !== ""){
    const getBookingsFromRestauruntId = async () => {
      try {
        const result = await getBookingFunc(parseInt(booking.restaurantId), readContract);
        setBookings(result)
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    getBookingsFromRestauruntId();
  }
  }, [booking]);

  useEffect(() => {
    const filterAllBookings = () => {
    try {
        const filtertedBookingsPerRestaurunt = allBookings.filter(item => bookings.includes(item[5]));
        const filterDate = filtertedBookingsPerRestaurunt.filter(item => item[3] === booking.date)
        setFilterBookingDate(filterDate)
    } catch (error) {
      console.error("Failed to filter bookings:", error);
    }
  }
    filterAllBookings();
  }, [bookings]);

useEffect(() => {
try {
  const filter1800 = filterBookingDate.filter(item => item[4] === 1800n)
  setBookings1800(filter1800);
  const filter2100 = filterBookingDate.filter(item => item[4] === 2100n)
  setBookings2100(filter2100);
} catch (error) {
  
}
}, [filterBookingDate])

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
        {booking.restaurantId !== "" && (
        <>
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
          {booking.date !== "" && (
            <>
          <div className="form-control">
            <label className="choose-time-wrapper" htmlFor="booking-form-time-1800">Book 18:00:
              <input type="radio" id="booking-form-time-1800"
                onClick={(e) => {e.preventDefault(); handleSetBooking({ target: { name: "time", value: "1800" } })}}
                className={booking.time === "1800" ? "bookingTime selected" : "bookingTime"} disabled={tablesRemain1800 === 0}
              />
              <span>{`${tablesRemain1800} tables remaining with 6 seats at 18:00`}</span>
              </label>
          </div>
          <div className="form-control">
            <label className="choose-time-wrapper" htmlFor="booking-form-time-2100">Book 21:00:
            <input type="radio" id="booking-form-time-2100"
              onClick={(e) => {e.preventDefault(); handleSetBooking({ target: { name: "time", value: "2100" } })}}
              className={booking.time === "2100" ? "bookingTime selected" : "bookingTime"} disabled={tablesRemain2100 === 0}
            />
            <span>{`${tablesRemain2100} tables remaining with 6 seats at 21:00`}</span>
            </label>
          </div>
          {booking.time !== "" && (
            <>
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
                autoComplete="off"
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
                autoComplete="off"
                />
              </div>
              <button>Add Booking</button>
            </>)}
          </>)}
        </>)}
      </form>
    </div>}
  </>

  )
}