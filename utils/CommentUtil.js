const { Comment } = require("../models/Comment");

// Function to get all comments
async function getAllComments() {
  try {
    const comments = await Comment.find(); // Use your database query to get all comments
    return comments;
  } catch (error) {
    console.error("Error while retrieving comments:", error);
    throw error;
  }
}

module.exports = {
  getAllComments,
};