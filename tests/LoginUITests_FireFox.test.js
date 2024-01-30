const { app } = require("../index");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const firefox = require("selenium-webdriver/firefox");
//const chromeOptions = new chrome.Options();
//chromeOptions.addArguments('--headless');
// const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
const driver = new Builder()
  .forBrowser("firefox")
  .setEdgeOptions(new firefox.Options())
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

describe("Testing Resource UI", function () {
  it("Should have the correct title", async function () {
    const baseUrl =
      "http://localhost:" + server.address().port + "/instrumented";
    this.timeout(100000);
    await driver.get(baseUrl);
  });

  it("Should show error message - All fields required", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
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
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("All fields are required!");
  });

  it("Should show error message - Invalid credentials", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
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
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();

    // const errorStyle = await driver
    //   .findElement(By.id("loginError"))
    //   .getAttribute("class");

    console.log(errorMessage);
    // // Assert that the error message contains the expected text and style
    expect(errorMessage).to.equal("Invalid credentials!");
    // expect(errorStyle).to.equal("text-danger");
  });

  it("Should show error message - Empty Email and Password", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the Login button without entering email and password
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
    await loginButton.click();

    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("All fields are required!");
  });

  it("Should show error message - Empty Email", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys("yourPassword"); // Enter a password

    // Locate and interact with the Login button without entering email
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
    await loginButton.click();

    // Verify that the appropriate error message is displayed
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("All fields are required!");
  });

  it("Should show error message - Empty Password", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("yourEmail@example.com"); // Enter an email

    // Locate and interact with the Login button without entering a password
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
    await loginButton.click();

    // Verify that the appropriate error message is displayed
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("All fields are required!");
  });

  it("Should show error message - Invalid Email Format", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("invalidEmail"); // Enter an invalid email format

    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys("yourPassword"); // Enter a password

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
    await loginButton.click();

    // Verify that the appropriate error message is displayed
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("Validation error, email should have @");
  });

  it("Should show error message - Invalid email and password format", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("invalid@email");

    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys("Invalid@Password");

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );

    await loginButton.click();
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("Invalid credentials!");
  });

  it("Should show error message - Incorrect Password", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("yourEmail@example.com"); // Enter a valid email

    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys("incorrectPassword"); // Enter an incorrect password

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
    await loginButton.click();

    // Verify that the appropriate error message is displayed
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("Invalid credentials!");
  });

  it("Should show error message - Nonexistent Email", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("nonexistentEmail@example.com"); // Enter a nonexistent email

    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys("yourPassword"); // Enter a password

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
    await loginButton.click();

    // Verify that the appropriate error message is displayed
    const errorMessage = await driver
      .findElement(By.id("loginError"))
      .getText();
    expect(errorMessage).to.equal("Invalid credentials!");
  });

  it("Should log in successfully", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys("example@email.com"); // Enter a valid email

    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys("StrongPassword123?"); // Enter a valid password

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );

    // Click the login button
    await loginButton.click();

    // Wait for the success alert (adjust the timeout as needed)
    await driver.wait(until.alertIsPresent(), 5000);

    // Handle the success alert
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).to.equal("User authentication successful!");

    // Dismiss the alert
    await alert.accept();

    // Wait for the login to complete (adjust the timeout as needed)
    await driver.wait(
      until.urlIs(
        "http://localhost:" + server.address().port + "/instrumented/index.html"
      ),
      5000
    );

    // Verify that the user is redirected to the correct page
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(
      "http://localhost:" + server.address().port + "/instrumented/index.html"
    );
  });

  it("Should log in successfully and store email in session storage", async function () {
    const baseUrl =
      "http://localhost:" +
      server.address().port +
      "/instrumented/authentication.html";
    await driver.get(baseUrl);
  
    // Replace with your actual login credentials
    const email = "example@email.com";
    const password = "StrongPassword123?";
  
    // Locate and interact with the email field
    const emailElement = await driver.findElement(By.id("email"));
    await emailElement.click(); // Click on the element
    await emailElement.sendKeys(email); // Enter a valid email
  
    // Locate and interact with the password field
    const passwordElement = await driver.findElement(By.id("password"));
    await passwordElement.click(); // Click on the element
    await passwordElement.sendKeys(password); // Enter a valid password
  
    // Locate and interact with the Login button
    const loginButton = await driver.findElement(
      By.xpath('//input[@id="loginButton"]')
    );
  
    // Click the login button
    await loginButton.click();
  
    // Wait for the success alert (adjust the timeout as needed)
    await driver.wait(until.alertIsPresent(), 5000);
  
    // Handle the success alert
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).to.equal("User authentication successful!");
  
    // Dismiss the alert
    await alert.accept();
  
    // Wait for the login to complete (adjust the timeout as needed)
    await driver.wait(
      until.urlIs(
        "http://localhost:" + server.address().port + "/instrumented/index.html"
      ),
      5000
    );
  
    // Verify that the user is redirected to the correct page
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(
      "http://localhost:" + server.address().port + "/instrumented/index.html"
    );
  
    // Check if the email is stored in session storage
    const storedEmail = await driver.executeScript(
      'return sessionStorage.getItem("email");'
    );
    expect(storedEmail).to.equal(email);
  });
});

afterEach(async function () {
  await driver
    .executeScript("return window.__coverage__;")
    .then(async (coverageData) => {
      if (coverageData) {
        // Save coverage data to a file
        await fs.writeFile(
          "coverage-frontend/coverage" + counter++ + ".json",
          JSON.stringify(coverageData),
          (err) => {
            if (err) {
              console.error("Error writing coverage data:", err);
            } else {
              console.log("Coverage data written to coverage.json");
            }
          }
        );
      }
    });
});

after(async function () {
  // await driver.quit();
  await server.close();
  process.exit(0);
});
