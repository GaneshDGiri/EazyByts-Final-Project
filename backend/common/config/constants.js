const API_URL = {
  ADD_BOOKING: "/api/bookings",
  DOWNLOAD_BOOKINGS: "/api/download",
  ADD_EVENT: "/api/events",
  ADD_USER: "/api/user",
  LOGIN_USER: "/api/login",
};

const USER_IDENTIFIER_STATUS = {
  INVALID_USER: 1,
  INVALID_PASSWORD: 2,
};

const EVENT_ERRORS = {
  EVENT_NOTFOUND: "event_not_found",
  OUT_OF_CAPACITY: "out_of_capacity",
};
const USER_TYPE = {
  EVENT_ORIGANIZER: "Organizer",
  GENERAL: "General",
};
const API_VERISON = "/V1/";

module.exports = {
  API_URL,
  API_VERISON,
  USER_IDENTIFIER_STATUS,
  USER_TYPE,
  EVENT_ERRORS,
};
