import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import {
  editBooking,
  removeBooking,
  getBookings,
} from "../../services/blockchainService.js";
import { ContractContext } from "../../context/ContractContext.js";

export const ShowBookings = ({ restaurantId, all }) => {
  const [bookings, setBookings] = useState([]);

  const { readContract, writeContract } = useContext(ContractContext);

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
  }, [restaurantId, all, readContract]);

  const handleEdit = async (bookingId) => {
    const numberOfGuests = prompt("Enter the updated number of guests");
    const name = prompt("Enter the updated name");
    const date = prompt("Enter the updated date");
    const time = prompt("Enter the updated time");
    try {
      console.log("Editing booking...");
      await editBooking(
        bookingId,
        numberOfGuests,
        name,
        date,
        time,
        writeContract,
      );
      console.log("Waiting for changes to propagate...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("Fetching updated bookings...");
      const fetchedBookings = await getBookings(readContract, restaurantId);
      console.log("Fetched updated bookings:", fetchedBookings);
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Failed to edit booking:", error);
    }
  };

  const handleRemove = async (bookingId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this booking?",
    );
    if (confirmRemove) {
      try {
        console.log("Removing booking...");
        await removeBooking(bookingId, writeContract);
        console.log("Waiting for changes to propagate...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("Fetching updated bookings...");
        const fetchedBookings = await getBookings(readContract, restaurantId);
        console.log("Fetched updated bookings:", fetchedBookings);
        setBookings(fetchedBookings);
      } catch (error) {
        console.error("Failed to remove booking:", error);
      }
    }
  };

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings
          .filter((booking) => booking[1] != 0)
          .sort((a, b) => Number(a[5]) - Number(b[5]))
          .map((booking) => {
            console.log("Booking:", booking);
            console.log("Booking ID:", booking[0]);
            return (
              <li key={booking[0]}>
                <p>Restaurant ID: {booking[5].toString()}</p>
                <p>Name: {booking[2]}</p>
                <p>Date: {booking[3]}</p>
                <p>Time: {booking[4].toString()}</p>
                <p>Number of Guests: {booking[1].toString()}</p>
                <button onClick={() => handleEdit(booking[0])}>Edit</button>
                <button onClick={() => handleRemove(booking[0])}>Remove</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

ShowBookings.propTypes = {
  restaurantId: PropTypes.number,
  all: PropTypes.bool,
  readContract: PropTypes.object,
};
