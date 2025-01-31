const router = require("express").Router();
const {
  addBooking,
  findBooking,
  downloadBooking,
} = require("../controllers/booking.controller");
const { API_URL } = require("../common/config/constants");

/**
 * Below routes are responsible for handling booking requests
 */
router.post(`${API_URL.ADD_BOOKING}`, addBooking);
router.get(`${API_URL.ADD_BOOKING}/:username`, findBooking);
router.get(`${API_URL.DOWNLOAD_BOOKINGS}/:eventId`, downloadBooking);

module.exports = router;
