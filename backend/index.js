// server.js
const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./common/utils/db");
const EventRouter = require("./routes/events.route");
const BookingRouter = require("./routes/booking.route");
const UserRouter = require("./routes/user.route");

const { API_VERISON } = require("./common/config/constants");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(`${API_VERISON}`, UserRouter);

// app.use(require("./middleware/authentication.middleware").authenticateUser);
// app.use(require("./middleware/authorization.middleware").authorizeUser);
app.use(`${API_VERISON}`, EventRouter);
app.use(`${API_VERISON}`, BookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
