const { app } = require("../index");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it, before, after } = require("mocha");
const { expect } = require("chai");

const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
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

describe("Testing Registration UI", function () {
  it("Should have the correct title", async function () {
    const baseUrl = "http://localhost:" + server.address().port;
    this.timeout(100000);
    await driver.get(baseUrl);
  });

  it("Should show error message - All fields required", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the entire page to be loaded
    await driver.wait(until.elementLocated(By.tagName("body")), 10000);

    // Wait for the registration form to load
    await driver.wait(until.elementLocated(By.id("registerForm")), 10000);

    // Add a wait for the register button to be clickable
    const registerButtonInForm = await driver.wait(
      until.elementLocated(By.id("registerButton")),
      10000
    );
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal("All fields are required!");
  });

  it("Should show error message - Invalid email format", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the registration form to load
    await driver.wait(until.elementLocated(By.id("registerForm")), 10000);

    // Fill in all fields
    await driver.findElement(By.id("first_name")).sendKeys("John");
    await driver.findElement(By.id("last_name")).sendKeys("Doe");
    await driver.findElement(By.id("email_register")).sendKeys("invalidemail");
    await driver
      .findElement(By.id("password_register"))
      .sendKeys("Password123!");
    await driver.findElement(By.id("birthday")).sendKeys("01-01-2000");
    await driver.findElement(By.id("phone_number")).sendKeys("12345678");
    await driver
      .findElement(By.id("profile_picture"))
      .sendKeys("http://example.com/image.jpg");
    await driver.findElement(By.id("username")).sendKeys("johndoe");

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(
      By.id("registerButton")
    );
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal("Invalid email format! e.g. john@gmail.com");
  });

  it("Should show error message - Invalid password format", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the registration form to load (adjust the timeout as needed)
    await driver.wait(until.elementLocated(By.id("registerForm")), 100000);

    // Fill in all fields with valid data except for the password
    await driver.findElement(By.id("first_name")).sendKeys("John");
    await driver.findElement(By.id("last_name")).sendKeys("Doe");
    await driver
      .findElement(By.id("email_register"))
      .sendKeys("john.doe@example.com");
    await driver
      .findElement(By.id("password_register"))
      .sendKeys("invalidpassword");
    await driver.findElement(By.id("birthday")).sendKeys("01-01-2000");
    await driver.findElement(By.id("phone_number")).sendKeys("12345678");
    await driver
      .findElement(By.id("profile_picture"))
      .sendKeys("http://example.com/image.jpg");
    await driver.findElement(By.id("username")).sendKeys("johndoe");

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(
      By.id("registerButton")
    );
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal(
      "Invalid password format! Password must contain at least one capital letter, one special character and 6 chracters long."
    );
  });

  it("Should show error message - Invalid date of birth format", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the registration form to load (adjust the timeout as needed)
    await driver.wait(until.elementLocated(By.id("registerForm")), 100000);

    // Fill in all fields with valid data except for the date of birth
    await driver.findElement(By.id("first_name")).sendKeys("John");
    await driver.findElement(By.id("last_name")).sendKeys("Doe");
    await driver
      .findElement(By.id("email_register"))
      .sendKeys("john.doe@example.com");
    await driver
      .findElement(By.id("password_register"))
      .sendKeys("ValidPassword1!");
    await driver.findElement(By.id("birthday")).sendKeys("2222-01-01");
    await driver.findElement(By.id("phone_number")).sendKeys("12345678");
    await driver
      .findElement(By.id("profile_picture"))
      .sendKeys("http://example.com/image.jpg");
    await driver.findElement(By.id("username")).sendKeys("johndoe");

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(
      By.id("registerButton")
    );
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal(
      "Invalid DOB format! You must be at least 18 years old to register"
    );
  });

  it("Should show error message - Invalid Phone Number", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the registration form to load (adjust the timeout as needed)
    await driver.wait(until.elementLocated(By.id("registerForm")), 100000);

    // Fill in all fields with valid data except for the phone number
    await driver.findElement(By.id("first_name")).sendKeys("John");
    await driver.findElement(By.id("last_name")).sendKeys("Doe");
    await driver
      .findElement(By.id("email_register"))
      .sendKeys("john.doe@example.com");
    await driver
      .findElement(By.id("password_register"))
      .sendKeys("ValidPassword1!");
    await driver.findElement(By.id("birthday")).sendKeys("01-01-2001");
    await driver.findElement(By.id("phone_number")).sendKeys("invalidnumber");
    await driver
      .findElement(By.id("profile_picture"))
      .sendKeys("http://example.com/image.jpg");
    await driver.findElement(By.id("username")).sendKeys("johndoe");

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(
      By.id("registerButton")
    );
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal("Invalid Phone Number!");
  });

  it("Should show error message - Invalid URL", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the registration form to load (adjust the timeout as needed)
    await driver.wait(until.elementLocated(By.id("registerForm")), 1000000000);

    // Fill in all fields with valid data except for the profile picture (invalid URL)
    await driver.findElement(By.id("first_name")).sendKeys("John");
    await driver.findElement(By.id("last_name")).sendKeys("Doe");
    await driver
      .findElement(By.id("email_register"))
      .sendKeys("john.doe@example.com");
    await driver
      .findElement(By.id("password_register"))
      .sendKeys("ValidPassword1!");
    await driver.findElement(By.id("birthday")).sendKeys("01-01-2000");
    await driver.findElement(By.id("phone_number")).sendKeys("12345678");
    await driver.findElement(By.id("profile_picture")).sendKeys("invalidurl");
    await driver.findElement(By.id("username")).sendKeys("johndoe");

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(
      By.id("registerButton")
    );
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal("Invalid URL!");
  });

  it("Should show error message - Invalid Username", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the entire page to be loaded
    await driver.wait(until.elementLocated(By.tagName("body")), 10000);

    // Wait for the registration form to load
    await driver.wait(until.elementLocated(By.id("registerForm")), 10000);

    // Fill in all fields with valid data except for the username
    await driver.findElement(By.id("first_name")).sendKeys("John");
    await driver.findElement(By.id("last_name")).sendKeys("Doe");
    await driver
      .findElement(By.id("email_register"))
      .sendKeys("john.doe@example.com");
    await driver
      .findElement(By.id("password_register"))
      .sendKeys("ValidPassword1!");
    await driver.findElement(By.id("birthday")).sendKeys("01-01-2000");
    await driver.findElement(By.id("phone_number")).sendKeys("12345678");
    await driver
      .findElement(By.id("profile_picture"))
      .sendKeys("http://example.com/image.jpg");
    await driver.findElement(By.id("username")).sendKeys("invalid username");

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(
      By.id("registerButton")
    );
    await registerButtonInForm.click();

    // Wait for the error message
    const errorMessage = await driver
      .findElement(By.id("registerError"))
      .getText();
    expect(errorMessage).to.equal(
      "Invalid username format! Only small letters please. Min 3 chracters."
    );
  });
});
describe("Testing Registration and User Creation", function () {
  it("Should register a new user and navigate to the home page", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/register.html";
    await driver.get(baseUrl);

    // Wait for the registration form to load
    await driver.wait(until.elementLocated(By.id("registerForm")), 10000);

    // Fill in registration form with valid data
    await driver.findElement(By.id("first_name")).sendKeys("New");
    await driver.findElement(By.id("last_name")).sendKeys("User");
    await driver
      .findElement(By.id("email_register"))
      .sendKeys("newuser@example.com");
    await driver
      .findElement(By.id("password_register"))
      .sendKeys("NewPassword123!");
    await driver.findElement(By.id("birthday")).sendKeys("01-01-1990");
    await driver.findElement(By.id("phone_number")).sendKeys("12345678");
    await driver
      .findElement(By.id("profile_picture"))
      .sendKeys("http://example.com/newuser.jpg");
    await driver.findElement(By.id("username")).sendKeys("newuser");

    // Locate and interact with the register button in the registration form
    const registerButtonInForm = await driver.findElement(
      By.id("registerButton")
    );
    await registerButtonInForm.click();

    // Wait for the alert to appear and handle it
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).to.equal("Registration successful! You can now log in.");
    await alert.accept(); // Click OK on the alert

    // Wait for navigation to the home page
    await driver.wait(
      until.urlIs("http://localhost:" + server.address().port + "/"),
      10000
    );

    // You can add additional assertions or actions on the home page if needed
    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.equal("Your Home Page Title");
  });
});

after(async function () {
  // await driver.quit();
  await server.close();
  process.exit(0);
});
