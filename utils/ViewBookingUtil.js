const { readJSON, writeJSON } = require("./UserUtil");
const { Booking } = require("../models/Booking");
async function viewBooking(req, res) {
  try {
    const allBookings = await readJSON("./utils/booking.json");
    return res.status(201).json(allBookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  viewBooking,
};
