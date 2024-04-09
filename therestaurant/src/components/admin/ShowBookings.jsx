import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import {
  editBooking,
  removeBooking,
  getBookings,
} from "../../services/blockchainService.js";
import { ContractContext } from "../../context/ContractContext.js";
import { convertTime } from "../../services/utils.js";

export const ShowBookings = ({ restaurantId, all }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { readContract, writeContract } = useContext(ContractContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [filterType, setFilterType] = useState("date");

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
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [restaurantId, all, readContract]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setSearchActive(false);
    }
    console.log(searchActive);
  };

  const applyFilter = () => {
    const filteredBookings = bookings.filter((booking) => {
      if (filterType === "date") {
        return booking[3] === searchTerm;
      } else if (filterType === "time") {
        const timeStr = convertTime(booking[4]);
        return timeStr === searchTerm;
      } else if (filterType === "name") {
        return booking[2].toLowerCase().includes(searchTerm.toLowerCase());
      } else if (filterType === "BookingId") {
        return booking[0].toString() === searchTerm;
      }
      return false;
    });
    setFilteredBookings(filteredBookings);
    setSearchActive(true);
  };

  const handleEdit = async (bookingId) => {
    const numberOfGuests = prompt("Enter the updated number of guests");
    const name = prompt("Enter the updated name");
    const date = prompt("Enter the updated date");
    const time = prompt("Enter the updated time");
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
      window.alert("The booking has been edited.");
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
        await removeBooking(bookingId, writeContract);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const fetchedBookings = await getBookings(readContract, restaurantId);
        setBookings(fetchedBookings);
        window.alert("The booking has been removed.");
      } catch (error) {
        console.error("Failed to remove booking:", error);
      }
    }
  };

  return (
    <div className="container-contact">
      <h2>Bookings</h2>
      <br />
      <div>
        <select
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="name">Name</option>
          <option value="BookingId">Booking ID</option>
        </select>
        {filterType === "date" && (
          <input
            type="date"
            name="date"
            id="date"
            value={searchTerm}
            onChange={handleFilterChange}
          />
        )}
        {(filterType === "name" || filterType === "BookingId") && (
          <input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleFilterChange}
          />
        )}
        {filterType === "time" && (
          <select
            name="time"
            id="time"
            value={searchTerm}
            onChange={handleFilterChange}
          >
            <option value="18:00">18:00</option>
            <option value="21:00">21:00</option>
          </select>
        )}
        <button onClick={applyFilter}>Filtrera</button>
      </div>
      <ul>
        {!searchActive &&
          bookings
            .sort((a, b) => Number(a[5]) - Number(b[5]))
            .map((booking) => {
              return (
                <li key={booking[0]}>
                  <div className="booking-detail">
                    <p>Restaurant ID: {booking[5].toString()}</p>
                    <p>Name: {booking[2]}</p>
                    <p>Date: {booking[3]}</p>
                    <p>Time: {convertTime(booking[4])}</p>
                    <p>Number of Guests: {booking[1].toString()}</p>
                    <p>Booking ID: {booking[0].toString()}</p>
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
        {searchActive &&
          filteredBookings
            .sort((a, b) => Number(a[5]) - Number(b[5]))
            .map((booking) => {
              return (
                <li key={booking[0]}>
                  <div className="booking-detail">
                    <p>Restaurant ID: {booking[5].toString()}</p>
                    <p>Name: {booking[2]}</p>
                    <p>Date: {booking[3]}</p>
                    <p>Time: {convertTime(booking[4])}</p>
                    <p>Number of Guests: {booking[1].toString()}</p>
                    <p>Booking ID: {booking[0].toString()}</p>
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
      </ul>
    </div>
  );
};

ShowBookings.propTypes = {
  restaurantId: PropTypes.number,
  all: PropTypes.bool,
  readContract: PropTypes.object,
};
