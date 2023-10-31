const { readJSON, writeJSON } = require('./UserUtil')
const { Comment } = require('../models/Comment');
async function addComment(req, res) {
    try {
        const username = req.body.username;
        const restaurantName = req.body.restaurantName;
        const rating = req.body.rating;
        const review = req.body.review;
        const dateOfVisit = req.body.dateOfVisit;
        const timestamp = req.body.timestamp;
        const newComment = new Comment(username, restaurantName, rating, review, dateOfVisit, timestamp);
        const updatedComment = await writeJSON(newComment, 'utils/comment.json');
        return res.status(201).json(updatedComment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addComment
};