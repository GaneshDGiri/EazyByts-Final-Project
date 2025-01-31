const bcrypt = require("bcrypt");

const generatePassword = (password) => {
  new Promise((resolve, reject) => {
    let newpassword = bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

module.exports = {
  generatePassword,
};
