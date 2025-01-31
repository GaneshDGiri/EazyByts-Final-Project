const router = require("express").Router();
const { API_URL } = require("../common/config/constants");
const {
  addUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/user.controller");

/**
 * Below routes are responsible for handling User authorization and authetication request requests
 */
router.post(`${API_URL.ADD_USER}`, addUser);
router.patch(`${API_URL.ADD_USER}`, updateUser);
router.delete(`${API_URL.ADD_USER}/:eventId`, deleteUser);
router.post(`${API_URL.LOGIN_USER}`, loginUser);

module.exports = router;
