const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
// chromeOptions.addArguments('--headless');
const fs = require('fs').promises;
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

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
describe('Testing Chrome browser', function () {

    this.timeout(100000); // Set timeout as 10 seconds

    it('Should show title: Chicken Kitchen', async () => {
        await driver.get('http://localhost:5050/');
        const title = await driver.getTitle(); // Get the title of the web page
        expect(title).to.equal("Chicken Kitchen"); // Assert that title matches "Swag Labs"
    });
});
// Other Chrome Browser test cases...



describe('Testing for Search Restaurant', function () {
    it('Should display matching restaurants when searching', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';

        await driver.get(baseUrl);

        // Assuming the search input has the id "searchInput"
        const searchInput = await driver.findElement(By.id('searchInput'));

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

        // Fill in review details
        const usernameInput = await driver.findElement(By.id('username1'));
        await usernameInput.sendKeys('John Doe');

        const userCommentsInput = await driver.findElement(By.id('userComments'));
        await userCommentsInput.sendKeys('The food is good');

        const dateOfVisitInput = await driver.findElement(By.id('dateOfVisit'));
        await dateOfVisitInput.sendKeys('01/23/2024');

        // Hover over the rating
        const ratingInput = await driver.findElement(By.id('rating1'));
        await ratingInput.click();

        // Submit the review
        const submitReviewButton = await driver.findElement(By.id('submitReview'));
        await submitReviewButton.click();

        // Wait for the alert to be present
        await driver.wait(until.alertIsPresent(), 5000);

        // Switch to the alert
        const alert = await driver.switchTo().alert();

        // Get the text from the alert
        const alertText = await alert.getText();

        // Accept the alert
        await alert.accept();


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

// Mocking user interactions
// Add more UI tests for other functionalities

after(async function () {
    // await driver.quit();
    await server.close();
    process.exit(0);
});











// Add more UI tests for other functionalities
