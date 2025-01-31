const {
  addUserToDatabase,
  removeUserFromDatabase,
  updateUserFromDatabase,
  checkUserExists,
} = require("../services/user.service");
const { messages } = require("../common/config/messages");
const { FAILED_TO_PROCESS_REQUEST, INTERNAL_SERVER_ERROR, INVALID_USERNAME } =
  messages.COMMON;
const { RUNTIME_ERROR } = messages.ERROR;
const { USER_CREATED, USER_DELETED, USER_LOGIN_SUCCESS, USER_UPDATED } =
  messages.USER;
const statusCodes = require("../common/config/status-codes");
const { CREATED, SUCCESS, INVALID_REQUEST, INTERNAL_SERVER } = statusCodes;
const { USER_IDENTIFIER_STATUS } = require("../common/config/constants");
const { INVALID_USER, INVALID_PASSWORD } = USER_IDENTIFIER_STATUS;

const addUser = async (req, res) => {
  try {
    const response = await addUserToDatabase(req.body);
    if (response) {
      return res.status(200).json({
        statusCode: CREATED,
        message: `${USER_CREATED}`,
        data: response,
      });
    }
    return res.status(400).json({
      statusCode: INVALID_REQUEST,
      message: ` ${FAILED_TO_PROCESS_REQUEST}`,
      data: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await removeUserFromDatabase(req.body);
    if (response) {
      return res.status(200).json({
        statusCode: CREATED,
        message: `${USER_DELETED}`,
        data: response,
      });
    }
    return res.status(400).json({
      statusCode: INVALID_REQUEST,
      message: ` ${FAILED_TO_PROCESS_REQUEST}`,
      data: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const response = await updateUserFromDatabase(req.body);
    if (response) {
      return res.status(200).json({
        statusCode: CREATED,
        message: `${USER_UPDATED}`,
        data: response,
      });
    }
    return res.status(400).json({
      statusCode: INVALID_REQUEST,
      message: ` ${FAILED_TO_PROCESS_REQUEST}`,
      data: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const response = await checkUserExists(req.body);
    if (response === INVALID_USER || response === INVALID_PASSWORD) {
      return res.status(400).json({
        statusCode: INVALID_REQUEST,
        message: `${INVALID_USERNAME}`,
        data: [],
      });
    }
    if (response) {
      return res.status(200).json({
        statusCode: CREATED,
        message: `${USER_LOGIN_SUCCESS}`,
        data: response,
      });
    }
    return res.status(400).json({
      statusCode: INVALID_REQUEST,
      message: ` ${FAILED_TO_PROCESS_REQUEST}`,
      data: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  loginUser,
};
