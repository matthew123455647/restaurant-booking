const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const edge = require('selenium-webdriver/edge');

const driver = new Builder()
  .forBrowser('MicrosoftEdge')
  .setEdgeOptions(new edge.Options())
  .build();

var server;

before(async function () {
  server = await new Promise((resolve) => {
    server = app.listen(0, 'localhost', () => {
      resolve(server);
    });
  })
});

describe('Testing Microsoft Edge browser', function () {

  this.timeout(100000); // Set timeout as 100 seconds

  it('Should display matching restaurants when searching', async function () {
    const baseUrl = 'http://localhost:' + server.address().port;

    // Maximize the browser window
    await driver.manage().window().maximize();

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
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Assuming the search input has the id "searchInput"
        const searchInput = await driver.findElement(By.id('searchInput'));
    
        // Clear the search input
        await searchInput.clear();
    
        
    
        
    });




});
after(async function () {
    // await driver.quit();
    await server.close()
    process.exit(0)
});
