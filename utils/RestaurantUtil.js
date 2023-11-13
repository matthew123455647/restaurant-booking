const { readJSON, writeJSON } = require('./UserUtil');
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
        const name = req.params.name;

        // Test Case: Get Existing Restaurant by Name
        const foundRestaurant = allRestaurants.find(res => res.restaurantName === name);
        if (foundRestaurant) {
            return res.status(201).json(foundRestaurant);
        }

        // Test Case: Get Non-existent Restaurant by Name
        return res.status(404).json({ message: 'Restaurant not found' });

    } catch (error) {
        // Test Case: Error Handling - Internal Server Error
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    viewRestaurant, viewRestaurantByName
};