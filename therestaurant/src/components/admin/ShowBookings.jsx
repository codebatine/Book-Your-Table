import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import {
  editBooking,
  removeBooking,
  getBookings,
} from '../../services/blockchainService.js';
import { ContractContext } from '../../context/ContractContext.js';

export const ShowBookings = ({ restaurantId, all }) => {
  const [bookings, setBookings] = useState([]);
  const { readContract, writeContract } = useContext(ContractContext);
  const [searchTerm, setSearchTerm] = useState('');

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
          setBookings(fetchedBookings);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, [restaurantId, all, readContract]);

  const handleEdit = async (bookingId) => {
    const numberOfGuests = prompt('Enter the updated number of guests');
    const name = prompt('Enter the updated name');
    const date = prompt('Enter the updated date');
    const time = prompt('Enter the updated time');
    try {
      await editBooking(
        bookingId,
        numberOfGuests,
        name,
        date,
        time,
        writeContract,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const fetchedBookings = await getBookings(readContract, restaurantId);
      setBookings(
        fetchedBookings.filter((booking) => booking[0] !== bookingId),
      );
      window.alert('The booking has been edited.');
    } catch (error) {
      console.error('Failed to edit booking:', error);
    }
  };

  const handleRemove = async (bookingId) => {
    const confirmRemove = window.confirm(
      'Are you sure you want to remove this booking?',
    );
    if (confirmRemove) {
      try {
        await removeBooking(bookingId, writeContract);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const fetchedBookings = await getBookings(readContract, restaurantId);
        setBookings(fetchedBookings);
        window.alert('The booking has been removed.');
      } catch (error) {
        console.error('Failed to remove booking:', error);
      }
    }
  };

  return (
    <div className="container-contact">
      <h2>Bookings</h2>
      <br />
      <input
        className='search-input'
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <ul>
<<<<<<< HEAD
        {bookings
          .filter((booking) => booking[1] != 0)
          .sort((a, b) => Number(a[5]) - Number(b[5]))
          .map((booking) => {
            return (
              <li key={booking[0]}>
                <div className="booking-detail">
                  <p>Restaurant ID: {booking[5].toString()}</p>
                  <p>Name: {booking[2]}</p>
                  <p>Date: {booking[3]}</p>
                  <p>Time: {booking[4].toString()}</p>
                  <p>Number of Guests: {booking[1].toString()}</p>
                </div>
                <div className="booking-actions">
                  <button onClick={() => handleEdit(booking[0])}>Edit</button>
                  <button onClick={() => handleRemove(booking[0])}>Remove</button>
                </div>
              </li>
            );
          })}
=======
      {bookings
  .filter(
    (booking) =>
      booking[1] != 0 &&
      (booking[2].toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking[3].includes(searchTerm))
  )
  .sort((a, b) => Number(a[1]) - Number(b[1]))
  .map((booking) => {
    return (
      <li key={booking[0]}>
        <div className="booking-detail">
          <p>Restaurant ID: {booking[5].toString()}</p>
          <p>Name: {booking[2]}</p>
          <p>Date: {booking[3]}</p>
          <p>Time: {booking[4].toString()}</p>
          <p>Number of Guests: {booking[1].toString()}</p>
        </div>
        <div className="booking-actions">
          <button onClick={() => handleEdit(booking[0])}>Edit</button>
          <button onClick={() => handleRemove(booking[0])}>
            Remove
          </button>
        </div>
      </li>
    );
  })}
>>>>>>> a0ccc1d (Search bar for bookings in admin :dart:)
      </ul>
    </div>
  );
};

ShowBookings.propTypes = {
  restaurantId: PropTypes.number,
  all: PropTypes.bool,
  readContract: PropTypes.object,
};
