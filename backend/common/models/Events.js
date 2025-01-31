const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  location: { type: String },
  description: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
