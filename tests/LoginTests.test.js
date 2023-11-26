const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs").promises;
const { login } = require("../utils/LoginUtil");

describe("Testing Login Function", () => {
  const usersFilePath = "utils/users.json";
  let orgContent = "";
  let readFileStub;

  beforeEach(async () => {
    try {
      // Stub the fs.readFile method to simulate reading the users.json file
      readFileStub = sinon
        .stub(fs, "readFile")
        .resolves(
          JSON.stringify([{ email: "test@test.com", password: "password" }])
        );

      // Read and store the original content of users.json
      orgContent = await fs.readFile(usersFilePath, "utf8");
      orgContent = JSON.parse(orgContent);
    } catch (error) {
      // Handle the error if needed
    }
  });

  afterEach(() => {
    // Restore the original behavior of fs.readFile
    readFileStub.restore();
  });

  it("Should login successfully with valid credentials", async () => {
    const req = {
      body: {
        email: orgContent[0].email,
        password: orgContent[0].password,
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Login successful!");
      },
    };
    await login(req, res);
  });

  it("Should show invalid credentials for incorrect password", async () => {
    const req = {
      body: {
        email: orgContent[0].email,
        password: "incorrectPassword",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };
    await login(req, res);
  });

  it("Should show invalid credentials for incorrect email", async () => {
    const req = {
      body: {
        email: "nonexistent@example.com",
        password: "password123",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };
    await login(req, res);
  });

  it("Should handle file read error", async () => {
    // Simulate a file read error
    readFileStub.rejects(new Error("File read error"));

    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("File read error");
      },
    };

    await login(req, res);
  });

  it("Should handle JSON parse error", async () => {
    // Simulate an invalid JSON response
    readFileStub.resolves("Invalid JSON");

    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Unexpected error parsing JSON");
      },
    };

    await login(req, res);
  });

  it("Should handle unexpected error", async () => {
    // Simulate an unexpected error
    readFileStub.rejects(new Error("Unexpected error"));

    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Unexpected error");
      },
    };

    await login(req, res);
  });
});
