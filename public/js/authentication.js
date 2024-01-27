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
  // Add your email validation logic
  // For example, you can use a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Add your password validation logic
  // For example, you can require at least one uppercase letter and one special character
  var passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return passwordRegex.test(password);
}

function isValidUsername(username) {
  // Add your username validation logic
  // For example, you can require at least 3 characters and allow only lowercase letters
  var usernameRegex = /^[a-z]{3,}$/;
  return usernameRegex.test(username);
}
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
      "Invalid email format!";
    return;
  }

  // Validate password format
  // if (!isValidPassword(jsonData.password)) {
  //   document.getElementById("registerError").innerHTML =
  //     "Invalid password format!";
  //   return;
  // }

  // Validate password length
  if (jsonData.password.length < 8) {
    document.getElementById("registerError").innerHTML =
      "Password must be at least 8 characters long!";
    return;
  }

  // Validate username format
  if (!isValidUsername(jsonData.username)) {
    document.getElementById("registerError").innerHTML =
      "Invalid username format!";
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
    } else {
      document.getElementById("registerError").innerHTML =
        "Registration failed, email requires @!";
    }
  };

  request.send(JSON.stringify(jsonData));
}
