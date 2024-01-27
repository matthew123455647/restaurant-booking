const { app } = require("../index");
const { Builder, By, until, Actions } = require("selenium-webdriver");
const { describe, it, before, after } = require("mocha");
const { expect } = require("chai");

const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(chromeOptions)
  .build();

let server;

before(async function () {
  server = await new Promise((resolve) => {
    server = app.listen(0, "localhost", () => {
      resolve(server);
    });
  });
});

describe("Testing Registration UI", function () {
  it("Should show error message - All fields required", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/authentication.html";
    await driver.get(baseUrl);

    // Click on the "Lead to Register" label to navigate to the registration page
    const leadToRegisterLabel = await driver.findElement(By.id('lead-to-register'));
    await new Actions(driver).click(leadToRegisterLabel).perform();

    // Wait for the registration form to load (adjust the timeout as needed)
    await driver.wait(until.elementLocated(By.id("registerForm")), 100000);

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(By.id('registerButton'));
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal("All fields are required!");
  });

  // Add more registration test cases here...

});

after(async function () {
  // await driver.quit();
  await server.close();
  process.exit(0);
});
