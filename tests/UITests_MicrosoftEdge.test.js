const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const edge = require('selenium-webdriver/edge');
// const chromeOptions = new chrome.Options();
// chromeOptions.addArguments('--headless');
// const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
const driver = new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(new edge.Options()).build();

var server;

before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing microsoft edge browser', function () {

    this.timeout(100000); // Set timeout as 10 seconds

    it('Should show title: Chicken Kitchen', async () => {
        await driver.get('http://localhost:5050/');
        const title = await driver.getTitle(); // Get the title of the web page
        expect(title).to.equal("Chicken Kitchen"); // Assert that title matches "Swag Labs"
    });




});
after(async function () {
    await driver.quit();
    await server.close()
    process.exit(0)
});
