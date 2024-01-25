const { app } = require("../index");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;

const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless");
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(chromeOptions)
  .build();
var server;
var counter = 0;
before(async function () {
  server = await new Promise((resolve) => {
    server = app.listen(0, "localhost", () => {
      resolve(server);
    });
  });
});

// describe("Testing Register UI", function () {
//   it("Should show error message - Password does not match", async function () {
//     this.timeout(100000);
//     const baseUrl =
//       "http://localhost:" +
//       server.address().port +
//       "/instrumented/register.html";
//     await driver.get(baseUrl);
//     // Locate and interact with the email field
//     const emailElement = await driver.findElement(By.id("email"));
//     await emailElement.click(); // Click on the element
//     await emailElement.sendKeys("paul@gmail.com");
//     // Locate and interact with the password field
//     const passwordElement = await driver.findElement(By.id("password"));
//     await emailElement.click(); // Click on the element
//     await passwordElement.sendKeys("123456");
//     // Locate and interact with the confirm password field
//     const confirmPasswordElement = await driver.findElement(
//       By.id("confirmPassword")
//     );
//     await confirmPasswordElement.click(); // Click on the element
//     await confirmPasswordElement.sendKeys("1234");
//     // Locate and interact with the Register button
//     const registerButton = await driver.findElement(
//       By.xpath('//button[text()="Register"]')
//     );
//     await registerButton.click();
//     // Locate the error element and retrieve its text
//     const errorMessage = await driver.findElement(By.id("error")).getText();
//     const errorStyle = await driver
//       .findElement(By.id("error"))
//       .getAttribute("class");
//     // Assert that the error message contains the expected text and style
//     expect(errorMessage).to.equal("Password does not match!");
//     expect(errorStyle).to.equal("text-danger");
//   });
//   it("Should clear textboxes when Reset is clicked", async function () {
//     this.timeout(100000);
//     const baseUrl =
//       "http://localhost:" +
//       server.address().port +
//       "/instrumented/register.html";
//     await driver.get(baseUrl);
//     // Locate and interact with the email field
//     const emailElement = await driver.findElement(By.id("email"));
//     await emailElement.click(); // Click on the element
//     await emailElement.sendKeys("paul@gmail.com");
//     // Locate and interact with the password field
//     const passwordElement = await driver.findElement(By.id("password"));
//     await emailElement.click(); // Click on the element
//     await passwordElement.sendKeys("123456");
//     // Locate and interact with the confirm password field
//     const confirmPasswordElement = await driver.findElement(
//       By.id("confirmPassword")
//     );
//     await confirmPasswordElement.click(); // Click on the element
//     await confirmPasswordElement.sendKeys("1234");
//     // Locate and interact with the Reset button
//     const resetButton = await driver.findElement(
//       By.xpath('//button[text()="Reset"]')
//     );
//     await resetButton.click();
//     // Locate the error element and retrieve its text
//     const emailText = await emailElement.getText();
//     const passwordText = await passwordElement.getText();
//     const confirmPasswordText = await confirmPasswordElement.getText();
//     // Assert that the etextboxes are all empty
//     expect(emailText).to.equal("");
//     expect(passwordText).to.equal("");
//     expect(confirmPasswordText).to.equal("");
//   });
// });

// afterEach(async function () {
//   await driver
//     .executeScript("return window.__coverage__;")
//     .then(async (coverageData) => {
//       if (coverageData) {
//         // Save coverage data to a file
//         await fs.writeFile(
//           "coverage-frontend/coverage" + counter++ + ".json",
//           JSON.stringify(coverageData),
//           (err) => {
//             if (err) {
//               console.error("Error writing coverage data:", err);
//             } else {
//               console.log("Coverage data written to coverage.json");
//             }
//           }
//         );
//       }
//     });
// });
// after(async function () {
//   await driver.quit();
//   await server.close();
//   process.exit(0);
// });
