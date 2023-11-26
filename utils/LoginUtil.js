const { User } = require("../models/User");
const fs = require("fs").promises;

async function readJSON(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const allUsers = await readJSON("./utils/users.json");

    if (!email || !password) {
      return res.status(500).json({ message: "Invalid credentials!" });
    }

    var validCredentials = false;
    for (var i = 0; i < allUsers.length; i++) {
      var currUser = allUsers[i];

      if (
        currUser.email == email &&
        currUser.password.toLowerCase() == password.toLowerCase()
      )
        validCredentials = true;
    }

    if (validCredentials) {
      return res.status(201).json({ message: "Login successful!" });
    } else {
      return res.status(500).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  readJSON,
  login,
};
