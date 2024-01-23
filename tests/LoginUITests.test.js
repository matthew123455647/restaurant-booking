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

describe("Login Functionality", function () {
  it("should display an error for empty fields", async function () {
    await driver.get("http://localhost:" + server.address().port + "/login");

    const loginButton = await driver.findElement(
      By.xpath('//button[text()="Login"]')
    );
    await loginButton.click();

    const errorMessage = await driver.findElement(By.id("error")).getText();

    expect(errorMessage).to.equal("All fields are required!");
  });

  it("should display an error for invalid email", async function () {
    await driver.get("http://localhost:" + server.address().port + "/login");

    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.sendKeys("invalidemail");

    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.sendKeys("password123");

    const loginButton = await driver.findElement(
      By.xpath('//button[text()="Login"]')
    );
    await loginButton.click();

    const errorMessage = await driver.findElement(By.id("error")).getText();

    expect(errorMessage).to.equal("Validation error, email should have @");
  });

  it("should display an error for incorrect credentials", async function () {
    await driver.get("http://localhost:" + server.address().port + "/login");

    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.sendKeys("john.doe@example.com");

    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.sendKeys("incorrectpassword");

    const loginButton = await driver.findElement(
      By.xpath('//button[text()="Login"]')
    );
    await loginButton.click();

    const errorMessage = await driver.findElement(By.id("error")).getText();

    expect(errorMessage).to.equal("Invalid credentials!");
  });

  it("should successfully log in with valid credentials", async function () {
    await driver.get("http://localhost:" + server.address().port + "/login");

    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.sendKeys("john.doe@example.com");

    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.sendKeys("correctpassword");

    const loginButton = await driver.findElement(
      By.xpath('//button[text()="Login"]')
    );
    await loginButton.click();

    // You may need to adjust the following based on the actual behavior after successful login
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("/home");
  });
});

after(async function () {
  await driver.quit();
  await server.close();
  process.exit(0);
});
