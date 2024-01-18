const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
// chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var server;
before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});
describe('Testing for Chicken Kitchen', function () {
    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        this.timeout(100000);
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('Chicken Kitchen');
    });
});

it('Should display matching restaurants when searching', async function () {
    const baseUrl = 'http://localhost:' + server.address().port;
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
        expect(title.toLowerCase()).to.include('PUTIEN');
    });
});


it('Should clear results when search input is cleared', async function () {
    // Assuming the search input has the id "searchInput"
    const searchInput = await driver.findElement(By.id('searchInput'));

    // Clear the search input
    await searchInput.clear();

    // Wait for the results to clear (replace with an appropriate wait condition)
    await driver.wait(until.stalenessOf(driver.findElement(By.className('card'))), 5000);

    // Check if there are no displayed results
    const displayedTitles = await driver.findElements(By.css('.card-title'));
    expect(displayedTitles.length).to.equal(0);
});


    it('Should fetch and display comments on page load', async function () {
        // Assuming the comments are fetched on page load
        const comments = await driver.findElements(By.className('comment'));
        expect(comments.length).to.be.greaterThan(0);
    });

    it('Should add a new comment', async function () {
        const initialCommentCount = await driver.findElements(By.className('comment')).length;

        // Assuming there is a button to open the modal for adding a new comment
        const addCommentButton = await driver.findElement(By.id('addCommentButton'));
        await addCommentButton.click();

        // Assuming there is an input field for the username
        const usernameInput = await driver.findElement(By.id('username1'));
        await usernameInput.sendKeys('TestUser');

        // Assuming there is an input field for the review
        const reviewInput = await driver.findElement(By.id('userComments'));
        await reviewInput.sendKeys('This is a test comment.');

        // Assuming there is a button to submit the new comment
        const submitButton = await driver.findElement(By.id('submitCommentButton'));
        await submitButton.click();

        // Wait for the comment to be added (replace with an appropriate wait condition)
        await driver.wait(until.elementsLocated(By.className('comment')), 5000);

        const finalCommentCount = await driver.findElements(By.className('comment')).length;
        expect(finalCommentCount).to.equal(initialCommentCount + 1);
    });

    it('Should display correct restaurant name in reviews', async function () {
        // Assuming there is a button or trigger to display reviews for a specific restaurant
        const restaurantButton = await driver.findElement(By.id('restaurantButton'));
        await restaurantButton.click();

        // Wait for the reviews to be displayed (replace with an appropriate wait condition)
        await driver.wait(until.elementsLocated(By.className('review')), 5000);

        // Assuming the restaurant name is displayed in a specific element
        const restaurantNameElement = await driver.findElement(By.id('restaurantName'));
        const displayedRestaurantName = await restaurantNameElement.getText();

        // Replace with the actual restaurant name you expect to be displayed
        expect(displayedRestaurantName).to.equal('Expected Restaurant Name');
    });







after(async function () {
    // await driver.quit();
    await server.close();
    process.exit(0);
});