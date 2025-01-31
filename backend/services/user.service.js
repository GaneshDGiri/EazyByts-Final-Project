const User = require("../common/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { USER_IDENTIFIER_STATUS } = require("../common/config/constants");
const { INVALID_USER, INVALID_PASSWORD } = USER_IDENTIFIER_STATUS;
const saltRounds = 10;
const JWT_SECRET = "booking-secrete";

const addUserToDatabase = async (data) => {
  try {
    const { username, password, role, firstName, lastName } = data;
    let finalResponse = {};
    let user = "";
    console.log(
      `^^^^^^^^^^^^^^^^^^^^^^^^^`,
      username,
      password,
      role,
      firstName,
      lastName
    );
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        throw err;
      } else {
        user = new User({
          username,
          role,
          password: hash,
          firstName,
          lastName,
        });
        await user.save();
      }
    });
    const token = await jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    finalResponse = {
      username,
      token,
      role,
    };
    return finalResponse;
  } catch (error) {
    throw error;
  }
};

const removeUserFromDatabase = async (userId) => {
  try {
    const result = await User.findOneAndDelete({ _id: userId });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateUserFromDatabase = async (data) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: data.userId },
      { $set: data }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const checkUserExists = async (data) => {
  try {
    const { username, password } = data;
    const user = await User.findOne({ username: username });
    if (!user) {
      return INVALID_USER;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return INVALID_PASSWORD;
    }
    const token = await jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return [
      {
        token,
        role: user.role,
        username: user.username,
      },
    ];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUserToDatabase,
  removeUserFromDatabase,
  updateUserFromDatabase,
  checkUserExists,
};
