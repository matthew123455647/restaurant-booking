const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const { addBooking } = require("../utils/AddBookingUtil");
const { viewBooking } = require("../utils/ViewBookingUtil");
const { deleteBooking } = require("../utils/DeleteBookingUtil");

describe("Testing booking related features", () => {
  const bookingsFilePath = "utils/booking.json";
  var orgContent = "";
  beforeEach(async () => {
    orgContent = await fs.readFile(bookingsFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });
  afterEach(async () => {
    await fs.writeFile(bookingsFilePath, JSON.stringify(orgContent), "utf8");
  });
  it("Should add a new booking successfully", async () => {
    const req = {
      body: {
        username: "test",
        rest: "Mac",
        contact: "88888888",
        people: "2",
        book_date: "8/12/23",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data).to.have.lengthOf(orgContent.length + 1);
        expect(data[orgContent.length].username).to.equal(req.body.username);
      },
    };
    await addBooking(req, res);
  });

  it("Should not be able to add Booking due to incomplete input", async () => {
    const req = {
      body: {
        username: "test",
        rest: "Mac",
        contact: "88888888",
        people: "2",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.not.equal(undefined);
      },
    };
    await addBooking(req, res);
  });

  

  it("Should return an array when viewing booking data", async () => {
    const req = {};
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(Array.isArray(data)).to.be.true;
      },
    };
    await viewBooking(req, res);
  });

  it("Should delete a booking successfully", async () => {
    const req = "1700899006177848";

    const res = {
      status: function (code) {
        expect(code).to.equal(204);
        return this;
      },
    };

    try {
      await deleteBooking(req, res);
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., log, rethrow, etc.)
    }
  });

});
