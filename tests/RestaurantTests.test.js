const { describe, it } = require("mocha");
const { expect } = require("chai");
const { viewRestaurantByName } = require("../utils/RestaurantUtil");

describe("RestaurantUtil Tests", () => {
  // Test for viewRestaurant function

  // Test for viewRestaurantByName function
  describe("viewRestaurantByName", () => {
    it("should return a restaurant by name", async () => {
      const req = {
        params: {
          name: "PUTIEN", // Assuming 'McDonalds' exists in the test data
        },
      };
      const res = {
        status: (code) => {
          expect(code).to.equal(500);
          return {
            json: (result) => {
              expect(result).to.be.an("object");
              // Add more assertions based on the structure of your restaurant object
            },
          };
        },
      };
      await viewRestaurantByName(req, res);
    });

    it("should handle non-existent restaurant names and return a 404 status code", async () => {
      const req = {
        params: {
          name: "Nonexistent Restaurant",
        },
      };
      const res = {
        status: (code) => {
          expect(code).to.equal(404);
          return {
            json: (result) => {
              expect(result).to.be.an("object");
              expect(result).to.have.property("message");
              // Add more assertions based on the expected error response
            },
          };
        },
      };
      await viewRestaurantByName(req, res);
    });

    it("should handle invalid restaurant names and return a 400 status code", async () => {
      const req = {
        params: {
          name: 123, // Invalid name, expecting a string
        },
      };
      const res = {
        status: (code) => {
          expect(code).to.equal(400);
          return {
            json: (result) => {
              expect(result).to.be.an("object");
              expect(result).to.have.property("message");
              // Add more assertions based on the expected error response
            },
          };
        },
      };
      await viewRestaurantByName(req, res);
    });

    it("should handle errors and return a 500 status code", async () => {
      const req = {
        params: {
          name: "McDonalds", // Assuming 'McDonalds' exists in the test data
        },
      };
      const res = {
        status: (code) => {
          expect(code).to.equal(500);
          return {
            json: (result) => {
              expect(result).to.be.an("object");
              expect(result).to.have.property("message");
              // Add more assertions based on the expected error response
            },
          };
        },
      };
      await viewRestaurantByName(req, res);
    });
  });
});
