const jwt = require("jsonwebtoken");
const { statusCodes } = require("../common/config/status-codes");
const { API_VERISON, API_URL } = require("../common/config/constants");
const { AUTH_ERROR, INVALID_TOKEN } = statusCodes;
const JWT_SECRET = "booking-secrete";

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (
    req.originalUrl === `${API_VERISON}${API_URL.ADD_USER}` ||
    req.originalUrl === `${API_VERISON}${API_URL.LOGIN_USER}`
  ) {
    next();
  }
  if (!token)
    return res.status(AUTH_ERROR).json({
      statusCode: AUTH_ERROR,
      message: "Authorization token is required.",
      data: [],
    });

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(INVALID_TOKEN)
      .json({ statusCode: INVALID_TOKEN, message: "Invalid token.", data: [] });
  }
};

module.exports = {
  authenticateUser,
};
