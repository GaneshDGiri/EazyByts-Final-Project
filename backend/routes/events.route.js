const router = require("express").Router();
const { API_URL } = require("../common/config/constants");
const {
  addEvent,
  findEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");


/**
 * Below routes are responsible for handling Event requests
 */
router.post(`${API_URL.ADD_EVENT}`, addEvent);
router.get(`${API_URL.ADD_EVENT}`, findEvent);
router.patch(`${API_URL.ADD_EVENT}`, updateEvent);
router.delete(`${API_URL.ADD_EVENT}/:eventId`, deleteEvent);

module.exports = router;
