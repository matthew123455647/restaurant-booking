const { readJSON, writeJSON } = require('./UserUtil')
const { Restaurant } = require('../models/Restaurant');
async function viewRestaurant(req, res) {
    try {
        const allRestaurants = await readJSON('utils/restaurant.json');
        return res.status(201).json(allRestaurants);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function viewRestaurantByName(req, res) {
    try {
        const allRestaurants = await readJSON('utils/restaurant.json');
        const name = req.params.name
        return res.status(201).json(allRestaurants.find(res => res.restaurantName === name));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    viewRestaurant, viewRestaurantByName
};