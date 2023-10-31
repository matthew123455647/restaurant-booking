const { readJSON, writeJSON } = require('./UserUtil')
const { Comment } = require('../models/Comment');
async function viewComment(req, res) {
    try {
        const allComments = await readJSON('utils/comment.json');
        return res.status(201).json(allComments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    viewComment
};