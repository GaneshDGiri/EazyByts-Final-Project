import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Login from "./Login";
import UserCreation from "./UserCreation";
import BookingForm from "./BookingForm";

function App() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loggedIn, setLoggedIn] = useState(false); // Login state
  const [showForm, setShowForm] = useState(false);
  const [showPreviousContent, setShowPreviousContent] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [dateError, setDateError] = useState("");
  const [nameError, setNameError] = useState("");
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventName, setSelectedName] = useState(null);
  const [selectedEventDate, setSelectedDate] = useState(null);
  const [selectedEventLocation, setSelectedLocation] = useState(null);
  const [selectedEventDescription, setSelectedDescription] = useState(null);

  const handleBook = (eventId, name, date, location, description) => {
    setShowBookingForm(true);
    setSelectedEventId(eventId);
    setSelectedDate(date);
    setSelectedLocation(location);
    setSelectedName(name);
    setSelectedDescription(description);
    setShowPreviousContent(false);
  };

  const handleBookingComplete = () => {
    setShowBookingForm(false);
    setShowPreviousContent(true);
    // Refresh events or any other necessary actions
    fetchEvents();
  };

  const handleCancelBooking = () => {
    setShowBookingForm(false);
    // Show other content
    setShowPreviousContent(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setToken(""); // Clear token state
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowPreviousContent(!showPreviousContent);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set token state if found
      setToken(token);
      fetchEvents();
      fetchMyBooking();
    }
  }, [token]);

  const fetchMyBooking = async () => {
    try {
      const userData = username.replace(/[{}]/g, "");
      const response = await axios.get(
        `http://localhost:3001/V1/api/bookings/${userData}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data.data);
    } catch (error) {
      console.error("Failed to fetch my bookings:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/V1/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      let isValid = true;
      if (!name) {
        setNameError("Please enter a name");
        isValid = false;
      } else {
        setNameError("");
      }

      if (!date) {
        setDateError("Please select a date");
        isValid = false;
      } else {
        setDateError("");
      }

      if (!location) {
        setLocationError("Please enter a location");
        isValid = false;
      } else {
        setLocationError("");
      }

      if (!description) {
        setDescriptionError("Please enter a description");
        isValid = false;
      } else {
        setDescriptionError("");
      }

      if (!capacity) {
        setCapacityError("Please enter capacity");
        isValid = false;
      } else {
        setCapacityError("");
      }
      await axios.post(
        "http://localhost:3001/V1/api/events",
        {
          name,
          date,
          location,
          description,
          capacity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Event created successfully");
      setName("");
      setDate("");
      setLocation("");
      setDescription("");
      setCapacity("");
      fetchEvents();
    } catch (error) {
      alert("Failed to create event");
    }
  };

  const handleLogin = (token, role, username) => {
    setToken(token);
    setRole(role);
    setUsername(username);
    setLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const handleUserCreation = (token, role, username) => {
    setToken(token);
    setRole(role);
    setUsername(username);
    setLoggedIn(true);
  };

  const handleDownload = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/V1/api/download/${eventId}`,
        {
          responseType: "blob", // Set response type to blob
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookings.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <div>
      <h1>Event Booking App</h1>
      {!loggedIn ? (
        <div>
          <Router>
            <div className="App">
              <nav className="navbar">
                <ul className="nav-list">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route
                  exact="true"
                  path="/"
                  element={<Login onLogin={handleLogin} />}
                ></Route>
                <Route
                  exact="true"
                  path="/signup"
                  element={<UserCreation onUserCreation={handleUserCreation} />}
                ></Route>
              </Routes>
            </div>
          </Router>
        </div>
      ) : (
        <div className="main-container">
          {showPreviousContent && (
            <div className="main-box">
              <div className="header-box">
                <p>Welcome user {username}</p>
                {role !== "General" && (
                  <button className="open-btn" onClick={toggleForm}>
                    Organize Event
                  </button>
                )}
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
              {role !== "organizer" && (
                <div className="my-bookings">
                  <h2>Reservations</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Booking No.</th>
                        <th>Event Name</th>
                        <th>User Email</th>
                        <th>Event Id</th>
                        <th>Seat Booked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking["_id"]}>
                          <td>{booking._id}</td>
                          <td>{booking.eventName}</td>
                          <td>{booking.user}</td>
                          <td>{booking.event}</td>
                          <td>{booking.noOfTickets}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="table-container">
                <h2>Upcoming Events</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Capacity</th>
                        {role === "General" && <th>Action</th>}
                        {role !== "General" && <th>Download Link</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event._id}>
                          <td>{event.name}</td>
                          <td>{event.date}</td>
                          <td>{event.location}</td>
                          <td>{event.description}</td>
                          <td>{event.capacity}</td>
                          {role === "General" && (
                            <td>
                              <button
                                onClick={() =>
                                  handleBook(
                                    event._id,
                                    event.name,
                                    event.date,
                                    event.location,
                                    event.description
                                  )
                                }
                                className="button"
                              >
                                Book
                              </button>
                            </td>
                          )}

                          {role !== "General" && (
                            <td>
                              <button
                                onClick={() => handleDownload(event._id)}
                                className="button"
                              >
                                Download
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {showForm && (
            <div>
              <div className="create-event">
                <h2>Create Event</h2>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  />
                  {nameError && <span className="error">{nameError}</span>}
                </div>
                <div>
                  <label>Date:</label>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    className="input"
                    placeholderText="Select Date"
                  />
                  {dateError && <span className="error">{dateError}</span>}
                </div>
                <div>
                  <label>Location:</label>
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input"
                  />
                  {locationError && (
                    <span className="error">{locationError}</span>
                  )}
                </div>
                <div>
                  <label>Description:</label>
                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                    style={{ marginBottom: "10px" }}
                  />
                  {descriptionError && (
                    <span className="error">{descriptionError}</span>
                  )}
                </div>
                <div>
                  <label>Capacity:</label>
                  <input
                    type="text"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="input"
                    style={{ marginBottom: "10px" }}
                  />
                  {capacityError && (
                    <span className="error">{capacityError}</span>
                  )}
                </div>

                <button onClick={handleCreateEvent} className="button">
                  Create Event
                </button>
                <button type="button" onClick={toggleForm}>
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {showBookingForm && (
        <div className="booking-form-container">
          <BookingForm
            eventId={selectedEventId}
            eventName={selectedEventName}
            eventDate={selectedEventDate}
            eventLocation={selectedEventLocation}
            eventDescription={selectedEventDescription}
            onBooking={handleBookingComplete}
            username={username}
            isVisible={showBookingForm}
            onHide={handleCancelBooking}
            fetchEvents={fetchEvents}
            fetchMyBooking={fetchMyBooking}
          />
        </div>
      )}
    </div>
  );
}

export default App;
