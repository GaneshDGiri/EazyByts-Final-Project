const {
  addEventEntryToDatabase,
  fetchAllEvent,
  updateEventById,
  deleteEventById,
} = require("../services/event.service");
const { messages } = require("../common/config/messages");
const { FAILED_TO_PROCESS_REQUEST, INTERNAL_SERVER_ERROR } = messages.COMMON;
const { EVENT_CREATED, EVENT_FETCHED, EVENT_UPDATED, EVENT_DELETED } =
  messages.EVENT;
const { RUNTIME_ERROR } = messages.ERROR;
const statusCodes = require("../common/config/status-codes");
const { CREATED, INVALID_REQUEST, INTERNAL_SERVER, SUCCESS } = statusCodes;

/**
 * Below function is used to create new EVENT
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addEvent = async (req, res) => {
  try {
    const response = await addEventEntryToDatabase(req.body);
    if (response) {
      return res.status(201).json({
        statusCode: CREATED,
        message: `${EVENT_CREATED}`,
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
    res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

/**
 * Below function is used find all Events
 * @param {*} req
 * @param {*} res
 * @returns
 */
const findEvent = async (req, res) => {
  try {
    const response = await fetchAllEvent();
    if (response) {
      return res.status(200).json({
        statusCode: CREATED,
        message: `${EVENT_FETCHED}`,
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
    res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

/**
 * Below function is used to update EVENT
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateEvent = async (req, res) => {
  try {
    const response = await updateEventById(req.body);
    if (response) {
      return res.status(200).json({
        statusCode: SUCCESS,
        message: `${EVENT_UPDATED}`,
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
    res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

/**
 * Below function is used to delete EVENT
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteEvent = async (req, res) => {
  try {
    const response = await deleteEventById(req.params.eventId);
    if (response) {
      return res.status(200).json({
        statusCode: SUCCESS,
        message: `${EVENT_DELETED}`,
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
    res.status(500).json({
      statusCode: INTERNAL_SERVER,
      message: `${RUNTIME_ERROR} ${error}`,
      error: `${INTERNAL_SERVER_ERROR}`,
    });
  }
};

module.exports = {
  addEvent,
  findEvent,
  updateEvent,
  deleteEvent,
};
