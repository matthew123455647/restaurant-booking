class Booking {
    constructor(username, rest, contact, people, book_date) {
    this.username = username;
    this.rest = rest;
    this.contact = contact;
    this.people = people;
    this.book_date = book_date;
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
    }
    module.exports = { Booking };