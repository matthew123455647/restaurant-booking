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
// module.exports = {
//   readJSON,
//   writeJSON,
//   register,
//   login,
// };
// function rfunction login() {
function login() {
  var response = "";

  var jsonData = new Object();
  jsonData.email = document.getElementById("email").value;
  jsonData.password = document.getElementById("password").value;

  if (jsonData.email == "" || jsonData.password == "") {
    document.getElementById("error").innerHTML = "All fields are required!";
    return;
  }

  if (jsonData.email.includes("@")) {
    document.getElementById("error").innerHTML = "";

    var request = new XMLHttpRequest();

    request.open("POST", "/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      try {
        response = JSON.parse(request.responseText);
        console.log(response);

        if (response.message == "Login successful!") {
          sessionStorage.setItem("email", jsonData.email);
          alert("User authentication successful!");
          window.location.href = "home.html";
        } else {
          document.getElementById("error").innerHTML = "Invalid credentials!";
        }
      } catch (error) {
        console.error(error);
        document.getElementById("error").innerHTML = "Error resetting form";
      }
    };

    request.send(JSON.stringify(jsonData));
  } else {
    // Show validation error
    document.getElementById("error").innerHTML =
      "Validation error, email should have @";
  }
}
function register() {
  var response = "";

  var jsonData = new Object();
  jsonData.email = document.getElementById("email").value;
  jsonData.password = document.getElementById("password").value;

  var confirmPassword = document.getElementById("confirmPassword").value;
  if (
    jsonData.email == "" ||
    jsonData.password == "" ||
    confirmPassword == ""
  ) {
    document.getElementById("error").innerHTML = "All fields are required!";
    return;
  } else if (jsonData.password != confirmPassword) {
    document.getElementById("error").innerHTML = "Password does not match!";
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
      alert("Registration successful! You can now log in.");
    } else {
      document.getElementById("error").innerHTML =
        "Registration failed, email requires @!";
    }
  };

  request.send(JSON.stringify(jsonData));
}
  