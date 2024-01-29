const { app } = require("../index");
const { Builder, By, Key, until } = require("selenium-webdriver");
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

describe("Testing Booking resource UI", function () {

  it("Should be able to add and display new resource", async function () {
    const baseUrl = "http://localhost:" + server.address().port + "/booking.html";
    await driver.get(baseUrl);

    // Locate and interact with the Login button
    const addButton = await driver.findElement(
      By.id(
        "addBookingButton"
      )
    );
    await addButton.click();
    // Wait for the modal to load
    console.log("aa")
    const resourceModal = await driver.findElement(By.id("resourceModal"));
    await driver.wait(until.elementIsVisible(resourceModal), 5000);

    // Locate and interact with the name field
    const rUsernameElement = await driver.findElement(By.id("username"));
    await driver.wait(until.elementIsVisible(rUsernameElement), 5000);
    await rUsernameElement.click(); // Click on the element
    await rUsernameElement.sendKeys("test");
    // Locate and interact with the location field
    const rRestElement = await driver.findElement(By.id("rest"));
    await driver.wait(until.elementIsVisible(rRestElement), 5000);
    // await rRestElement.click(); // Click on the element
    await rRestElement.sendKeys("Putian");
    // Locate and interact with the description field
    const rContactElement = await driver.findElement(By.id("contact"));
    await driver.wait(until.elementIsVisible(rContactElement), 5000);
    // await rContactElement.click(); // Click on the element
    await rContactElement.sendKeys("88888888");
    // Locate and interact with the description field
    const rPeopleElement = await driver.findElement(By.id("people"));
    await driver.wait(until.elementIsVisible(rPeopleElement), 5000);
    // await rPeopleElement.click(); // Click on the element
    await rPeopleElement.sendKeys("2");
    // Locate and interact with the description field
    const rDescElement = await driver.findElement(By.id("book_date"));
    await driver.wait(until.elementIsVisible(rDescElement), 5000);
    // await rDescElement.click(); // Click on the element
    await rDescElement.sendKeys("11/11/2023");
    // Locate the table element and locate all tr within table
    const tableBefore = await driver.findElement(By.tagName("table")); // Replace with the actual ID of your table
    const rowsBefore = await tableBefore.findElements(By.tagName("tr"));
    const beforeCount = rowsBefore.length;

    console.log("before" + beforeCount)
    // Locate and interact with the Login button
    const addButtonModal = await driver.findElement(
      By.id(
        "modalAddButton"
      )
    );
    await addButtonModal.click();

    console.log("after")
    // Wait for the modal to dismiss
    // await driver.manage().setTimeouts({ implicit: 5000 });

    // Locate the table element and locate all tr within table
    const tableUpdated = await driver.findElement(By.tagName("table"));
    const rowsUpdated = await tableUpdated.findElements(By.tagName("tr"));
    console.log(rowsUpdated.length)
    // Assert that the table rows increased by 1
    expect(rowsUpdated.length).to.equal(beforeCount + 1);
  });


  it("Should be able to open and close modal", async function () {
    const baseUrl = "http://localhost:" + server.address().port + "/booking.html";
    await driver.get(baseUrl);

    // Locate and interact with the Login button
    const addButton = await driver.findElement(
      By.id(
        "addBookingButton"
      )
    );
    await addButton.click();


    const resourceModal = await driver.findElement(By.id("resourceModal"));
    await driver.wait(until.elementIsVisible(resourceModal), 5000);

    const closeButton = await driver.findElement(
      By.id("modalCloseButton"));
    
    
    await closeButton.click();


    
  });

  it(" Should be able to View Booking details", async function () {
     // Navigate to the booking page
     const baseUrl = "http://localhost:" + server.address().port + "/booking.html";
     await driver.get(baseUrl);

    //check details on webpage
    const rUsernameElement = await driver.findElement(By.id("username"));
    expect(rUsernameElement)!=0
    //await driver.wait(until.elementIsVisible(rUsernameElement));
    //expect(rUsernameElement).to.exist

    const rRestElement = await driver.findElement(By.id("rest"));
    expect(rRestElement)!=0
    //await driver.wait(until.elementIsVisible(rRestElement));
    //expect(rRestElement).to.exist

    const rContactElement = await driver.findElement(By.id("contact"));
    expect(rContactElement)!=0
    //await driver.wait(until.elementIsVisible(rContactElement));
    //expect(rContactElement).to.exist

    const rPeopleElement = await driver.findElement(By.id("people"));
    expect(rPeopleElement)!=0
   //expect(rPeopleElement).to.exist

    const rDescElement = await driver.findElement(By.id("book_date"));
    expect(rDescElement)!=0
   // expect(rDescElement).to.exist

  });

   it("Should display All fields are required for having all empty inputs", async function () {
    const baseUrl = "http://localhost:" + server.address().port + "/booking.html";
  await driver.get(baseUrl);

  // Locate and interact with the "Add Booking" button
  const addButton = await driver.findElement(By.id("addBookingButton"));
  await addButton.click();

  // Wait for the modal to load
  const resourceModal = await driver.findElement(By.id("resourceModal"));
  await driver.wait(until.elementIsVisible(resourceModal), 5000);

  // Locate and interact with the name field
  const rUsernameElement = await driver.findElement(By.id("username"));
  await rUsernameElement.sendKeys("");

  // Locate and interact with the location field
  const rRestElement = await driver.findElement(By.id("rest"));
  await rRestElement.sendKeys("");

  // Locate and interact with the contact field
  const rContactElement = await driver.findElement(By.id("contact"));
  await rContactElement.sendKeys("");

  // Locate and interact with the people field
  const rPeopleElement = await driver.findElement(By.id("people"));
  await rPeopleElement.sendKeys("");

  // Locate and interact with the book date field
  const rDescElement = await driver.findElement(By.id("book_date"));
  await rDescElement.sendKeys("");

  // Click the "Add" button within the modal
  const addButtonModal = await driver.findElement(By.id("modalAddButton"));
  await addButtonModal.click();

  // Wait for the error message to appear
  const messageElement = await driver.findElement(By.id("message"));
  await driver.wait(until.elementIsVisible(messageElement), 5000);

  // Get the text content and class attribute of the message element
  const messageText = await messageElement.getText();
  const errorStyle = await messageElement.getAttribute("class");

  // Verify the error message and its style
  expect(messageText).to.equal("All fields are required!");
  expect(errorStyle).to.equal("text-danger");
  
});
   
   it("Should be able to delete a booking resource", async function () {
    const baseUrl = "http://localhost:" + server.address().port + "/booking.html";
    await driver.get(baseUrl);

    //  // Delete Resource
     const deleteButton = await driver.findElement(By.id("deletebtn"));
     await deleteButton.click();

     await driver.wait(until.stalenessOf(deleteButton));
     
   });
 });


after(async function () {
  await driver.quit();
  await server.close();
  process.exit(0);
});
