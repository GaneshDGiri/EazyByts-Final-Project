const Event = require("../common/models/Events");
const Booking = require("../common/models/Booking");
const { EVENT_ERRORS } = require("../common/config/constants");
const fs = require("fs");
const { promisify } = require("util");
const XLSX = require("xlsx");

/**
 * Below function is responsible for create new entry of booking per user to the database
 * @param {*} data
 * @returns
 */
const addBookingEntryToDatabase = async (data) => {
  try {
    const { user, eventId, noOfTickets } = data;

    console.log(user, eventId, noOfTickets);
    try {
      await Event.findById(eventId);
    } catch (error) {
      return EVENT_ERRORS.EVENT_NOTFOUND;
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return EVENT_ERRORS.EVENT_NOTFOUND;
    }
    if (event.bookings.length >= event.capacity) {
      return EVENT_ERRORS.OUT_OF_CAPACITY;
    }
    const booking = new Booking({
      user,
      event: eventId,
      eventName: event.name,
      noOfTickets: noOfTickets,
    });
    await booking.save();
    event.bookings.push(booking._id);
    event.capacity = event.capacity - noOfTickets;
    await event.save();
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchBookingsByUsername = async (username) => {
  try {
    const events = await Booking.find({ user: username });
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const downloadBookingsByEventId = async (eventId, res) => {
  try {
    const events = await Booking.find({ event: eventId });

    const ws = XLSX.utils.json_to_sheet(events);

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write the workbook to a file
    const excelFilePath = "data.xlsx";
    XLSX.writeFile(wb, excelFilePath);

    // Send the file back in response to the client
    res.download(excelFilePath, "data.xlsx", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
      // Delete the file after sending it
      fs.unlinkSync(excelFilePath);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  addBookingEntryToDatabase,
  fetchBookingsByUsername,
  downloadBookingsByEventId,
};
