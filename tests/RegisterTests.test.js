const fs = require("fs").promises;
const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const { register, readJSON, writeJSON, isValidDate,} = require("../utils/UserUtil");

describe("Testing Register Function", () => {
    let readFileStub;
    let writeFileStub;

    beforeEach(() => {
        // Stub the fs.readFile and fs.writeFile methods
        readFileStub = sinon.stub(fs, "readFile");
        writeFileStub = sinon.stub(fs, "writeFile");
    });

    afterEach(() => {
        // Restore the stubbed methods to their original implementations
        readFileStub.restore();
        writeFileStub.restore();
    });

    it("Should register a new user successfully", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "Password123!",
                birthday: "1990-01-01",
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "https://example.com/profile.jpg",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        // Simulate reading an empty users.json file
        readFileStub.resolves("[]");

        // Simulate writing the user data to the file
        writeFileStub.resolves(
            '[{"email":"test@example.com","password":"Password123!","birthday":"1990-01-01","first_name":"John","last_name":"Doe","phone_number":"12345678","profile_picture":"https://example.com/profile.jpg","username":"johndoe"}]'
        );

        await register(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith([
                {
                    /* expected user data */
                },
            ])
        ).to.be.true;
    });

    it("Should handle validation error for invalid email or password", async () => {
        const req = {
            body: {
                email: "invalid-email",
                password: "weak",
                birthday: "1990-01-01",
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "https://example.com/profile.jpg",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith({
                message: "Validation error: Invalid email or password",
            })
        ).to.be.true;
    });

    it("Should handle validation error for invalid username", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "StrongPassword1!",
                birthday: "1990-01-01",
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "https://example.com/profile.jpg",
                username: "in",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith({
                message:
                    "Validation error: Username must contain only lowercase letters and be at least 3 characters long",
            })
        ).to.be.true;
    });

    it("Should handle validation error for invalid profile picture URL", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "StrongPassword1!",
                birthday: "1990-01-01",
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "invalid-url",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith({
                message: "Validation error: Invalid profile picture URL",
            })
        ).to.be.true;
    });

    it("Should handle validation error for age below 18", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "StrongPassword1!",
                birthday: "2023-01-01", // Future date to ensure age is below 18
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "https://example.com/profile.jpg",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith({
                message:
                    "Validation error: You must be at least 18 years old to register",
            })
        ).to.be.true;
    });

    it("Should handle validation error for invalid phone number", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "StrongPassword1!",
                birthday: "1990-01-01",
                first_name: "John",
                last_name: "Doe",
                phone_number: "invalid-number",
                profile_picture: "https://example.com/profile.jpg",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith({
                message: "Validation error: Phone number must be exactly 8 digits long",
            })
        ).to.be.true;
    });

    it("Should handle validation error for invalid password", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "weakpassword",
                birthday: "1990-01-01",
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "https://example.com/profile.jpg",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith({
                message:
                    "Validation error: Password must contain at least one capital letter and one of the specified special characters",
            })
        ).to.be.true;
    });

    it("Should handle validation error for invalid birthdate or age over 116", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "StrongPassword1!",
                birthday: "1800-01-01", // More than 116 years ago
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "https://example.com/profile.jpg",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await register(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(
            res.json.calledWith({
                message:
                    "Validation error: Invalid birthdate or maximum age limit exceeded (116 years)",
            })
        ).to.be.true;
    });

    it("Should handle unexpected error", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "StrongPassword1!",
                birthday: "1990-01-01",
                first_name: "John",
                last_name: "Doe",
                phone_number: "12345678",
                profile_picture: "https://example.com/profile.jpg",
                username: "johndoe",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        // Simulate an unexpected error during registration
        sinon.stub(fs, "readFile").rejects(new Error("Unexpected error"));

        await register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWith({ message: "Unexpected error" })).to.be.true;

        // Restore the stubbed method
        fs.readFile.restore();
    });
});
