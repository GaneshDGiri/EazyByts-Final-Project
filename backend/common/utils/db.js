const mongoose = require("mongoose");
const { messages } = require("../config/messages");
const { DATABASE_SUCCESS_CONNECTION, DATABASE_FAILED_CONNECTION } =
  messages.DATABASE;

const connectionUrl =
  process.env.MONGO_URI ?? "mongodb://localhost:27017/bookingApp";
mongoose
  .connect(connectionUrl)
  .then(() => console.log(`${DATABASE_SUCCESS_CONNECTION}`))
  .catch((err) => console.error(`${DATABASE_FAILED_CONNECTION}`, err));

module.exports = mongoose.connection;
