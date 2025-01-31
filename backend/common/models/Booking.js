const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  eventName: { type: String },
  noOfTickets: { type: Number },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
