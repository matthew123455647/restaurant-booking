function login() {
  var response = "";

  var jsonData = new Object();
  jsonData.email = document.getElementById("email").value;
  jsonData.password = document.getElementById("password").value;

  if (jsonData.email == "" || jsonData.password == "") {
    document.getElementById("loginError").innerHTML =
      "All fields are required!";
    return;
  }

  if (jsonData.email.includes("@")) {
    document.getElementById("loginError").innerHTML = "";

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
          window.location.href = "index.html";
        } else {
          document.getElementById("loginError").innerHTML =
            "Invalid credentials!";
        }
      } catch (loginError) {
        console.loginError(loginError);
        document.getElementById("loginError").innerHTML =
          "Error resetting form";
      }
    };

    request.send(JSON.stringify(jsonData));
  } else {
    // Show validation error
    document.getElementById("loginError").innerHTML =
      "Validation error, email should have @";
  }
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Password must contain at least one capital letter and one special character
  var passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{6,}$/;
  return passwordRegex.test(password);
}

function isValidBirthday(birthday) {
  // Add your birthday validation logic
  // For example, check if the user is between 18 and 116 years old
  const currentDate = new Date();
  const birthDate = new Date(birthday);
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age >= 18 && age <= 116;
}

function isValidPhoneNumber(phoneNumber) {
  // Add your phone number validation logic
  // For example, check if the phone number is exactly 8 characters long
  return /^\d{8}$/.test(phoneNumber);
}

function isValidProfilePicture(profile_picture) {
  // A simple profile_picture validation regex, you can use a more comprehensive one
  const profile_pictureRegex = /^https?:\/\/\S+/;
  return profile_pictureRegex.test(profile_picture);
}

function isValidUsername(username) {
  var usernameRegex = /^[a-z]{3,}$/;
  return usernameRegex.test(username);
}

function register() {
  var jsonData = new Object();
  jsonData.first_name = document.getElementById("first_name").value;
  jsonData.last_name = document.getElementById("last_name").value;
  jsonData.email = document.getElementById("email_register").value;
  jsonData.password = document.getElementById("password_register").value;
  jsonData.birthday = document.getElementById("birthday").value;
  jsonData.phone_number = document.getElementById("phone_number").value;
  jsonData.profile_picture = document.getElementById("profile_picture").value;
  jsonData.username = document.getElementById("username").value;

  // Check if any field is empty
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
    document.getElementById("registerError").innerHTML =
      "All fields are required!";
    return;
  }

  // Validate email format
  if (!isValidEmail(jsonData.email)) {
    document.getElementById("registerError").innerHTML =
      "Invalid email format! e.g. john@gmail.com";
    return;
  }

  // Validate password format
  if (!isValidPassword(jsonData.password)) {
    document.getElementById("registerError").innerHTML =
      "Invalid password format! Password must contain at least one capital letter, one special character and 6 chracters long.";
    return;
  }

  // Validate birthday format
  if (!isValidBirthday(jsonData.birthday)) {
    document.getElementById("registerError").innerHTML =
      "Invalid DOB format! You must be at least 18 years old to register";
    return;
  }

  // Validate phone_number format
  if (!isValidPhoneNumber(jsonData.phone_number)) {
    document.getElementById("registerError").innerHTML =
      "Invalid Phone Number!";
    return;
  }

  // Validate profile_picture format
  if (!isValidProfilePicture(jsonData.profile_picture)) {
    document.getElementById("registerError").innerHTML = "Invalid URL!";
    return;
  }

  // Validate username format
  if (!isValidUsername(jsonData.username)) {
    document.getElementById("registerError").innerHTML =
      "Invalid username format! Only small letters please. Min 3 chracters.";
    return;
  }

  var request = new XMLHttpRequest();

  request.open("POST", "/register", true);
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = function () {
    var response = JSON.parse(request.responseText);
    console.log(response);

    if (response.message == undefined) {
      // Registration successful
      alert("Registration successful! You can now log in.");
      // Redirect to another page or perform additional actions
      window.location.href = "/";
    } else {
      document.getElementById("registerError").innerHTML =
        "Registration failed: " + response.message;
    }
  };

  request.send(JSON.stringify(jsonData));
}

document.addEventListener("DOMContentLoaded", function () {
  var leadToRegisterLabel = document.getElementById("lead-to-register");

  leadToRegisterLabel.addEventListener("click", function () {
    window.location.href = "register.html";
  });
});
