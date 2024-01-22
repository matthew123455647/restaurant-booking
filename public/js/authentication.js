// async function register() {
//   const formData = {
//     first_name: document.getElementById("first_name").value,
//     last_name: document.getElementById("last_name").value,
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//     birthday: document.getElementById("birthday").value,
//     phone_number: document.getElementById("phone_number").value,
//     profile_picture: document.getElementById("profile_picture").value,
//     username: document.getElementById("username").value,
//   };

//   const response = await fetch("/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   const responseData = await response.json();

//   if (response.ok) {
//     // Display a popup message
//     alert(`User ${formData.username} registered successfully!`);

//     // Redirect to the home page
//     window.location.href = "/index.html";
//   } else {
//     document.getElementById(
//       "message"
//     ).innerHTML = `Unable to register user: ${responseData.message}`;
//     document.getElementById("message").setAttribute("class", "text-danger");
//   }
// }

// async function login() {
//   const formData = {
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//   };

//   const response = await fetch("/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   const responseData = await response.json();

//   if (response.ok) {
//     // Display a popup message
//     alert("Login successful!");

//     // Redirect to the home page
//     window.location.href = "/";
//   } else {
//     document.getElementById(
//       "message"
//     ).innerHTML = `Invalid credentials: ${responseData.message}`;
//     document.getElementById("message").setAttribute("class", "text-danger");
//   }
// }

function register() {
  var response = "";
  var jsonData = new Object();
  jsonData.first_name = document.getElementById("first_name").value;
  jsonData.last_name = document.getElementById("last_name").value;
  jsonData.email = document.getElementById("email_register").value;
  jsonData.password = document.getElementById("password_register").value;
  jsonData.birthday = document.getElementById("birthday").value;
  jsonData.phone_number = document.getElementById("phone_number").value;
  jsonData.profile_picture = document.getElementById("profile_picture").value;
  jsonData.username = document.getElementById("username").value;

  if (
    jsonData.first_name == "" ||
    jsonData.last_name == "" ||
    jsonData.email == "" ||
    jsonData.password == "" ||
    jsonData.birthday == "" ||
    jsonData.phone_number == "" ||
    jsonData.profile_picture == "" ||
    jsonData.username == ""
  ) {
    document.getElementById("registerError").innerHTML = "All fields are required!";
    console.log(jsonData);
    return;
  }

  var request = new XMLHttpRequest();
  request.open("POST", "/register", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);
    if (response.message == undefined) {
      window.location.href = "index.html";
    } else {
      document.getElementById("registerError").innerHTML = "Authentication failed!";
    }
  };
  request.send(JSON.stringify(jsonData));
}

function login() {
  var response = "";
  var jsonData = new Object();
  jsonData.email = document.getElementById("email").value;
  jsonData.password = document.getElementById("password").value;
  if (jsonData.email == "" || jsonData.password == "") {
    document.getElementById("LoginError").innerHTML = "All fields are required!";
    return;
  }
  var request = new XMLHttpRequest();
  request.open("POST", "/login", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);
    if (response.message == "Login successful!") {
      sessionStorage.setItem("email", jsonData.email);
      window.location.href = "index.html";
    } else {
      document.getElementById("loginError").innerHTML = "Invalid credentials!";
    }
  };
  request.send(JSON.stringify(jsonData));
}
// module.exports = {
//   readJSON,
//   writeJSON,
//   register,
//   login,
// };
