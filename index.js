var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const { viewComment } = require("./utils/CommentUtil");
const { addComment } = require("./utils/AddCommentUtil");
const { viewRestaurant, viewRestaurantByName  } = require('./utils/RestaurantUtil');
const { register } = require("./utils/UserUtil");
const { login } = require("./utils/LoginUtil");
const { viewBooking } = require('./utils/ViewBookingUtil');
const { addBooking} = require('./utils/AddBookingUtil');
const { deleteBooking } = require('./utils/DeleteBookingUtil')

//Comment GET, PUSH
app.get("/comment", viewComment);
app.post("/comment" , addComment);
//Restaurant GET, PUSH
app.get('/restaurant', viewRestaurant);
app.get("/restaurant/:name", viewRestaurantByName);
//Register PUSH
app.post("/register", register);
//Login PUSH
app.post("/login", login);
//Booking Resturant GET,PUSH,DELETE
app.get('/view-booking', viewBooking);
app.post('/add-booking', addBooking);

app.delete('/delete-booking/:id', deleteBooking);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);
});

app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
