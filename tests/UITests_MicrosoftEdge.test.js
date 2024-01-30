const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const edge = require('selenium-webdriver/edge');
const fs = require('fs').promises;

const driver = new Builder()
  .forBrowser('MicrosoftEdge')
  .setEdgeOptions(new edge.Options())
  .build();

driver.manage().window().maximize();
var counter = 0;
var server;

before(async function () {
  server = await new Promise((resolve) => {
    server = app.listen(0, 'localhost', () => {
      resolve(server);
    });
  })
});

describe('Testing Microsoft browser', function () {

  this.timeout(100000); // Set timeout as 10 seconds

  it('Should show title: Chicken Kitchen', async () => {
    await driver.get('http://localhost:5050/');
    const title = await driver.getTitle(); // Get the title of the web page
    expect(title).to.equal("Chicken Kitchen"); // Assert that title matches "Swag Labs"
  });
});


describe('Testing for Search Restaurant', function () {
  it('Should display matching restaurants when searching', async function () {
    const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

    await driver.get(baseUrl);

    // Assuming the search input has the id "searchInput"
    const searchInput = await driver.findElement(By.id('searchInput'));

    // Clear search input before typing
    await searchInput.clear();

    // Type a search query
    await searchInput.sendKeys('PUTIEN');

    // Wait for the results to update (replace with an appropriate wait condition)
    await driver.wait(until.elementLocated(By.className('card')), 5000);

    // Get the displayed restaurant names after search
    const displayedTitles = await driver.findElements(By.css('.card-title'));
    const displayedTitlesText = await Promise.all(displayedTitles.map(title => title.getText()));

    // Assert that at least one result is displayed
    expect(displayedTitlesText.length).to.be.greaterThan(0);

    // Assert that each displayed title contains the search query
    displayedTitlesText.forEach(title => {
      expect(title.toLowerCase()).to.include('putien');
    });
  });



  it('Should clear results when search input is cleared', async function () {
    const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
    await driver.get(baseUrl);

    // Assuming the search input has the id "searchInput"
    const searchInput = await driver.findElement(By.id('searchInput'));

    // Clear the search input
    await searchInput.clear();


  });
});

describe('Testing for show and add review', function () {
  it('Should show review', async function () {
    this.timeout(100000);
    const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
    await driver.get(baseUrl);

    // Assuming there is a function viewOneRest that shows the modal
    const restaurantCard = await driver.findElement(By.id('viewclick0')); // Adjust the selector based on your application
    await restaurantCard.click();

    // Wait for the modal to appear (replace with appropriate selector and condition)
    const modalElement = await driver.findElement(By.id('restaurantsModal'));
    await driver.wait(until.elementIsVisible(modalElement), 5000); // Adjust the selector based on your application

    // Click on the "Toggle Review" button
    const toggleReviewButton = await driver.findElement(By.id('toggle-review'));
    await toggleReviewButton.click();

    // Wait for the review section to be visible
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('review-section'))), 10000);

    // Assert that the review section is now visible
    const reviewSection = await driver.findElement(By.id('review-section'));
    const isReviewSectionVisible = await reviewSection.isDisplayed();
    expect(isReviewSectionVisible).to.be.true;

    // ... any additional assertions related to the review content ...

    // Optionally, you can click on the "Toggle Description" button to go back to the description
    const toggleDescriptionButton = await driver.findElement(By.id('toggle-description'));
    await toggleDescriptionButton.click();

    // Wait for the description section to be visible
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('description-section'))), 10000);

    // Assert that the description section is now visible
    const descriptionSection = await driver.findElement(By.id('description-section'));
    const isDescriptionSectionVisible = await descriptionSection.isDisplayed();
    expect(isDescriptionSectionVisible).to.be.true;
  });

  it('Should add review', async function () {
    // Mocking user interactions
    const addReviewButton = await driver.findElement(By.id('addReview'));
    await addReviewButton.click();
    const AddReviewModal = await driver.findElement(By.id('newReviewModal'));
    await driver.wait(until.elementIsVisible(AddReviewModal), 5000);

    const usernameInput = await driver.findElement(By.id('username1'));
    await usernameInput.click();
    await usernameInput.sendKeys('John Doe');

    const userCommentsInput = await driver.findElement(By.id('userComments'));
    await userCommentsInput.click();
    await userCommentsInput.sendKeys('The food is good');

    const dateOfVisitInput = await driver.findElement(By.id('dateOfVisit'));
    await dateOfVisitInput.click();
    await dateOfVisitInput.sendKeys('01/23/2024'); // Assuming MM/DD/YYYY format

    const ratingInput = await driver.findElement(By.id('rating2'));
    await ratingInput.click();

    const tableBefore = await driver.findElement(By.tagName('table')); // Replace with the
    const rowsBefore = await tableBefore.findElements(By.tagName('tr'));
    const beforeCount = rowsBefore.length

    const newReviewModal = await driver.findElement(By.id('submitReview'));
    await newReviewModal.click();

    // Wait for the modal to dismiss (if applicable)
    await driver.wait(until.stalenessOf(newReviewModal), 5000);

    // Assuming you have a table with reviews and each review is represented by a tr element
    const tableUpdated = await driver.findElement(By.tagName('table'));
    const rowsUpdated = await tableUpdated.findElements(By.tagName('tr'));

    // Assert that the table rows increased by 1
    expect(rowsUpdated.length).to.equal(beforeCount + 1);

    // Additional assertions to validate the content of the added review

  });

});
afterEach(async function () {
  await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
    if (coverageData) {
      // Save coverage data to a file
      await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
        JSON.stringify(coverageData), (err) => {
          if (err) {
            console.error('Error writing coverage data:', err);
          } else {
            console.log('Coverage data written to coverage.json');
          }
        });
    }
  });
});





after(async function () {
  // await driver.quit();
  await server.close()
  process.exit(0)
});
