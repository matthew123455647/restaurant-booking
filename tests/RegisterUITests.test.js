const { app } = require("../index");
const { Builder, By } = require("selenium-webdriver");
const { describe, it } = require("mocha");
const { expect } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless");

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

describe("Registration Functionality", function () {
  it("should display an error for empty fields", async function () {
    await driver.get("http://localhost:" + server.address().port + "/register");

    const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
    await registerButton.click();

    const errorMessage = await driver.findElement(By.id("registerError")).getText();

    expect(errorMessage).to.equal("All fields are required!");
  });

  it("should display an error if passwords do not match", async function () {
    await driver.get("http://localhost:" + server.address().port + "/register");

    const emailElement = await driver.findElement(By.id("email_register"));
    await emailElement.sendKeys("john.doe@example.com");

    const passwordElement = await driver.findElement(By.id("password_register"));
    await passwordElement.sendKeys("password123");

    const confirmPasswordElement = await driver.findElement(By.id("confirmPassword"));
    await confirmPasswordElement.sendKeys("mismatchedpassword");

    const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
    await registerButton.click();

    const errorMessage = await driver.findElement(By.id("registerError")).getText();

    expect(errorMessage).to.equal("Password does not match!");
  });

  it("should display an error for registration failure", async function () {
    await driver.get("http://localhost:" + server.address().port + "/register");

    const emailElement = await driver.findElement(By.id("email_register"));
    await emailElement.sendKeys("invalidemail");

    const passwordElement = await driver.findElement(By.id("password_register"));
    await passwordElement.sendKeys("password123");

    const confirmPasswordElement = await driver.findElement(By.id("confirmPassword"));
    await confirmPasswordElement.sendKeys("password123");

    const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
    await registerButton.click();

    const errorMessage = await driver.findElement(By.id("registerError")).getText();

    expect(errorMessage).to.equal("Registration failed, email requires @!");
  });

  it("should successfully register with valid details", async function () {
    await driver.get("http://localhost:" + server.address().port + "/register");

    const emailElement = await driver.findElement(By.id("email_register"));
    await emailElement.sendKeys("newuser@example.com");

    const passwordElement = await driver.findElement(By.id("password_register"));
    await passwordElement.sendKeys("password123");

    const confirmPasswordElement = await driver.findElement(By.id("confirmPassword"));
    await confirmPasswordElement.sendKeys("password123");

    // You may need to fill in other required fields

    const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
    await registerButton.click();

    // You may need to adjust the following based on the actual behavior after successful registration
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("/login");
  });

  // Add more test cases as needed
});

after(async function () {
  await driver.quit();
  await server.close();
  process.exit(0);
});
