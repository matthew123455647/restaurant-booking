var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const { viewRestaurant } = require('./utils/RestaurantUtil')
const { register } = require("./utils/UserUtil");
const { login } = require("./utils/LoginUtil");

app.get('/restaurant', viewRestaurant);
app.post("/register", register);
app.post("/login", login);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);
});

app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
