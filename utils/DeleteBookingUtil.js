const { readJSON, writeJSON } = require("./UserUtil");
const { Resource } = require("../models/Booking");
const fs = require("fs").promises;

async function deleteBooking(req, res) {
  try {
    const id = req.params.id;
    const allBookings = await readJSON("./utils/booking.json");
    var index = -1;
    for (var i = 0; i < allBookings.length; i++) {
      var currentBooking = allBookings[i];
      if (currentBooking.id == id) index = i;
    }
    if (index != -1) {
      allBookings.splice(index, 1);
      await fs.writeFile(
        "./utils/booking.json",
        JSON.stringify(allBookings),
        "utf8"
      );
      return res
        .status(201)
        .json({ message: "Resource deleted successfully!" });
    } else {
      return res
        .status(500)
        .json({ message: "Error occurred, unable to delete!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  deleteBooking,
};
