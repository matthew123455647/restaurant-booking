const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const CommentUtil = require('../utils/CommentUtil'); // Adjust the import path as needed

describe('Testing viewComment function', () => {
    const commentsFilePath = 'utils/comments.json';
    let originalComments = "";

    beforeEach(async () => {
        originalComments = await fs.readFile(commentsFilePath, 'utf8');
        originalComments = JSON.parse(originalComments);
    });

    afterEach(async () => {
        await fs.writeFile(commentsFilePath, JSON.stringify(originalComments), 'utf8');
    });

    it('Should return an array of comments successfully', async () => {
        const req = {};
        const res = {
            status: function (code) {
                expect(code).to.equal(201); // Adjusted to match your viewComment function
                return this;
            },
            json: function (data) {
                expect(Array.isArray(data)).to.be.true;
                // Add more assertions based on your data structure
            },
        };

        await CommentUtil.viewComment(req, res);
    });

    it('Should handle the case when there are no comments available', async () => {
        // Temporarily clear the comments file
        await fs.writeFile(commentsFilePath, '[]', 'utf8');

        const req = {};
        const res = {
            status: function (code) {
                expect(code).to.equal(201); // Adjusted to match your viewComment function
                return this;
            },
            json: function (data) {
                expect(Array.isArray(data)).to.be.true;
                expect(data).to.have.lengthOf(0);
            },
        };

        await CommentUtil.viewComment(req, res);
    });
});
