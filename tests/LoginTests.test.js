const { describe, it, beforeEach } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const { login } = require("../utils/LoginUtil");

describe("Testing Login Function", () => {
  const usersFilePath = "utils/users.json";
  let orgContent = "";

  beforeEach(async () => {
    try {
      // Read and store the original content of users.json
      orgContent = await fs.readFile(usersFilePath, "utf8");

      orgContent = JSON.parse(orgContent);
    } catch (error) {
      //   console.error("Error reading or parsing file:", error);
    }
  });

  it("Should login successfully", async () => {
    if (orgContent.length > 0) {
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
    } else {
      //   console.error("No users found in orgContent");
    }
  });

  it("Should show invalid credentials", async () => {
    if (orgContent.length > 0) {
      const req = {
        body: {
          email: orgContent[0].email,
          password: "abcdefg",
        },
      };
      const res = {
        status: function (code) {
          expect(code).to.equal(500);
          return this;
        },
        json: function (data) {
          console.log("Response Data:", data);
          expect(data.message).to.equal("Invalid credentials!");
        },
      };
      await login(req, res);
    } else {
      //   console.error("No users found in orgContent");
    }
  });
});