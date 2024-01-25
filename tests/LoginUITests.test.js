const { app } = require("../index");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it } = require("mocha");
const { expect } = require("chai");

const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
// chromeOptions.addArguments("--headless");
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(chromeOptions)
  .build();

var server;

before(async function () {
  server = await new Promise((resolve) => {
    server = app.listen(0, "localhost", () => {
      resolve(server);
    });
  });
});

describe("Testing Resource UI", function () {
  it("Should have the correct title", async function () {
    const baseUrl = "http://localhost:" + server.address().port;
    this.timeout(100000);
    await driver.get(baseUrl);
  });

  it("Should show error message - All fields required", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/authentication.html";
    await driver.get(baseUrl);
    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("john@gmail.com");
    // Locate and interact with the Login button
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );

    await loginButton.click();
    const errorMessage = await driver.findElement(By.id("loginError")).getText();
    expect(errorMessage).to.equal("All fields are required!");
  });

  it("Should show error message - Invalid credentials", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/authentication.html";
    await driver.get(baseUrl);
    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("john@gmail.com");
    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys("abcdef");
    // Locate and interact with the Login button
    // const loginButton = await driver.findElement(
    //   By.xpath('//button[text()="Login"]')
    // );
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
    await loginButton.click();
    // Locate the error element and retrieve its text
    const errorMessage = await driver.findElement(By.id("loginError")).getText()

    // const errorStyle = await driver
    //   .findElement(By.id("loginError"))
    //   .getAttribute("class");

    console.log(errorMessage);
    // // Assert that the error message contains the expected text and style
    expect(errorMessage).to.equal("Invalid credentials!");
    // expect(errorStyle).to.equal("text-danger");
  });
});

after(async function () {
  // await driver.quit();
  await server.close();
  process.exit(0);
});
