const Event = require("../common/models/Events");

/**
 * Below function is response for add new entry of event to the database
 * @param {*} data
 * @returns
 */
const addEventEntryToDatabase = async (data) => {
  try {
    const { name, date, capacity, location, description } = data;
    const event = new Event({ name, date, capacity, location, description });
    await event.save();
    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * This function is responsible for fetch all events
 * @returns
 */
const fetchAllEvent = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * This function is responsible for delete Event
 * @param {*} eventId
 * @returns
 */
const deleteEventById = async (eventId) => {
  try {
    const result = await Event.findOneAndDelete({ _id: eventId });
    
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * This function is responsible for update event by its id
 * @param {*} data
 * @returns
 */
const updateEventById = async (data) => {
  try {
    const result = await Event.findOneAndUpdate(
      { _id: data.eventId },
      { $set: data }
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  addEventEntryToDatabase,
  fetchAllEvent,
  deleteEventById,
  updateEventById,
};
