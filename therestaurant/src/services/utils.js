export const convertTime = (minutesBigInt) => {
  const minutes = Number(minutesBigInt);
  const hours = Math.floor(minutes / 100);
  const mins = minutes % 100;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

export const applyFilters = (bookings, filterType, searchTerm) => {
  if (!bookings) {
    return [];
  }

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
  return filteredBookings;
};
