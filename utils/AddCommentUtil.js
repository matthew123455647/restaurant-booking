const { readJSON, writeJSON } = require('./UserUtil');
const { Comment } = require('../models/Comment');

async function addComment(req, res) {
    try {
        const username = req.body.username;
        const restaurantName = req.body.restaurantName;
        const rating = req.body.rating;
        const review = req.body.review;
        const dateOfVisit = req.body.dateOfVisit;
        const newReview = new Comment(username, restaurantName, rating, review, dateOfVisit);
        const updatedReview = await writeJSON(newReview, 'utils/comment.json');
        return res.status(201).json(updatedReview);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addComment
};