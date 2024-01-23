const { app } = require("../index");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it, before, after } = require("mocha");
const { expect } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless");
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(chromeOptions)
  .build();
let server;

before(async function () {
  // Returning a Promise here
  return new Promise((resolve) => {
    server = app.listen(0, "localhost", () => {
      resolve();
    });
  });
});

describe("Testing Login UI", function () {
  it("Should have the correct title", async function () {
    const baseUrl = "http://localhost:" + server.address().port;
    await driver.get(baseUrl);
    const title = await driver.getTitle();
    console.log("Actual Title:", title); // Add this line
    expect(title).to.equal("Chicken Kitchen");
  });
});

after(async function () {
  // Returning a Promise here
  await driver.quit();
  await new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
});

// const { describe, it, beforeEach, afterEach } = require("mocha");
// const { expect } = require("chai");
// const { app, server } = require("../index");
// const fs = require("fs").promises;
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// chai.use(chaiHttp);

// describe("Testing API Routes", () => {
//   const usersFilePath = "utils/users.json";
//   var orgContent = "";

//   beforeEach(async () => {
//     orgContent = await fs.readFile(usersFilePath, "utf8");
//     orgContent = JSON.parse(orgContent);
//   });

//   afterEach(async () => {
//     await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
//   });

//   it("Should log in an existing user successfully", (done) => {
//     chai
//       .request(app)
//       .post("/login")
//       .send({
//         email: orgContent[0].email,
//         password: orgContent[0].password,
//       })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(201);
//         expect(res.body.message).to.equal("Login successful!");
//         done();
//         server.close();
//       });
//   });

//   it("Should handle login failure for incorrect credentials", (done) => {
//     chai
//       .request(app)
//       .post("/login")
//       .send({
//         email: "nonexistent@gmail.com",
//         password: "invalidpassword",
//       })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(500);
//         expect(res.body.message).to.equal("Invalid credentials!");
//         done();
//         server.close();
//       });
//   });

//   it("Should handle registration failure for an existing user", (done) => {
//     chai
//       .request(app)
//       .post("/register")
//       .send({
//         email: orgContent[0].email,
//         password: "newtestpassword",
//       })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(500);
//         expect(res.body.message).to.equal(
//           "Validation error: Invalid profile picture URL"
//         );
//         done();
//         server.close();
//       });
//   });
// });

// it("Should register a new user successfully", (done) => {
//     chai
//       .request(app)
//       .post("/register")
//       .send({
//         email: "newuser@gmail.com",
//         password: "newtestpassword",
//       })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(500);
//         done();
//         server.close();
//       });
//   });
