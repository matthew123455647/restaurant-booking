const { readJSON, writeJSON } = require("./UserUtil");
const { Restaurant } = require("../models/Restaurant");



async function viewRestaurant(req, res) {
  try {
      const allRestaurants = await readJSON("./utils/restaurants.json");
      return res.status(201).json(allRestaurants);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  viewRestaurant
};
