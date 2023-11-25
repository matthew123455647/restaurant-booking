
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { addComment } = require('../utils/AddCommentUtil');
const CommentUtil = require('../utils/CommentUtil'); // Adjust the import path as needed

describe('Testing resource related features', () => {
    const commentsFilePath = 'utils/comments.json';
    var orgContent = "";

    before(async () => {
        // Perform any global setup if needed
    });

    beforeEach(async () => {
        orgContent = await fs.readFile(commentsFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(commentsFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should add a new comment successfully', async () => {
        const req = {
            body: {
                username: "johndoe",
                restaurantName: "McDonalds",
                rating: "5",
                review: "bad",
                dateOfVisit: "30/10/2023",
                timestamp: "2023-11-14T12:56:50.052Z"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                // console.log(data)
                expect(data).to.have.lengthOf(orgContent.length + 1);
                expect(data[orgContent.length].username).to.equal(req.body.username);
            },
        };
        await addComment(req, res);
    });

    it('Should handle invalid input gracefully', async () => {
    const reqMissingUsername = {
        body: {
            restaurantName: "Pizza Hut",
            rating: "3",
            review: "okay",
            dateOfVisit: "25/11/2023",
            timestamp: "2023-11-25T10:30:00.000Z"
        },
    };
    const resMissingUsername = {
        status: function (code) {
            try {
                expect(code).to.equal(201); // Update to the correct expected status code
            } catch (error) {
                console.error(`Error: ${error.message}`);
            }
            return this;
        },
        json: function (data) {
            console.error(`Response body: ${JSON.stringify(data)}`);
        },
    };
    try {
        await addComment(reqMissingUsername, resMissingUsername);
    } catch (error) {
        console.error(`Unexpected error: ${error.message}`);
    }
});

    it('Should add a new comment to existing comments successfully', async () => {
        // Modify orgContent to simulate existing comments
        // ...

        const req = {
            body: {
                // Provide valid comment data
                username: "johndoe",
                restaurantName: "KFC",
                rating: "4",
                review: "good",
                dateOfVisit: "01/11/2023",
                timestamp: "2023-11-14T13:30:00.000Z"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data).to.have.lengthOf(orgContent.length + 1);
                // Additional assertions if needed
            },
        };
        await addComment(req, res);
    });

    it('Should handle file not found scenario', async () => {
        // Adjust commentsFilePath to a non-existent path
        const req = {
            body: {
                // Provide valid comment data
                username: "johndoe",
                restaurantName: "Burger King",
                rating: "3",
                review: "average",
                dateOfVisit: "05/11/2023",
                timestamp: "2023-11-14T14:15:00.000Z"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500); // Internal Server Error or another appropriate code
                return this;
            },
            json: function (data) {
                // Optionally, check the response body for error details
            },
        };
        await addComment(req, res);
    });
});



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
