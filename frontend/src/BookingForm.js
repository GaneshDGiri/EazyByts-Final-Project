import React, { useState } from "react";
import "./App.css";

const BookingForm = ({
  eventId,
  eventName,
  eventDate,
  eventLocation,
  eventDescription,
  onBooking,
  username,
  isVisible,
  onHide,
  fetchEvents,
  fetchMyBooking,
}) => {
  const [noOfTickets, setNoOfTickets] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!noOfTickets) {
      setError("Please enter number of tickets");
      return;
    }
    // Call the booking API
    try {
      // Make API call to book the event with eventId and noOfTickets
      // Replace the API_URL with your actual booking API URL
      await fetch("http://localhost:3001/V1/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ eventId, noOfTickets, user: username }),
      });
      onBooking(); // Trigger any necessary actions after successful booking

      // Reload data by calling functions to fetch data from all APIs
      fetchEvents();
      fetchMyBooking();
    } catch (error) {
      console.error("Failed to book event:", error);
      setError("Failed to book event. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div>
        <h2>Book Event</h2>
        <p>
          <strong>Name:</strong> {eventName}
        </p>
        <p>
          <strong>Date:</strong> {eventDate}
        </p>
        <p>
          <strong>Location:</strong> {eventLocation}
        </p>
        <p>
          <strong>Description:</strong> {eventDescription}
        </p>
        <label>Number of Tickets:</label>
        <input
          type="number"
          value={noOfTickets}
          onChange={(e) => setNoOfTickets(e.target.value)}
        />
        {error && <span className="error">{error}</span>}
      </div>
      <button type="submit">Book</button>
      <button type="button" onClick={onHide}>
        Back
      </button>{" "}
      {/* Back button */}
    </form>
  );
};

export default BookingForm;
