const { readJSON, writeJSON } = require("./UserUtil");
const { Booking } = require("../models/Booking");
async function addBooking(req, res) {
  try {
    const username = req.body.username;
    const rest = req.body.rest;
    const contact = req.body.contact;
    const people = req.body.people;
    const book_date = req.body.book_date;
    const newBooking = new Booking(username, rest, contact, people, book_date);
    const updatedBooking = await writeJSON(newBooking, "./utils/booking.json");
    return res.status(201).json(updatedBooking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  addBooking,
};
