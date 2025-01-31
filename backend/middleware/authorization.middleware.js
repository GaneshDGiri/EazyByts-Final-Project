const {
  API_VERISON,
  API_URL,
  USER_TYPE,
} = require("../common/config/constants");
const { statusCodes } = require("../common/config/status-codes");
const { messages } = require("../common/config/messages");
const { ADD_EVENT, ADD_BOOKING } = API_URL;
const { EVENT_ORIGANIZER, GENERAL } = USER_TYPE;
const { INVALID_TOKEN } = statusCodes;
const { FORBIDDEN } = messages.ERROR;

const authorizeUser = (req, res, next) => {
  if (
    (req.user.role === EVENT_ORIGANIZER &&
      req.originalUrl === `${API_VERISON}${ADD_BOOKING}`) ||
    (req.user.role === GENERAL &&
      req.originalUrl === `${API_VERISON}${ADD_EVENT}` &&
      req.method === "POST")
  ) {
    return res
      .status(INVALID_TOKEN)
      .json({ statusCode: INVALID_TOKEN, message: `${FORBIDDEN}` });
  }

  next();
};

module.exports = {
  authorizeUser,
};
