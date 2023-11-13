var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));


const { register } = require("./utils/UserUtil");
const { login } = require("./utils/LoginUtil");

app.post("/register", register);
app.post("/login", login);

const { viewBooking } = require('./utils/ViewBookingUtil')
app.get('/view-booking', viewBooking);

const { addBooking} = require('./utils/AddBookingUtil')
app.post('/add-booking', addBooking);

const { deleteBooking } = require('./utils/DeleteBookingUtil')
app.delete('/delete-booking/:id', deleteBooking);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);
});

app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
