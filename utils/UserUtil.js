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

async function writeJSON(object, filename) {
  try {
    const allObjects = await readJSON(filename);
    allObjects.push(object);
    await fs.writeFile(filename, JSON.stringify(allObjects), "utf8");
    return allObjects;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function isValidName(name) {
  // Check if the name contains only lowercase letters and is at least 3 characters long
  return /^[a-z]{3,}$/.test(name);
}

function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has already occurred this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function isValidPassword(password) {
  // Check if the password contains at least one capital letter and one of the specified special characters
  return (
    /[A-Z]/.test(password) &&
    /[<>?:"{},./;'[\]!@#\$%\^&\*()\-+=]/.test(password)
  );
}

function isValidURL(url) {
  // A simple URL validation regex, you can use a more comprehensive one
  const urlRegex = /^https?:\/\/\S+/;
  return urlRegex.test(url);
}

function isValidDate(dateString) {
  const dateObject = new Date(dateString);
  // Check if the dateObject is a valid date and the input date matches the parsed date
  return (
    dateObject instanceof Date &&
    !isNaN(dateObject) &&
    dateString === dateObject.toISOString().split("T")[0]
  );
}

async function register(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const birthday = req.body.birthday;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const phone_number = req.body.phone_number;
    const profile_picture = req.body.profile_picture;
    const username = req.body.username;

    // Check if the birthday is a valid date
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const age = calculateAge(birthday);

    if (!email.includes("@") || !email.includes(".") || password.length < 6) {
      return res
        .status(500)
        .json({ message: "Validation error: Invalid email or password" });
    } else if (!isValidName(username)) {
      return res.status(500).json({
        message:
          "Validation error: Username must contain only lowercase letters and be at least 3 characters long",
      });
    } else if (!isValidURL(profile_picture)) {
      // Validate the profile_picture parameter to ensure it's in URL format
      return res.status(500).json({
        message: "Validation error: Invalid profile picture URL",
      });
    } else if (age < 18) {
      return res.status(500).json({
        message:
          "Validation error: You must be at least 18 years old to register",
      });

      //REMINDER DO THE INVALID DATE :D
    } else if (!/^\d{8}$/.test(phone_number)) {
      return res.status(500).json({
        message: "Validation error: Phone number must be exactly 8 digits long",
      });
    } else if (!isValidPassword(password)) {
      return res.status(500).json({
        message:
          "Validation error: Password must contain at least one capital letter and one of the specified special characters",
      });
    } else if (
      !isValidDate(birthday) || // Invalid date
      currentDate < birthDate || // Date is in the future
      age > 116 // Age is over the limit
    ) {
      return res.status(400).json({
        message:
          "Validation error: Invalid birthdate or maximum age limit exceeded (116 years)",
      });
    } else {
      // Create a new User object with all the parameters
      const newUser = new User(
        email,
        password,
        birthday,
        first_name,
        last_name,
        phone_number,
        profile_picture,
        username
      );

      // Assuming you have a function to write the user data to a file
      const updatedUsers = await writeJSON(newUser, "utils/users.json");
      return res.status(201).json(updatedUsers);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  readJSON,
  writeJSON,
  register,
};
