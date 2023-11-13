const { readJSON, writeJSON } = require('./UserUtil');
const { Comment } = require('../models/Comment');

async function addComment(req, res) {
    try {
        // Validation of Request Body
        const requiredFields = ['username', 'restaurantName', 'rating', 'review', 'dateOfVisit', 'timestamp'];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Missing required field: ${field}` });
            }
        }

        const username = req.body.username;
        const restaurantName = req.body.restaurantName;
        const rating = req.body.rating;
        const review = req.body.review;

        // Limiting Comment Length
        const maxReviewLength = 500;
        if (review.length > maxReviewLength) {
            return res.status(400).json({ message: 'Review exceeds the maximum allowed length.' });
        }

        const dateOfVisit = req.body.dateOfVisit;
        const timestamp = req.body.timestamp;

        // Duplicate Comment Handling
        if (await isCommentExists(timestamp)) {
            return res.status(409).json({ message: 'Comment with the same timestamp already exists.' });
        }

        const newComment = new Comment(username, restaurantName, rating, review, dateOfVisit, timestamp);

        // Error Handling for writeJSON
        const updatedComment = await writeJSON(newComment, 'utils/comment.json');

        if (!updatedComment) {
            return res.status(500).json({ message: 'Failed to add comments.' });
        }

        return res.status(201).json(updatedComment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Function to check if a comment with the same timestamp exists
async function isCommentExists(timestamp) {
    // Implementation to check if a comment with the same timestamp exists
    // Return true if exists, false otherwise
}

module.exports = {
    addComment
};