// const { describe, it } = require("mocha");
// const { expect } = require("chai");
// const sinon = require("sinon");
// const fs = require("fs").promises;
// const { register } = require("../utils/UserUtil");

// describe("Testing User Registration", () => {
//   let writeFileStub;

//   beforeEach(() => {
//     // Stub the fs.writeFile method to prevent writing to the file during tests
//     writeFileStub = sinon.stub(fs, "writeFile");
//   });

//   afterEach(() => {
//     // Restore the original behavior of fs.writeFile after each test
//     writeFileStub.restore();
//   });

//   it("Should successfully register a user with valid data", async () => {
//     const req = {
//       body: {
//         email: "test@example.com",
//         password: "Password123!",
//         birthday: "1990-01-01",
//         first_name: "John",
//         last_name: "Doe",
//         phone_number: "12345678",
//         profile_picture: "https://example.com/profile.jpg",
//         username: "johndoe",
//       },
//     };

//     const res = {
//       status: function (code) {
//         expect(code).to.equal(201);
//         return this;
//       },
//       json: function (data) {
//         expect(data).to.be.an("array").with.lengthOf(1);
//         // You might want to add more specific assertions based on the expected user object structure
//       },
//     };

//     await register(req, res);

//     // Check if fs.writeFile was called with the expected arguments
//     sinon.assert.calledOnceWithExactly(
//       writeFileStub,
//       "utils/users.json",
//       sinon.match.string,
//       "utf8"
//     );
//   });

//   it("Should handle validation error for invalid email", async () => {
//     const req = {
//       body: {
//         email: "invalid-email",
//         password: "Password123!",
//         birthday: "1990-01-01",
//         first_name: "John",
//         last_name: "Doe",
//         phone_number: "12345678",
//         profile_picture: "https://example.com/profile.jpg",
//         username: "johndoe",
//       },
//     };

//     const res = {
//       status: function (code) {
//         expect(code).to.equal(500);
//         return this;
//       },
//       json: function (data) {
//         expect(data.message).to.equal(
//           "Validation error: Invalid email or password"
//         );
//       },
//     };

//     await register(req, res);
//     sinon.assert.notCalled(writeFileStub); // Ensure fs.writeFile was not called
//   });

//   // Add more test cases for other validation scenarios...
// });
